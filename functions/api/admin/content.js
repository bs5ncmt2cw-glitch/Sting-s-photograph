import {
  isAuthenticated,
  jsonResponse,
  readJsonBody,
} from "../../_lib/admin-auth.js";
import { saveSharedContent } from "../../_lib/content-store.js";

export async function onRequestPost(context) {
  if (!(await isAuthenticated(context.request, context.env))) {
    return jsonResponse({ message: "Unauthorized." }, 401);
  }

  const body = await readJsonBody(context.request);
  if (!Array.isArray(body?.places) || !Array.isArray(body?.spots)) {
    return jsonResponse(
      {
        message: "Expected places and spots arrays.",
      },
      400
    );
  }

  try {
    await saveSharedContent(context.env, body);
    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse(
      {
        message: error.message || "Unable to save content.",
      },
      500
    );
  }
}
