# Travel Photo Spots

A self-contained browser app for collecting travel photo locations, Google Maps links, sample photos, and admin-managed uploads.

## Structure

- [index.html](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/index.html): page templates and admin portal markup
- [styles.css](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/styles.css): layout, responsive styles, upload previews
- [app.js](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/app.js): seed data, routing, rendering, local storage persistence, admin upload logic
- [assets/images](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/assets/images): bundled sample photography

## Run it

Open [index.html](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/index.html) in a browser.

If you want a local server instead of opening the file directly, run:

```bash
/Users/yamanwu/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## What is included

- Homepage with featured places and latest spots
- Place browser with search and filters
- Place detail pages with spot cards and Google Maps links
- Admin portal with passcode gate
- Direct image upload for place covers and spot photos
- JSON export and import for backup and migration

## Important limitations

- Admin authentication is client-side only. The passcode lives in the browser code and is not secure against a technical user.
- Uploaded images are stored in browser local storage as data URLs. Large libraries can hit browser storage limits.
- This is still a no-backend MVP. Data is tied to the current browser unless exported.
