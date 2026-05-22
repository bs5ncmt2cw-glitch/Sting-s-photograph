const CONTENT_KEY = "travel-photo-spots";

export async function loadSharedContent(env) {
  const db = getDb(env);
  const row = await db
    .prepare("SELECT data_json FROM content_documents WHERE content_key = ?")
    .bind(CONTENT_KEY)
    .first();

  if (!row?.data_json) {
    return null;
  }

  return JSON.parse(row.data_json);
}

export async function saveSharedContent(env, data) {
  const db = getDb(env);
  const serialized = JSON.stringify(data);

  await db
    .prepare(
      `INSERT INTO content_documents (content_key, data_json, updated_at)
       VALUES (?, ?, datetime('now'))
       ON CONFLICT(content_key) DO UPDATE
       SET data_json = excluded.data_json,
           updated_at = datetime('now')`
    )
    .bind(CONTENT_KEY, serialized)
    .run();

  return data;
}

function getDb(env) {
  if (!env.CONTENT_DB) {
    throw new Error("Missing CONTENT_DB D1 binding.");
  }

  return env.CONTENT_DB;
}
