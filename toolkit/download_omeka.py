#!/usr/bin/env python3
"""
Download all collections, items, and files from any Omeka site via API.
Supports resume - skips already downloaded files.

Usage:
    python download_omeka.py <omeka_site_url>

Example:
    python download_omeka.py https://georgeeliotarchive.org
    python download_omeka.py https://georgeeliotscholars.org

Backup folder will be created as: backup-<domain>
"""

import argparse
import json
import os
import re
import requests
import time
import sys
from pathlib import Path
from urllib.parse import urlparse

# Unbuffered output
sys.stdout.reconfigure(line_buffering=True)

PER_PAGE = 50
REQUEST_DELAY = 1.0  # Delay between API requests to avoid rate limiting


def get_domain(url):
    """Extract domain from URL."""
    parsed = urlparse(url)
    return parsed.netloc or parsed.path.split('/')[0]


def sanitize_filename(name, max_length=100):
    """Sanitize filename for filesystem."""
    # Remove/replace problematic characters
    for char in ['/', '\\', ':', '*', '?', '"', '<', '>', '|']:
        name = name.replace(char, '_')
    # Remove HTML tags
    name = re.sub(r'<[^>]+>', '', name)
    return name[:max_length].strip()


def get_collection_title(collection):
    """Extract title from collection element_texts."""
    for et in collection.get('element_texts', []):
        if et.get('element', {}).get('name') == 'Title':
            return et.get('text', f"collection_{collection['id']}")
    return f"collection_{collection['id']}"


def get_item_title(item):
    """Extract title from item element_texts."""
    for et in item.get('element_texts', []):
        if et.get('element', {}).get('name') == 'Title':
            return et.get('text', f"item_{item['id']}")
    return f"item_{item['id']}"


def fetch_json(url, retries=3):
    """Fetch JSON from URL with retries."""
    time.sleep(REQUEST_DELAY)  # Rate limiting
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) OmekaBackup/1.0',
        'Accept': 'application/json',
        'Connection': 'close',  # Don't keep connection open
    }
    for attempt in range(retries):
        try:
            with requests.Session() as session:
                resp = session.get(url, timeout=60, headers=headers)
                resp.raise_for_status()
                return resp.json()
        except Exception as e:
            if attempt < retries - 1:
                print(f"  Retry {attempt + 1} for {url}: {e}")
                time.sleep(10)  # Longer wait on retry
            else:
                print(f"  Failed to fetch {url}: {e}")
                return None


def fetch_all_paginated(url):
    """Fetch all pages from a paginated API endpoint."""
    all_results = []
    page = 1
    while True:
        page_url = f"{url}&page={page}&per_page={PER_PAGE}" if '?' in url else f"{url}?page={page}&per_page={PER_PAGE}"
        data = fetch_json(page_url)
        if not data:
            break
        all_results.extend(data)
        if len(data) < PER_PAGE:
            break
        page += 1
        print(f"    Fetched page {page-1} ({len(all_results)} items so far)")
    return all_results


def download_file(url, dest_path, retries=3):
    """Download file to destination path."""
    if dest_path.exists():
        return True  # Already downloaded

    dest_path.parent.mkdir(parents=True, exist_ok=True)
    time.sleep(REQUEST_DELAY)  # Rate limiting

    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) OmekaBackup/1.0',
        'Connection': 'close',
    }

    for attempt in range(retries):
        try:
            with requests.Session() as session:
                resp = session.get(url, timeout=120, stream=True, headers=headers)
                resp.raise_for_status()

                # Write to temp file first, then rename
                temp_path = dest_path.with_suffix('.tmp')
                with open(temp_path, 'wb') as f:
                    for chunk in resp.iter_content(chunk_size=8192):
                        f.write(chunk)
                temp_path.rename(dest_path)
                return True
        except Exception as e:
            if attempt < retries - 1:
                print(f"    Retry {attempt + 1} downloading {url}: {e}")
                time.sleep(5)
            else:
                print(f"    Failed to download {url}: {e}")
                return False


