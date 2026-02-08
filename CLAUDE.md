# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React-based web application for the George Eliot Archive digital humanities project at Auburn University. The primary feature is **PDF cover page generation** that attaches metadata cover sheets to documents, allowing users to properly cite their sources when downloading materials from the archive.

Live site: https://georgeeliotarchive.github.io/

## Build Commands

```bash
npm start          # Dev server on localhost:3000
npm run build      # Production build to /build folder
npm test           # Run Jest/React Testing Library tests
npm run deploy     # Build and deploy to GitHub Pages (gh-pages branch)
```

Uses `react-app-rewired` for webpack customization (see `config-overrides.js` for Node module polyfills).

## Architecture

### Core Technologies
- React 17 (class and functional components mixed)
- React Router v6 for routing
- pdfMake + pdf-merger-js for client-side PDF generation
- Axios for Omeka REST API calls
- Tailwind CSS + Material-UI for styling

### Key Routes (defined in `src/Components/App.js`)
- `/` → Ongoing page (homepage)
- `/collectionlist` → Collections browser with PDF download
- `/omeka` → PDF generation interface
- `/knowledge` → Knowledge base
- `/blog/:id` → Individual blog posts

### PDF Generation Pipeline (`src/Components/collections/`)
1. `fetchcollectionlist.js` - Fetches collection data from Omeka API (`georgeeliotarchive.org/api/collections`)
2. `singleitem.js` - Displays item details and handles PDF cover generation using pdfMake
3. Cover sheet is merged with original PDF using pdf-merger-js (client-side)
4. Download as "merged_[title].pdf"

### Component Structure
- `src/Components/Menubar/` - Navigation (Layout, Toolbar, SideDrawer)
- `src/Components/collections/` - PDF generation and collection browsing
- `src/Utils/` - Theme management, router wrappers, utilities
- `src/Md/` - Markdown files loaded dynamically for content pages

## Known Issues

- **PDF merge fails** if source PDFs are older than version 1.7 (Acrobat 8). Must upgrade the PDF in Adobe Acrobat before merging.
- **HTML tags in Omeka metadata** (missing `<em>` tags) can affect PDF formatting output.
- Direct navigation to `/collectionlist` returns 404 (GitHub Pages SPA routing limitation).

## Data Source

All collection metadata comes from the Omeka REST API at `georgeeliotarchive.org/api/`. The `public/api/` directory contains client-side proxy endpoints for CSV/JSON data access.
