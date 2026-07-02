import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Award, Compass, DraftingCompass, Rocket, UserRoundCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DeliveryDashCanvas } from "./game/DeliveryDashCanvas";
import { fetchScores, submitScore } from "../lib/scoresApi";
import type { AvatarId, NewScore, ScoreRecord } from "../lib/scoresApi";

type GameStage = "setup" | "playing" | "finished";

type Avatar = {
  id: AvatarId;
  label: string;
  icon: LucideIcon;
  description: string;
  color: string;
};

type CityOption = {
  name: string;
  aliases: string[];
};

type Player = {
  name: string;
  company: string;
  cityRaw: string;
  cityNormalized: string;
  avatarId: AvatarId;
};

type CityStats = {
  city: string;
  bestScore: number;
  averageScore: number;
  players: number;
};

const avatars: Avatar[] = [
  {
    id: "scout",
    label: "Talent Scout",
    icon: Compass,
    description: "Finds the right signal fast.",
    color: "#06B6D4",
  },
  {
    id: "architect",
    label: "System Architect",
    icon: DraftingCompass,
    description: "Builds for scale and clarity.",
    color: "#6366F1",
  },
  {
    id: "shipper",
    label: "Delivery Hero",
    icon: Rocket,
    description: "Turns ideas into releases.",
    color: "#8B5CF6",
  },
  {
    id: "mentor",
    label: "Team Mentor",
    icon: UserRoundCheck,
    description: "Raises the whole team's level.",
    color: "#22D3EE",
  },
];

const cityOptions: CityOption[] = [
  { name: "Kraków", aliases: ["krakow", "cracow"] },
  { name: "Warszawa", aliases: ["warszawa", "warsaw"] },
  { name: "Wrocław", aliases: ["wroclaw"] },
  { name: "Gdańsk", aliases: ["gdansk"] },
  { name: "Poznań", aliases: ["poznan"] },
  { name: "Katowice", aliases: ["katowice"] },
  { name: "Łódź", aliases: ["lodz"] },
  { name: "Rzeszów", aliases: ["rzeszow"] },
  { name: "Lublin", aliases: ["lublin"] },
  { name: "Szczecin", aliases: ["szczecin"] },
  { name: "Białystok", aliases: ["bialystok"] },
  { name: "Bydgoszcz", aliases: ["bydgoszcz"] },
  { name: "Toruń", aliases: ["torun"] },
  { name: "Gliwice", aliases: ["gliwice"] },
  { name: "Remote", aliases: ["remote", "zdalnie"] },
];

const normalizeCityInput = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const resolveCity = (value: string) => {
  const normalizedValue = normalizeCityInput(value);

  return cityOptions.find((city) =>
    [city.name, ...city.aliases].some((candidate) => normalizeCityInput(candidate) === normalizedValue),
  );
};

