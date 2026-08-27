# JARVIS Download Center

Official download website for every JARVIS Desktop and JARVIS Mobile build currently available in this workspace.

## Fastest offline launch

Double-click `START-DOWNLOAD-CENTER.cmd`. It opens `OPEN-DOWNLOADS.html`, which needs no Node.js server. The prepared workspace folder already contains hard-linked copies of all 24 real EXE/APK files under `public/downloads`.

If the download files are missing after moving or extracting the source project, keep it beside `JarvisAssistant` and run:

```bash
npm run sync-releases
```

## Included catalog

- Windows Setup and Portable builds from 0.1.0 through 0.4.6.
- Legacy Windows 0.1.0 standalone build.
- Android APK builds 0.1.0 debug, 0.1.1 release, and 0.2.0 release.
- File sizes and SHA-256 checksums for every release.
- Windows/Android filters, responsive layout, range requests, and download-safe allow-listing.

## Run with existing JARVIS artifacts

Keep `JARVIS-Download-Center` and `JarvisAssistant` next to each other inside `outputs`, then run:

```bash
npm install
npm run dev
```

The download route automatically reads files from `../JarvisAssistant/dist`. To use another folder, set `JARVIS_RELEASE_DIR`.

## Production hosting

Production downloads are served directly by the public GitHub Release named `downloads`. This avoids Vercel function response-size limits. `DOWNLOAD_BASE_URL` can override the release storage URL when deploying a mirror.

## Verify

```bash
npm test
npm run build
```
