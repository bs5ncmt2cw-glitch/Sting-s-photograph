import { isAuthenticated, jsonResponse } from "../../_lib/admin-auth.js";
import { storeImageInBucket } from "../../_lib/image-store.js";

export async function onRequestPost(context) {
  if (!(await isAuthenticated(context.request, context.env))) {
    return jsonResponse({ message: "Unauthorized." }, 401);
  }

  let formData;
  try {
    formData = await context.request.formData();
  } catch {
    return jsonResponse({ message: "Expected multipart form data." }, 400);
  }

  const file = formData.get("file");
  const category = formData.get("category");

  if (!(file instanceof File)) {
    return jsonResponse({ message: "Missing image file." }, 400);
  }

  if (!file.type.startsWith("image/")) {
    return jsonResponse({ message: "Only image uploads are supported." }, 400);
  }

  try {
    const stored = await storeImageInBucket(context.env, file, category);
    return jsonResponse(stored, 200);
  } catch (error) {
    return jsonResponse(
      {
        message: error.message || "Unable to upload image.",
      },
      500
    );
  }
}
