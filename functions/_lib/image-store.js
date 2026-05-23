const IMAGE_URL_PREFIX = "/api/images/";

export async function storeImageInBucket(env, file, category = "spot") {
  const bucket = getBucket(env);
  const extension = getFileExtension(file);
  const key = `${sanitizeCategory(category)}-${crypto.randomUUID()}${extension}`;
  const arrayBuffer = await file.arrayBuffer();

  await bucket.put(key, arrayBuffer, {
    httpMetadata: {
      contentType: file.type || "application/octet-stream",
    },
    customMetadata: {
      originalName: file.name || key,
    },
  });

  return {
    imageKey: key,
    imageUrl: `${IMAGE_URL_PREFIX}${key}`,
  };
}

export async function loadImageFromBucket(env, key) {
  const bucket = getBucket(env);
  return bucket.get(key);
}

function getBucket(env) {
  if (!env.IMAGES_BUCKET) {
    throw new Error("Missing IMAGES_BUCKET R2 binding.");
  }

  return env.IMAGES_BUCKET;
}

function sanitizeCategory(value) {
  return String(value || "image")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "image";
}

function getFileExtension(file) {
  const fileName = file?.name || "";
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex > -1) {
    return fileName.slice(dotIndex).toLowerCase();
  }

  if (file?.type === "image/jpeg") return ".jpg";
  if (file?.type === "image/png") return ".png";
  if (file?.type === "image/webp") return ".webp";
  return "";
}
