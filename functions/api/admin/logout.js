import { clearSessionCookie, jsonResponse } from "../../_lib/admin-auth.js";

export async function onRequestPost() {
  return jsonResponse(
    { authenticated: false },
    200,
    {
      "Set-Cookie": await clearSessionCookie(),
    }
  );
}
