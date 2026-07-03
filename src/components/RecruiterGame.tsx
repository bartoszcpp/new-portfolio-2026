import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Award, Compass, DraftingCompass, Maximize2, Rocket, UserRoundCheck } from "lucide-react";
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
import { useTranslation } from "../i18n/LanguageContext";

type GameStage = "setup" | "playing" | "finished";

type AvatarStyle = {
  id: AvatarId;
  icon: LucideIcon;
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

const avatarStyles: AvatarStyle[] = [
  { id: "scout", icon: Compass, color: "#06B6D4" },
  { id: "architect", icon: DraftingCompass, color: "#6366F1" },
  { id: "shipper", icon: Rocket, color: "#8B5CF6" },
  { id: "mentor", icon: UserRoundCheck, color: "#22D3EE" },
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

const Badge = ({ children }: { children: string; key?: string }) => (
  <span className="rounded-full border border-ink/10 bg-ink/5 px-4 py-2 text-sm font-bold text-ink-light">
    {children}
  </span>
);

export const RecruiterGame = () => {
  const t = useTranslation();
  const [stage, setStage] = useState<GameStage>("setup");
  const [playerName, setPlayerName] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarId>("scout");
  const [player, setPlayer] = useState<Player | null>(null);
  const [lastResult, setLastResult] = useState({ score: 0, bestCombo: 0 });
  const [scores, setScores] = useState<ScoreRecord[]>([]);
  const [wantFullscreen, setWantFullscreen] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gamePanelRef = useRef<HTMLDivElement>(null);

  const canonicalCityName = getCanonicalCityName(cityInput);
  const canStartGame =
    playerName.trim().length >= 2 &&
    companyInput.trim().length >= 2 &&
    canonicalCityName.length >= 2;
  const cityStats = useMemo(() => getCityStats(scores), [scores]);
  const topScores = useMemo(() => [...scores].sort((a, b) => b.score - a.score).slice(0, 5), [scores]);

  const selectedAvatarData =
    avatarStyles.find((avatar) => avatar.id === selectedAvatar) ?? avatarStyles[0];
  const SelectedAvatarIcon = selectedAvatarData.icon;
  const canvasStrings = {
    score: t.game.canvasHud.score,
    combo: t.game.canvasHud.combo,
    streak: t.game.canvasHud.streak,
    hintTouch: t.game.canvasHud.hintTouch,
    hintDesktop: t.game.canvasHud.hintDesktop,
    fullscreenEnter: t.game.canvasHud.fullscreenEnter,
    fullscreenExit: t.game.canvasHud.fullscreenExit,
  };

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

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(Boolean(document.fullscreenElement));

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const enterFullscreen = () => {
    const panel = gamePanelRef.current;
    if (panel?.requestFullscreen && !document.fullscreenElement) {
      panel.requestFullscreen().catch(() => undefined);
    }
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    } else {
      enterFullscreen();
    }
  };

  const startGame = () => {
    if (!canStartGame) {
      return;
    }

    if (wantFullscreen) {
      enterFullscreen();
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
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => undefined);
    }

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
              {t.game.eyebrow}
            </p>
            <h1 className="font-display text-5xl font-bold leading-tight text-ink md:text-7xl">
              {t.game.titleLead} <span className="text-accent-indigo">{t.game.titleEmphasis}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-relaxed text-ink-light/80">
              {t.game.intro}
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            {t.game.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { value: `${scores.length}`, label: t.game.stats.games },
              { value: `${topScores[0]?.score ?? 0}`, label: t.game.stats.best },
              { value: `${cityStats.length}`, label: t.game.stats.cities },
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
          className={`scroll-mt-24 border border-ink/10 bg-base-alt shadow-2xl ${
            isFullscreen
              ? "flex flex-col items-center justify-center overflow-auto p-4"
              : "rounded-[3rem] p-4 sm:p-6"
          }`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {stage === "setup" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-3xl font-bold text-ink">{t.game.setup.title}</h2>
                <p className="mt-2 font-medium text-ink-light/80">{t.game.setup.subtitle}</p>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  {t.game.setup.name}
                </span>
                <input
                  value={playerName}
                  onChange={(event) => setPlayerName(event.target.value)}
                  className="w-full rounded-2xl border border-ink/10 bg-surface-dark px-5 py-4 font-bold text-ink outline-none transition-colors focus:border-accent-cyan"
                  placeholder={t.game.setup.namePlaceholder}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  {t.game.setup.company}
                </span>
                <input
                  value={companyInput}
                  onChange={(event) => setCompanyInput(event.target.value)}
                  className="w-full rounded-2xl border border-ink/10 bg-surface-dark px-5 py-4 font-bold text-ink outline-none transition-colors focus:border-accent-cyan"
                  placeholder={t.game.setup.companyPlaceholder}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  {t.game.setup.city}
                </span>
                <input
                  value={cityInput}
                  onChange={(event) => setCityInput(event.target.value)}
                  list="game-cities"
                  className="w-full rounded-2xl border border-ink/10 bg-surface-dark px-5 py-4 font-bold text-ink outline-none transition-colors focus:border-accent-cyan"
                  placeholder={t.game.setup.cityPlaceholder}
                />
                <datalist id="game-cities">
                  {cityOptions.map((city) => (
                    <option key={city.name} value={city.name} />
                  ))}
                </datalist>
                <p className={`mt-2 text-sm font-medium ${canonicalCityName.length >= 2 ? "text-accent-cyan" : "text-ink-light/60"}`}>
                  {canonicalCityName.length >= 2
                    ? t.game.setup.cityHintSaved.replace("{city}", canonicalCityName)
                    : t.game.setup.cityHintEnter}
                </p>
              </label>

              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  {t.game.setup.avatar}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {avatarStyles.map((avatar, index) => {
                    const AvatarIcon = avatar.icon;
                    const copy = t.game.avatars[index];

                    return (
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
                        <AvatarIcon size={32} style={{ color: avatar.color }} />
                        <span className="mt-3 block font-display text-lg font-bold text-ink">
                          {copy.label}
                        </span>
                        <span className="mt-1 block text-sm font-medium text-ink-light/70">
                          {copy.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-ink/10 bg-surface-dark/70 p-4">
                <input
                  type="checkbox"
                  checked={wantFullscreen}
                  onChange={(event) => setWantFullscreen(event.target.checked)}
                  className="h-5 w-5 accent-accent-cyan"
                />
                <span className="flex items-center gap-2 font-bold text-ink">
                  <Maximize2 size={18} className="text-accent-cyan" />
                  {t.game.setup.fullscreen}
                </span>
              </label>

              <motion.button
                type="button"
                onClick={startGame}
                disabled={!canStartGame}
                className="w-full rounded-full bg-accent-indigo px-8 py-4 font-bold text-white shadow-lg transition-colors hover:bg-accent-violet disabled:cursor-not-allowed disabled:bg-ink-light/30"
                whileHover={canStartGame ? { scale: 1.03 } : undefined}
                whileTap={canStartGame ? { scale: 0.97 } : undefined}
              >
                {t.game.setup.start}
              </motion.button>
            </div>
          )}

          {stage === "playing" && (
            <div className={`w-full space-y-4 ${isFullscreen ? "flex h-full flex-col justify-center" : ""}`}>
              <div className="flex items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  <SelectedAvatarIcon size={18} style={{ color: selectedAvatarData.color }} />
                  {player?.name}
                </p>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink-light">
                  {player?.cityNormalized}
                </p>
              </div>

              <DeliveryDashCanvas
                accentColor={selectedAvatarData.color}
                strings={canvasStrings}
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
                onGameOver={handleGameOver}
              />

              <p className="text-center text-sm font-medium text-ink-light/70">
                {t.game.playing.hint}
              </p>
            </div>
          )}

          {stage === "finished" && (
            <div className="space-y-6 text-center">
              <Award className="mx-auto text-accent-cyan" size={56} />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-ink-light">
                  {t.game.finished.complete}
                </p>
                <h2 className="mt-2 font-display text-5xl font-bold text-ink">
                  {lastResult.score} {t.game.finished.pts}
                </h2>
                <p className="mt-3 font-medium text-ink-light/80">
                  {t.game.finished.bestCombo.replace("{combo}", String(lastResult.bestCombo))}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={startGame}
                  className="rounded-full bg-accent-indigo px-6 py-4 font-bold text-white transition-colors hover:bg-accent-violet"
                >
                  {t.game.finished.playAgain}
                </button>
                <button
                  type="button"
                  onClick={resetGame}
                  className="rounded-full border border-ink/20 px-6 py-4 font-bold text-ink transition-colors hover:bg-ink/10"
                >
                  {t.game.finished.changePlayer}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="rounded-[3rem] border border-ink/10 bg-base-alt p-6 shadow-2xl">
          <h2 className="font-display text-3xl font-bold text-ink">{t.game.leaderboard.title}</h2>
          <p className="mt-2 font-medium text-ink-light/80">{t.game.leaderboard.subtitle}</p>
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
          <h2 className="font-display text-3xl font-bold text-ink">{t.game.topPlayers.title}</h2>
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
                {t.game.topPlayers.empty}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
