"use strict";

const fs = require("node:fs");
const fsp = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const crypto = require("node:crypto");

const rootDir = __dirname;
loadEnvFile(path.join(rootDir, ".env"));

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  throw new Error("Missing ADMIN_PASSWORD. Add it to .env before starting the server.");
}

const PORT = Number(process.env.PORT || 8000);
const SESSION_COOKIE = "travel_photo_spots_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;
const sessions = new Map();

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    if (url.pathname === "/api/admin/session" && req.method === "GET") {
      return sendJson(res, 200, {
        authenticated: hasValidSession(req),
      });
    }

    if (url.pathname === "/api/admin/login" && req.method === "POST") {
      const body = await readJsonBody(req);
      const passcode = typeof body.passcode === "string" ? body.passcode : "";

      if (!isPasswordMatch(passcode, ADMIN_PASSWORD)) {
        return sendJson(res, 401, {
          message: "Passcode not correct.",
        });
      }

      const sessionId = createSession();
      res.setHeader("Set-Cookie", serializeCookie(SESSION_COOKIE, sessionId, SESSION_TTL_SECONDS));
      return sendJson(res, 200, { authenticated: true });
    }

    if (url.pathname === "/api/admin/logout" && req.method === "POST") {
      const cookies = parseCookies(req.headers.cookie || "");
      if (cookies[SESSION_COOKIE]) {
        sessions.delete(cookies[SESSION_COOKIE]);
      }

      res.setHeader("Set-Cookie", serializeCookie(SESSION_COOKIE, "", 0));
      return sendJson(res, 200, { authenticated: false });
    }

    if (url.pathname.startsWith("/api/")) {
      return sendJson(res, 404, { message: "Not found." });
    }

    return serveStaticFile(url.pathname, res);
  } catch (error) {
    return sendJson(res, 500, {
      message: error.message || "Server error.",
    });
  }
});

server.listen(PORT, () => {
  console.log(`Travel Photo Spots server running on http://localhost:${PORT}`);
});

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const source = fs.readFileSync(filePath, "utf8");
  for (const line of source.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function hasValidSession(req) {
  cleanupExpiredSessions();
  const cookies = parseCookies(req.headers.cookie || "");
  const sessionId = cookies[SESSION_COOKIE];
  if (!sessionId) return false;

  const expiresAt = sessions.get(sessionId);
  return typeof expiresAt === "number" && expiresAt > Date.now();
}

function createSession() {
  cleanupExpiredSessions();
  const sessionId = crypto.randomBytes(32).toString("hex");
  sessions.set(sessionId, Date.now() + SESSION_TTL_MS);
  return sessionId;
}

function cleanupExpiredSessions() {
  const now = Date.now();
  for (const [sessionId, expiresAt] of sessions.entries()) {
    if (expiresAt <= now) {
      sessions.delete(sessionId);
    }
  }
}

function parseCookies(source) {
  return source
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const separatorIndex = part.indexOf("=");
      if (separatorIndex === -1) return cookies;
      const key = part.slice(0, separatorIndex);
      const value = part.slice(separatorIndex + 1);
      cookies[key] = decodeURIComponent(value);
      return cookies;
    }, {});
}

function serializeCookie(name, value, maxAgeSeconds) {
  return [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAgeSeconds}`,
  ].join("; ");
}

function isPasswordMatch(input, expected) {
  const inputBuffer = Buffer.from(input);
  const expectedBuffer = Buffer.from(expected);

  if (inputBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(inputBuffer, expectedBuffer);
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

async function serveStaticFile(requestPath, res) {
  const normalizedPath = requestPath === "/" ? "/index.html" : requestPath;
  const absolutePath = path.resolve(rootDir, `.${normalizedPath}`);

  if (!absolutePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  let fileBuffer;
  try {
    fileBuffer = await fsp.readFile(absolutePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    throw error;
  }

  const ext = path.extname(absolutePath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": mimeTypes[ext] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  res.end(fileBuffer);
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-cache",
  });
  res.end(JSON.stringify(payload));
}
