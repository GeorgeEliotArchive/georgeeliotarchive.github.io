# Omeka Site Backups

Full backups of four Omeka-based digital humanities sites managed by Dr. Beverley Park Rilett at Auburn University. Each backup contains all collections, items, metadata (Dublin Core), and original files (PDFs, images, etc.) downloaded via the Omeka REST API.

**Backup date:** February 2026

> **IMPORTANT:** Some backups are split into multiple files due to size. **You must download ALL parts before extracting.** Extracting with missing parts will fail or produce an incomplete backup.

## Files

### 1. George Eliot Archive

<https://georgeeliotarchive.org>

An open-access scholarly archive dedicated to Mary Ann Evans (George Eliot). Contains published works (fiction, poetry, translations, nonfiction), over 900 letters, journals, notebooks, 1,200+ critical books and articles, and an image gallery of portraits and novel illustrations.

**15 files — download all before extracting:**

| File | |
|------|--|
| `backup-ge-archive.z01` | Part 1 |
| `backup-ge-archive.z02` | Part 2 |
| `backup-ge-archive.z03` | Part 3 |
| `backup-ge-archive.z04` | Part 4 |
| `backup-ge-archive.z05` | Part 5 |
| `backup-ge-archive.z06` | Part 6 |
| `backup-ge-archive.z07` | Part 7 |
| `backup-ge-archive.z08` | Part 8 |
| `backup-ge-archive.z09` | Part 9 |
| `backup-ge-archive.z10` | Part 10 |
| `backup-ge-archive.z11` | Part 11 |
| `backup-ge-archive.z12` | Part 12 |
| `backup-ge-archive.z13` | Part 13 |
| `backup-ge-archive.z14` | Part 14 |
| `backup-ge-archive.zip` | Final part (start extraction from this file) |

### 2. George Eliot Scholars

<https://georgeeliotscholars.org>

An open-access repository of contemporary scholarship about George Eliot. Contains 500+ publications including journal articles, book chapters, theses, dissertations, conference papers, video presentations, and book reviews.

**3 files — download all before extracting:**

| File | |
|------|--|
| `backup-georgeeliotscholars.org.zip.aprt_aa` | Part 1 |
| `backup-georgeeliotscholars.org.zip.aprt_ab` | Part 2 |
| `backup-georgeeliotscholars.org.zip.aprt_ac` | Part 3 |

### 3. Alabama Authors of the 19th & 20th Centuries

<https://alabamaauthors.org>

A digital archive documenting Alabama's literary heritage. Contains biographical sketches and portraits of 250+ featured authors, publication details and book jacket images for 1,830+ books, and supporting data for interactive literary maps and visualizations.

**1 file:**

| File | |
|------|--|
| `backup-alabamaauthors.org.zip` | Single file |

### 4. George Eliot Review Online

<https://georgeeliotreview.org>

Digital archive of the _George Eliot Review_, a peer-reviewed journal in continuous publication since 1970 through the George Eliot Fellowship (Nuneaton, England). Contains 1,000+ full-text PDFs of critical essays, lectures, conference papers, book reviews, and society news.

**1 file:**

| File | |
|------|--|
| `backup-georgeeliotreview.org.zip` | Single file |

## How to Extract

### George Eliot Archive (split `.z01`–`.z14` + `.zip`)

Place all 15 files in the same folder, then:

**macOS/Linux:**

```bash
zip -s 0 backup-ge-archive.zip --out combined.zip
unzip combined.zip
```

**Windows:**
Use [7-Zip](https://www.7-zip.org/): right-click `backup-ge-archive.zip` and select "Extract Here". 7-Zip will automatically locate the other parts.

### George Eliot Scholars (split `.aprt_aa`–`.aprt_ac`)

Place all 3 files in the same folder, then:

**macOS/Linux:**

```bash
cat backup-georgeeliotscholars.org.zip.aprt_* > backup-georgeeliotscholars.org.zip
unzip backup-georgeeliotscholars.org.zip
```

**Windows:**
Use [7-Zip](https://www.7-zip.org/) or run in Command Prompt:

```bat
copy /b backup-georgeeliotscholars.org.zip.aprt_aa + backup-georgeeliotscholars.org.zip.aprt_ab + backup-georgeeliotscholars.org.zip.aprt_ac backup-georgeeliotscholars.org.zip
```

### Alabama Authors & George Eliot Review (single files)

Extract directly — no reassembly needed.

## Backup Contents

Each backup contains the following structure:

```text
backup-<domain>/
  collections/
    all_collections.json          # All collection metadata
  items/
    <collection_id>_<title>/
      _items.json                 # All items in this collection
      <item_id>_<title>/
        _metadata.json            # Item metadata (Dublin Core fields)
        _files.json               # File metadata
        <original_filename>       # Original files (PDFs, images, etc.)
```

All content is licensed under Creative Commons BY-NC-SA 4.0 unless otherwise noted.
