export type AvatarId = "scout" | "architect" | "shipper" | "mentor";

export type ScoreRecord = {
  id: string;
  name: string;
  company: string;
  cityRaw: string;
  cityNormalized: string;
  avatarId: AvatarId;
  score: number;
  bestCombo: number;
  createdAt: string;
};

export type NewScore = Omit<ScoreRecord, "id" | "createdAt">;

const storageKey = "portfolio-recruiter-game-scores";

const readLocalScores = (): ScoreRecord[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const rawScores = window.localStorage.getItem(storageKey);
  if (!rawScores) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawScores) as ScoreRecord[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.map((record) => ({ ...record, company: record.company ?? "" }));
  } catch {
    return [];
  }
};

const writeLocalScores = (scores: ScoreRecord[]) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(storageKey, JSON.stringify(scores.slice(0, 200)));
};

const sortScores = (scores: ScoreRecord[]) =>
  [...scores].sort((a, b) => b.score - a.score || (a.createdAt < b.createdAt ? 1 : -1));

export const fetchScores = async (): Promise<ScoreRecord[]> => {
  try {
    const response = await fetch("/api/scores");
    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    const data = (await response.json()) as { scores: ScoreRecord[] };
    const scores = sortScores(data.scores ?? []);
    writeLocalScores(scores);
    return scores;
  } catch {
    return sortScores(readLocalScores());
  }
};

export const submitScore = async (score: NewScore): Promise<ScoreRecord[]> => {
  const localFallback = (): ScoreRecord[] => {
    const optimistic: ScoreRecord = {
      ...score,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    const updated = sortScores([optimistic, ...readLocalScores()]);
    writeLocalScores(updated);
    return updated;
  };

  try {
    const response = await fetch("/api/scores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(score),
    });

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`);
    }

    return await fetchScores();
  } catch {
    return localFallback();
  }
};
