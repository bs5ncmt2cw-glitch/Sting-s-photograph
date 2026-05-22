import { isAuthenticated, jsonResponse } from "../../_lib/admin-auth.js";

export async function onRequestGet(context) {
  return jsonResponse({
    authenticated: await isAuthenticated(context.request, context.env),
  });
}
