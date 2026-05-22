const SESSION_COOKIE = "travel_photo_spots_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

export async function createSessionCookie(env) {
  const expiresAt = Date.now() + SESSION_TTL_SECONDS * 1000;
  const payload = JSON.stringify({ exp: expiresAt });
  const token = await signToken(payload, getSessionSecret(env));
  return serializeCookie(SESSION_COOKIE, token, SESSION_TTL_SECONDS);
}

export async function clearSessionCookie() {
  return serializeCookie(SESSION_COOKIE, "", 0);
}

export async function isAuthenticated(request, env) {
  const cookies = parseCookies(request.headers.get("Cookie") || "");
  const token = cookies[SESSION_COOKIE];
  if (!token) return false;

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;

  const payload = decodeBase64Url(encodedPayload);
  const expectedSignature = await signValue(payload, getSessionSecret(env));
  if (!safeEqual(signature, expectedSignature)) return false;

  try {
    const parsed = JSON.parse(payload);
    return typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export function isPasswordMatch(input, expected) {
  return safeEqual(input, expected);
}

export function jsonResponse(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    },
  });
}

export async function readJsonBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function getSessionSecret(env) {
  return env.ADMIN_SESSION_SECRET || env.ADMIN_PASSWORD || "";
}

async function signToken(payload, secret) {
  return `${encodeBase64Url(payload)}.${await signValue(payload, secret)}`;
}

async function signValue(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );

  return bytesToBase64Url(new Uint8Array(signature));
}

function serializeCookie(name, value, maxAgeSeconds) {
  return [
    `${name}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Secure",
    `Max-Age=${maxAgeSeconds}`,
  ].join("; ");
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
      cookies[key] = value;
      return cookies;
    }, {});
}

function safeEqual(left, right) {
  if (typeof left !== "string" || typeof right !== "string") return false;
  if (left.length !== right.length) return false;

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return mismatch === 0;
}

function encodeBase64Url(value) {
  return bytesToBase64Url(new TextEncoder().encode(value));
}

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function bytesToBase64Url(bytes) {
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
