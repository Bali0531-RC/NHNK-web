import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync } from "node:sqlite";

/**
 * Storage for closed-test signups.
 *
 * Uses Node's built-in SQLite so the server needs no native module and no
 * separate database process. Only the address and when it arrived are kept --
 * see the privacy policy, which promises exactly that and nothing more.
 */

const DB_PATH = process.env.NHNK_DB_PATH ?? "./data/testers.db";

let db: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (db) return db;

  mkdirSync(dirname(DB_PATH), { recursive: true });
  db = new DatabaseSync(DB_PATH);
  db.exec(`
    CREATE TABLE IF NOT EXISTS testers (
      id          TEXT PRIMARY KEY,
      email       TEXT NOT NULL UNIQUE,
      lang        TEXT NOT NULL DEFAULT 'hu',
      created_at  TEXT NOT NULL
    );
  `);
  return db;
}

export type SignupResult = "added" | "already-registered";

/** Normalised so the UNIQUE index actually catches duplicates. */
export function normaliseEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

/**
 * Deliberately conservative rather than RFC-complete: anything this rejects
 * would not have worked as a Google account for Play testing either.
 */
export function isPlausibleEmail(email: string): boolean {
  if (email.length < 6 || email.length > 254) return false;
  if (/\s/.test(email)) return false;
  return /^[^@]+@[^@.]+(\.[^@.]+)+$/.test(email);
}

export function addTester(email: string, lang: string): SignupResult {
  const database = getDb();
  const existing = database
    .prepare("SELECT 1 FROM testers WHERE email = ?")
    .get(email);
  if (existing) return "already-registered";

  database
    .prepare("INSERT INTO testers (id, email, lang, created_at) VALUES (?, ?, ?, ?)")
    .run(randomUUID(), email, lang === "en" ? "en" : "hu", new Date().toISOString());
  return "added";
}

export type TesterRow = { email: string; lang: string; created_at: string };

export function listTesters(): TesterRow[] {
  return getDb()
    .prepare("SELECT email, lang, created_at FROM testers ORDER BY created_at ASC")
    .all() as unknown as TesterRow[];
}

export function countTesters(): number {
  const row = getDb().prepare("SELECT COUNT(*) AS n FROM testers").get() as
    | { n: number }
    | undefined;
  return row?.n ?? 0;
}