def main():
    parser = argparse.ArgumentParser(
        description='Download all collections, items, and files from an Omeka site.',
        epilog='Example: python download_omeka.py https://georgeeliotarchive.org'
    )
    parser.add_argument(
        'site_url',
        help='Base URL of the Omeka site (e.g., https://georgeeliotarchive.org)'
    )
    parser.add_argument(
        '-o', '--output',
        help='Output directory (default: backup-<domain> in current directory)',
        default=None
    )
    args = parser.parse_args()

    # Normalize URL
    site_url = args.site_url.rstrip('/')
    if not site_url.startswith('http'):
        site_url = 'https://' + site_url

    # Extract domain and set up paths
    domain = get_domain(site_url)
    base_url = f"{site_url}/api"

    # Set backup directory
    if args.output:
        backup_dir = Path(args.output)
    else:
        backup_dir = Path.cwd() / f"backup-{domain}"

    backup_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 60)
    print(f"Omeka Backup - {domain}")
    print("=" * 60)
    print(f"Site URL: {site_url}")
    print(f"API URL: {base_url}")
    print(f"Backup Dir: {backup_dir}")
    print("=" * 60)

    # Load collections
    collections_file = backup_dir / "collections" / "all_collections.json"
    if not collections_file.exists():
        print("\nFetching collections...")
        collections = fetch_json(f"{base_url}/collections")
        if not collections:
            print("ERROR: Could not fetch collections. Is the API enabled?")
            sys.exit(1)
        collections_file.parent.mkdir(parents=True, exist_ok=True)
        with open(collections_file, 'w') as f:
            json.dump(collections, f, indent=2)
    else:
        with open(collections_file, 'r') as f:
            collections = json.load(f)

    print(f"Found {len(collections)} collections\n")

    # Stats
    total_items = 0
    total_files = 0
    downloaded_files = 0
    skipped_files = 0
    failed_files = 0

    # Process each collection
    for col_idx, collection in enumerate(collections):
        col_id = collection['id']
        col_title = sanitize_filename(get_collection_title(collection))
        col_dir = backup_dir / "items" / f"{col_id}_{col_title}"
        col_dir.mkdir(parents=True, exist_ok=True)

        item_count = collection.get('items', {}).get('count', 0)
        print(f"\n[{col_idx + 1}/{len(collections)}] Collection {col_id}: {col_title}")
        print(f"  Expected items: {item_count}")

        # Fetch all items for this collection
        items_file = col_dir / "_items.json"
        if items_file.exists():
            with open(items_file, 'r') as f:
                items = json.load(f)
            print(f"  Loaded {len(items)} items from cache")
        else:
            items_url = collection.get('items', {}).get('url')
            if not items_url:
                print("  No items URL, skipping")
                continue
            print(f"  Fetching items...")
            items = fetch_all_paginated(items_url)
            with open(items_file, 'w') as f:
                json.dump(items, f, indent=2)
            print(f"  Saved {len(items)} items")

        total_items += len(items)

        # Process each item
        for item_idx, item in enumerate(items):
            item_id = item['id']
            item_title = sanitize_filename(get_item_title(item))
            item_dir = col_dir / f"{item_id}_{item_title}"

            # Save item metadata
            item_meta_file = item_dir / "_metadata.json"
            if not item_meta_file.exists():
                item_dir.mkdir(parents=True, exist_ok=True)
                with open(item_meta_file, 'w') as f:
                    json.dump(item, f, indent=2)

            # Get files for this item
            files_count = item.get('files', {}).get('count', 0)
            if files_count == 0:
                continue

            files_url = item.get('files', {}).get('url')
            if not files_url:
                continue

            # Fetch files metadata
            files_meta_file = item_dir / "_files.json"
            if files_meta_file.exists():
                with open(files_meta_file, 'r') as f:
                    files = json.load(f)
            else:
                files = fetch_json(files_url)
                if files:
                    item_dir.mkdir(parents=True, exist_ok=True)
                    with open(files_meta_file, 'w') as f:
                        json.dump(files, f, indent=2)

            if not files:
                continue

            total_files += len(files)

            # Download each file
            for file_info in files:
                file_urls = file_info.get('file_urls', {})
                original_url = file_urls.get('original')
                if not original_url:
                    continue

                original_filename = file_info.get('original_filename', '')
                if not original_filename:
                    # Extract from URL
                    original_filename = os.path.basename(urlparse(original_url).path)

                dest_file = item_dir / original_filename

                if dest_file.exists():
                    skipped_files += 1
                else:
                    if download_file(original_url, dest_file):
                        downloaded_files += 1
                        print(f"    [{item_idx + 1}/{len(items)}] Downloaded: {original_filename}")
                    else:
                        failed_files += 1

            # Progress update every 50 items
            if (item_idx + 1) % 50 == 0:
                print(f"  Progress: {item_idx + 1}/{len(items)} items processed")

    # Summary
    print("\n" + "=" * 60)
    print("BACKUP COMPLETE")
    print("=" * 60)
    print(f"Site: {domain}")
    print(f"Collections: {len(collections)}")
    print(f"Items: {total_items}")
    print(f"Files: {total_files}")
    print(f"  Downloaded: {downloaded_files}")
    print(f"  Skipped (already exists): {skipped_files}")
    print(f"  Failed: {failed_files}")
    print(f"\nBackup location: {backup_dir}")


if __name__ == "__main__":
    main()
