import {
  createSessionCookie,
  isPasswordMatch,
  jsonResponse,
  readJsonBody,
} from "../../_lib/admin-auth.js";

export async function onRequestPost(context) {
  if (!context.env.ADMIN_PASSWORD) {
    return jsonResponse({ message: "Missing ADMIN_PASSWORD." }, 500);
  }

  const body = await readJsonBody(context.request);
  const passcode = typeof body.passcode === "string" ? body.passcode : "";

  if (!isPasswordMatch(passcode, context.env.ADMIN_PASSWORD)) {
    return jsonResponse({ message: "Passcode not correct." }, 401);
  }

  return jsonResponse(
    { authenticated: true },
    200,
    {
      "Set-Cookie": await createSessionCookie(context.env),
    }
  );
}
