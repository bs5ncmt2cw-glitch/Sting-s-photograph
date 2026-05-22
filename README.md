# Travel Photo Spots

A self-contained browser app for collecting travel photo locations, Google Maps links, sample photos, and admin-managed uploads.

## Structure

- [index.html](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/index.html): page templates and admin portal markup
- [styles.css](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/styles.css): layout, responsive styles, upload previews
- [app.js](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/app.js): seed data, routing, rendering, local storage persistence, admin upload logic, frontend auth client
- [server.js](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/server.js): static file server and admin auth API
- [package.json](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/package.json): local run script
- [assets/images](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/assets/images): bundled sample photography

## Run it

1. Copy [.env.example](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/.env.example) to `.env`
2. Set `ADMIN_PASSWORD` in `.env`
3. Run:

```bash
npm start
```

Then visit [http://localhost:8000](http://localhost:8000).

Do not use `file://` if you need admin login. Server-side auth only works through the local Node server.

## Deploy on Render

1. Push the repo to GitHub
2. In Render, create a new `Web Service` from the GitHub repo
3. Render can read [render.yaml](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/render.yaml), or you can set the same values manually:

```text
Runtime: Node
Build Command: npm install
Start Command: npm start
```

4. Add environment variable:

```text
ADMIN_PASSWORD=your-secure-password
```

5. Deploy, then open the generated `onrender.com` URL

Render Hobby can run this app, but remember:
- admin authentication runs on the server
- travel place and spot data still stays in each browser's local storage

## Deploy on Cloudflare

Cloudflare Pages is a better fit than GitHub Pages for this version because the app now needs API routes for admin login.

1. In Cloudflare, create a new `Pages` project from the GitHub repo
2. Use these settings:

```text
Framework preset: None
Build command: leave empty
Build output directory: .
```

3. Add environment variables in the Pages project:

```text
ADMIN_PASSWORD=your-secure-password
ADMIN_SESSION_SECRET=your-long-random-secret
```

4. Deploy the project

Cloudflare Pages Functions will use:
- [/functions/api/admin/session.js](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/functions/api/admin/session.js)
- [/functions/api/admin/login.js](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/functions/api/admin/login.js)
- [/functions/api/admin/logout.js](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/functions/api/admin/logout.js)

The [_routes.json](/Users/yamanm5/Desktop/Codex/2026-05-10/travel-photo-spots-web-app/_routes.json) file limits function execution to `/api/*` routes so static assets stay static.

## What is included

- Homepage with featured places and latest spots
- Place browser with search and filters
- Place detail pages with spot cards and Google Maps links
- Admin portal with server-verified login
- Direct image upload for place covers and spot photos
- JSON export and import for backup and migration

## Important limitations

- Uploaded images are stored in browser local storage as data URLs. Large libraries can hit browser storage limits.
- This is still a no-backend MVP. Data is tied to the current browser unless exported.
- Admin content storage is still browser-local. The server currently protects admin access, not the underlying data model.
