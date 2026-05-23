import { loadImageFromBucket } from "../../_lib/image-store.js";

export async function onRequestGet(context) {
  const key = context.params.key;
  if (!key) {
    return new Response("Not found", { status: 404 });
  }

  const object = await loadImageFromBucket(context.env, key);
  if (!object) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Cache-Control", "public, max-age=31536000, immutable");
  if (object.httpEtag) {
    headers.set("ETag", object.httpEtag);
  }
  if (object.httpMetadata?.contentType) {
    headers.set("Content-Type", object.httpMetadata.contentType);
  }

  return new Response(object.body, {
    status: 200,
    headers,
  });
}
