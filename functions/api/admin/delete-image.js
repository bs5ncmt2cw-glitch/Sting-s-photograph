import { isAuthenticated, jsonResponse, readJsonBody } from "../../_lib/admin-auth.js";
import { deleteImageFromBucket, imageUrlToKey } from "../../_lib/image-store.js";

export async function onRequestPost(context) {
  if (!(await isAuthenticated(context.request, context.env))) {
    return jsonResponse({ message: "Unauthorized." }, 401);
  }

  const body = await readJsonBody(context.request);
  const imageUrls = Array.isArray(body?.imageUrls) ? body.imageUrls : [];

  const keys = [...new Set(imageUrls.map(imageUrlToKey).filter(Boolean))];
  if (!keys.length) {
    return jsonResponse({ ok: true, deleted: 0 });
  }

  try {
    await Promise.all(keys.map((key) => deleteImageFromBucket(context.env, key)));
    return jsonResponse({ ok: true, deleted: keys.length });
  } catch (error) {
    return jsonResponse(
      {
        message: error.message || "Unable to delete image objects.",
      },
      500
    );
  }
}
