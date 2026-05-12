# Travel Photo Spots

A self-contained browser app for collecting travel photo locations, Google Maps links, and sample photos.

## Run it

Open [index.html](/Users/yamanwu/Documents/Codex/2026-05-10/hi/index.html) in a browser.

If you want a local server instead of opening the file directly, run:

```bash
/Users/yamanwu/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m http.server 8000
```

Then visit:

[http://localhost:8000](http://localhost:8000)

## What is included

- Homepage with featured places and latest spots
- Place browser with search and filters
- Place detail page with spot cards and Google Maps buttons
- Local data manager for adding places and spots in the browser
- JSON export/import so your content is not trapped in one session

## Important limitation

This version stores data in browser local storage. It is a practical no-install MVP, not a cloud-backed production app.

## What I will need from you next

To replace the sample content with your real travel library, send me:

1. The place names you want first
2. The Google Maps link for each photo spot
3. One or more image URLs or image files for each spot
4. Short notes for each spot:
   - best time
   - how to stand
   - lens suggestion
   - tips

After you provide that, I can wire your real content into this app.