const toTitleCaseCity = (value: string) =>
  value
    .trim()
    .split(/\s+/)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1).toLowerCase()}`)
    .join(" ");

const getCanonicalCityName = (value: string) => resolveCity(value)?.name ?? toTitleCaseCity(value);

const getCityStats = (scores: ScoreRecord[]): CityStats[] => {
  const groupedScores = scores.reduce<Record<string, ScoreRecord[]>>((acc, score) => {
    acc[score.cityNormalized] = [...(acc[score.cityNormalized] ?? []), score];
    return acc;
  }, {});

  return Object.entries(groupedScores)
    .map(([city, cityScores]) => {
      const totalScore = cityScores.reduce((sum, score) => sum + score.score, 0);
      const bestScore = Math.max(...cityScores.map((score) => score.score));

      return {
        city,
        bestScore,
        averageScore: Math.round(totalScore / cityScores.length),
        players: cityScores.length,
      };
    })
    .sort((a, b) => b.bestScore - a.bestScore);
};

const Badge = ({ children }: { children: string }) => (
  <span className="rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm font-bold text-ink-light">
    {children}
  </span>
);

export const RecruiterGame = () => {
  const [stage, setStage] = useState<GameStage>("setup");
  const [playerName, setPlayerName] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarId>("scout");
  const [player, setPlayer] = useState<Player | null>(null);
  const [lastResult, setLastResult] = useState({ score: 0, bestCombo: 0 });
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const gamePanelRef = useRef<HTMLDivElement>(null);

  const canonicalCityName = getCanonicalCityName(cityInput);
  const canStartGame =
    playerName.trim().length >= 2 &&
    companyInput.trim().length >= 2 &&
    canonicalCityName.length >= 2;
  const cityStats = useMemo(() => getCityStats(scores), [scores]);
  const topScores = useMemo(() => [...scores].sort((a, b) => b.score - a.score).slice(0, 5), [scores]);

  const selectedAvatarData = avatars.find((avatar) => avatar.id === selectedAvatar) ?? avatars[0];
  const SelectedAvatarIcon = selectedAvatarData.icon;

  useEffect(() => {
    let active = true;

    fetchScores().then((loaded) => {
      if (active) {
        setScores(loaded);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (stage !== "playing") {
      return;
    }

    const panel = gamePanelRef.current;
    if (!panel) {
      return;
    }

    const top = panel.getBoundingClientRect().top + window.scrollY - 88;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  }, [stage]);

  const startGame = () => {
    if (!canStartGame) {
      return;
    }

    setPlayer({
      name: playerName.trim(),
      company: companyInput.trim(),
      cityRaw: cityInput.trim(),
      cityNormalized: canonicalCityName,
      avatarId: selectedAvatar,
    });
    setLastResult({ score: 0, bestCombo: 0 });
    setStage("playing");
  };

  const handleGameOver = (result: { score: number; bestCombo: number }) => {
    setLastResult(result);
    setStage("finished");

    if (!player) {
      return;
    }

    const newScore: NewScore = {
      name: player.name,
      company: player.company,
      cityRaw: player.cityRaw,
      cityNormalized: player.cityNormalized,
      avatarId: player.avatarId,
      score: result.score,
      bestCombo: result.bestCombo,
    };

    submitScore(newScore).then(setScores);
  };

  const resetGame = () => {
    setStage("setup");
    setLastResult({ score: 0, bestCombo: 0 });
  };

  return (
    <main className="min-h-screen bg-base px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-12">
      <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.8fr)]">
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.45em] text-accent-cyan">
              Hiring?
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight text-ink md:text-7xl">
              Play <span className="text-accent-indigo">Delivery Dash.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-relaxed text-ink-light/80">
              A retro neon arcade mini-game for recruiters and HR teams. Pick an avatar, normalize your city, then move around the grid to grab engineering skills and dodge the bugs. Build combos, survive, and climb your city leaderboard.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            <Badge>Canvas arcade engine</Badge>
            <Badge>City validation</Badge>
            <Badge>Local leaderboard</Badge>
            <Badge>Stats ready for Neon</Badge>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { value: `${scores.length}`, label: "games played" },
              { value: `${topScores[0]?.score ?? 0}`, label: "best score" },
              { value: `${cityStats.length}`, label: "cities tracked" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[2rem] border border-ink/10 bg-base-alt p-6">
                <p className="font-display text-4xl font-bold text-ink">{stat.value}</p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          ref={gamePanelRef}
          className="scroll-mt-24 rounded-[3rem] border border-ink/10 bg-base-alt p-4 shadow-2xl sm:p-6"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stage === "setup" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-ink">Create your player</h2>
                <p className="mt-2 font-medium text-ink-light/80">
                  City input accepts variants like Krakow, Kraków or KRAKOW and stores one canonical city.
                </p>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  Name
                </span>
                <input
                  value={playerName}
                  onChange={(event) => setPlayerName(event.target.value)}
                  className="w-full rounded-2xl border border-ink/10 bg-surface-dark px-5 py-4 font-bold text-ink outline-none transition-colors focus:border-accent-cyan"
                  placeholder="Recruiter name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  Company
                </span>
                <input
                  value={companyInput}
                  onChange={(event) => setCompanyInput(event.target.value)}
                  className="w-full rounded-2xl border border-ink/10 bg-surface-dark px-5 py-4 font-bold text-ink outline-none transition-colors focus:border-accent-cyan"
                  placeholder="Company name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  City
                </span>
                <input
                  value={cityInput}
                  onChange={(event) => setCityInput(event.target.value)}
                  list="game-cities"
                  className="w-full rounded-2xl border border-ink/10 bg-surface-dark px-5 py-4 font-bold text-ink outline-none transition-colors focus:border-accent-cyan"
                  placeholder="Kraków"
                />
                <datalist id="game-cities">
                  {cityOptions.map((city) => (
                    <option key={city.name} value={city.name} />
                  ))}
                </datalist>
                <p className={`mt-2 text-sm font-medium ${canonicalCityName.length >= 2 ? "text-accent-cyan" : "text-ink-light/60"}`}>
                  {canonicalCityName.length >= 2
                    ? `Will be saved as ${canonicalCityName}.`
                    : "Enter a city to start."}
                </p>
              </label>

              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  Avatar
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`rounded-2xl border p-4 text-left transition-colors ${
                        selectedAvatar === avatar.id
                          ? "border-accent-cyan bg-accent-cyan/10"
                          : "border-ink/10 bg-surface-dark/70 hover:border-ink/30"
                      }`}
                    >
                      <avatar.icon size={32} style={{ color: avatar.color }} />
                      <span className="mt-3 block font-display text-lg font-bold text-ink">
                        {avatar.label}
                      </span>
                      <span className="mt-1 block text-sm font-medium text-ink-light/70">
                        {avatar.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                type="button"
                onClick={startGame}
                disabled={!canStartGame}
                className="w-full rounded-full bg-accent-indigo px-8 py-4 font-bold text-white shadow-lg transition-colors hover:bg-accent-violet disabled:cursor-not-allowed disabled:bg-ink-light/30"
                whileHover={canStartGame ? { scale: 1.03 } : undefined}
                whileTap={canStartGame ? { scale: 0.97 } : undefined}
              >
                Start the arcade run
              </motion.button>
            </div>
          )}

          {stage === "playing" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  <SelectedAvatarIcon size={18} style={{ color: selectedAvatarData.color }} />
                  {player?.name}
                </p>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  {player?.cityNormalized}
                </p>
              </div>

              <DeliveryDashCanvas accentColor={selectedAvatarData.color} onGameOver={handleGameOver} />

              <p className="text-center text-sm font-medium text-ink-light/70">
                Move with your mouse, touch, or WASD / arrow keys. Grab skills, dodge bugs, keep the combo alive.
              </p>
            </div>
          )}

          {stage === "finished" && (
            <div className="space-y-6 text-center">
              <Award className="mx-auto text-accent-cyan" size={56} />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-ink-light">
                  Run complete
                </p>
                <h2 className="mt-2 font-display text-5xl font-bold text-ink">{lastResult.score} pts</h2>
                <p className="mt-3 font-medium text-ink-light/80">
                  Best combo streak: {lastResult.bestCombo}. Saved locally for now, ready to move into Neon once the backend endpoint is added.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={startGame}
                  className="rounded-full bg-accent-indigo px-6 py-4 font-bold text-white transition-colors hover:bg-accent-violet"
                >
                  Play again
                </button>
                <button
                  type="button"
                  onClick={resetGame}
                  className="rounded-full border border-ink/20 px-6 py-4 font-bold text-ink transition-colors hover:bg-ink/10"
                >
                  Change player
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-[3rem] border border-ink/10 bg-base-alt p-6 shadow-2xl">
          <h2 className="font-display text-3xl font-bold text-ink">City leaderboard</h2>
          <p className="mt-2 font-medium text-ink-light/80">
            Best scores grouped by normalized city names.
          </p>
          <div className="mt-8 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityStats.slice(0, 8)}>
                <CartesianGrid stroke="rgba(148, 163, 184, 0.15)" vertical={false} />
                <XAxis dataKey="city" stroke="var(--color-ink-light)" tickLine={false} />
                <YAxis stroke="var(--color-ink-light)" tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(99, 102, 241, 0.12)" }}
                  contentStyle={{
                    background: "var(--color-surface-dark)",
                    border: "1px solid rgba(248, 250, 252, 0.1)",
                    borderRadius: "1rem",
                    color: "var(--color-ink)",
                  }}
                />
                <Bar dataKey="bestScore" fill="var(--color-accent-cyan)" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[3rem] border border-ink/10 bg-base-alt p-6 shadow-2xl">
          <h2 className="font-display text-3xl font-bold text-ink">Top players</h2>
          <div className="mt-6 space-y-3">
            {topScores.length > 0 ? (
              topScores.map((record, i) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between gap-4 rounded-2xl bg-surface-dark/70 p-4"
                >
                  <div>
                    <p className="font-bold text-ink">
                      {i + 1}. {record.name}
                    </p>
                    <p className="text-sm font-medium text-ink-light">
                      {record.company ? `${record.company} · ${record.cityNormalized}` : record.cityNormalized}
                    </p>
                  </div>
                  <p className="font-display text-2xl font-bold text-accent-cyan">{record.score}</p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl bg-surface-dark/70 p-4 font-medium text-ink-light/80">
                No scores yet. Be the first recruiter on the board.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
