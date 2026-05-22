CREATE TABLE IF NOT EXISTS content_documents (
  content_key TEXT PRIMARY KEY,
  data_json TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
