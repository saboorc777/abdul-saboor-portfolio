-- ============================================================
-- PORTFOLIO DATABASE SCHEMA
-- Written against SQLite (used by db/database.js via better-sqlite3).
-- To use MySQL/Postgres instead: swap AUTOINCREMENT for
-- AUTO_INCREMENT / SERIAL and TEXT/INTEGER types as needed —
-- the shape of the tables stays the same.
-- ============================================================

CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  tech TEXT NOT NULL DEFAULT '[]',      -- JSON array stored as text
  github TEXT,
  live TEXT,
  image TEXT,
  featured INTEGER NOT NULL DEFAULT 0,  -- 0/1 boolean
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  image TEXT,
  file_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Small key/value store for single-value site settings — currently just
-- the About-section profile photo, but a natural place for similar
-- one-off settings later.
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);
