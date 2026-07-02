import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import type { Request, Response } from "express";
import { neon } from "@neondatabase/serverless";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(currentDir, "../dist");

const databaseUrl = process.env.DATABASE_URL;
const sql = databaseUrl ? neon(databaseUrl) : null;

if (!sql) {
  console.warn(
    "[server] DATABASE_URL is not set. /api/scores will respond with 503 until a Neon connection string is provided.",
  );
}

type ScoreRow = {
  id: string;
  name: string;
  company: string;
  city_raw: string;
  city_normalized: string;
  avatar_id: string;
  score: number;
  best_combo: number;
  created_at: string | Date;
};

type ScoreRecord = {
  id: string;
  name: string;
  company: string;
  cityRaw: string;
  cityNormalized: string;
  avatarId: string;
  score: number;
  bestCombo: number;
  createdAt: string;
};

type NewScore = Omit<ScoreRecord, "id" | "createdAt">;

const mapRow = (row: ScoreRow): ScoreRecord => ({
  id: row.id,
  name: row.name,
  company: row.company ?? "",
  cityRaw: row.city_raw,
  cityNormalized: row.city_normalized,
  avatarId: row.avatar_id,
  score: Number(row.score),
  bestCombo: Number(row.best_combo),
  createdAt: new Date(row.created_at).toISOString(),
});

const clampText = (value: unknown, maxLength: number): string =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const parseNewScore = (body: unknown): NewScore | null => {
  if (typeof body !== "object" || body === null) {
    return null;
  }

  const raw = body as Record<string, unknown>;
  const name = clampText(raw.name, 60);
  const cityNormalized = clampText(raw.cityNormalized, 80);

  if (name.length < 2 || cityNormalized.length < 2) {
    return null;
  }

  const score = Number(raw.score);
  const bestCombo = Number(raw.bestCombo);

  if (!Number.isFinite(score) || !Number.isFinite(bestCombo)) {
    return null;
  }

  return {
    name,
    company: clampText(raw.company, 80),
    cityRaw: clampText(raw.cityRaw, 80) || cityNormalized,
    cityNormalized,
    avatarId: clampText(raw.avatarId, 40) || "scout",
    score: Math.max(0, Math.min(Math.round(score), 1_000_000)),
    bestCombo: Math.max(0, Math.min(Math.round(bestCombo), 100_000)),
  };
};

const ensureSchema = async () => {
  if (!sql) {
    return;
  }

  await sql`
    CREATE TABLE IF NOT EXISTS game_scores (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      company TEXT NOT NULL DEFAULT '',
      city_raw TEXT NOT NULL,
      city_normalized TEXT NOT NULL,
      avatar_id TEXT NOT NULL,
      score INTEGER NOT NULL,
      best_combo INTEGER NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `;

  await sql`ALTER TABLE game_scores ADD COLUMN IF NOT EXISTS company TEXT NOT NULL DEFAULT '';`;
  await sql`
    DELETE FROM game_scores a
    USING game_scores b
    WHERE lower(a.name) = lower(b.name)
      AND lower(a.company) = lower(b.company)
      AND lower(a.city_normalized) = lower(b.city_normalized)
      AND (a.score < b.score OR (a.score = b.score AND a.created_at < b.created_at));
  `;
  await sql`
    CREATE UNIQUE INDEX IF NOT EXISTS game_scores_identity_idx
    ON game_scores (lower(name), lower(company), lower(city_normalized));
  `;
};

const maxLeaderboardRows = 500;
const rateLimitWindowMs = 60_000;
const rateLimitMaxWrites = 20;
const writeHitsByIp = new Map<string, { count: number; resetAt: number }>();

const isWriteRateLimited = (ip: string): boolean => {
  const now = Date.now();
  const entry = writeHitsByIp.get(ip);

  if (!entry || now > entry.resetAt) {
    writeHitsByIp.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  entry.count += 1;
  return entry.count > rateLimitMaxWrites;
};

const app = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "8kb" }));

app.get("/api/scores", async (_req: Request, res: Response) => {
  if (!sql) {
    res.status(503).json({ error: "Database not configured" });
    return;
  }

  try {
    const rows = (await sql`
      SELECT id, name, company, city_raw, city_normalized, avatar_id, score, best_combo, created_at
      FROM game_scores
      ORDER BY score DESC, created_at DESC
      LIMIT 200;
    `) as ScoreRow[];

    res.json({ scores: rows.map(mapRow) });
  } catch (error) {
    console.error("[server] Failed to load scores", error);
    res.status(500).json({ error: "Failed to load scores" });
  }
});

app.post("/api/scores", async (req: Request, res: Response) => {
  if (!sql) {
    res.status(503).json({ error: "Database not configured" });
    return;
  }

  if (isWriteRateLimited(req.ip ?? "unknown")) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  const payload = parseNewScore(req.body);
  if (!payload) {
    res.status(400).json({ error: "Invalid payload" });
    return;
  }

  try {
    const rows = (await sql`
      INSERT INTO game_scores (name, company, city_raw, city_normalized, avatar_id, score, best_combo)
      VALUES (
        ${payload.name},
        ${payload.company},
        ${payload.cityRaw},
        ${payload.cityNormalized},
        ${payload.avatarId},
        ${payload.score},
        ${payload.bestCombo}
      )
      ON CONFLICT (lower(name), lower(company), lower(city_normalized))
      DO UPDATE SET
        score = EXCLUDED.score,
        best_combo = EXCLUDED.best_combo,
        avatar_id = EXCLUDED.avatar_id,
        city_raw = EXCLUDED.city_raw,
        name = EXCLUDED.name,
        company = EXCLUDED.company,
        created_at = now()
      WHERE EXCLUDED.score > game_scores.score
      RETURNING id, name, company, city_raw, city_normalized, avatar_id, score, best_combo, created_at;
    `) as ScoreRow[];

    await sql`
      DELETE FROM game_scores
      WHERE id NOT IN (
        SELECT id FROM game_scores
        ORDER BY score DESC, created_at DESC
        LIMIT ${maxLeaderboardRows}
      );
    `;

    const updated = rows.length > 0;
    res.status(updated ? 201 : 200).json({ updated, score: updated ? mapRow(rows[0]) : null });
  } catch (error) {
    console.error("[server] Failed to save score", error);
    res.status(500).json({ error: "Failed to save score" });
  }
});

app.use(express.static(distPath));
app.get("*", (_req: Request, res: Response) => {
  res.sendFile(path.join(distPath, "index.html"));
});

const port = Number(process.env.PORT ?? 3001);

ensureSchema()
  .catch((error) => console.error("[server] Failed to ensure schema", error))
  .finally(() => {
    app.listen(port, () => {
      console.log(`[server] API listening on http://localhost:${port}`);
    });
  });
