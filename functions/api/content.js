import { jsonResponse } from "../_lib/admin-auth.js";
import { loadSharedContent } from "../_lib/content-store.js";

export async function onRequestGet(context) {
  try {
    const data = await loadSharedContent(context.env);
    if (!data) {
      return jsonResponse({ initialized: false, data: null }, 404);
    }

    return jsonResponse({
      initialized: true,
      data,
    });
  } catch (error) {
    return jsonResponse(
      {
        message: error.message || "Unable to load content.",
      },
      500
    );
  }
}
