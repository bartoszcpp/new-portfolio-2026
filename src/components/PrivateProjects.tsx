import { motion } from "motion/react";
import { Check, Dices, Github, Star } from "lucide-react";
import arcadeImage from "../../assets/arcade-platform.png";
import voxelImage from "../../assets/voxel-earth.png";
import { useTranslation } from "../i18n/LanguageContext";

type Tag = {
  label: string;
  color: string;
};

type PrivateProject = {
  image?: string;
  github: string;
  repoLabel: string;
  tags: readonly Tag[];
  wip?: boolean;
  currentStep?: number;
};

const privateProjects: PrivateProject[] = [
  {
    image: arcadeImage,
    github: "https://github.com/bartoszcpp/retro-arcade",
    repoLabel: "bartoszcpp / retro-arcade",
    tags: [
      { label: "React", color: "#06B6D4" },
      { label: "TypeScript", color: "#6366F1" },
      { label: "Node.js", color: "#22C55E" },
      { label: "WebSockets", color: "#8B5CF6" },
      { label: "PostgreSQL", color: "#38BDF8" },
      { label: "Prisma", color: "#E2E8F0" },
    ],
  },
  {
    image: voxelImage,
    github: "https://github.com/bartoszcpp/voxel-earth",
    repoLabel: "bartoszcpp / voxel-earth",
    tags: [
      { label: "Go", color: "#22D3EE" },
      { label: "React", color: "#06B6D4" },
      { label: "TypeScript", color: "#6366F1" },
      { label: "Three.js", color: "#E2E8F0" },
      { label: "WebGL", color: "#8B5CF6" },
      { label: "Web Workers", color: "#22C55E" },
    ],
  },
  {
    github: "https://github.com/bartoszcpp/board-game-domeknagornicy",
    repoLabel: "bartoszcpp / board-game-domeknagornicy",
    wip: true,
    currentStep: 1,
    tags: [
      { label: "Next.js", color: "#E2E8F0" },
      { label: "React", color: "#06B6D4" },
      { label: "TypeScript", color: "#6366F1" },
      { label: "Pixi.js", color: "#EC4899" },
      { label: "XState", color: "#F59E0B" },
      { label: "Zustand", color: "#22C55E" },
      { label: "Tailwind CSS", color: "#38BDF8" },
    ],
  },
];

export const PrivateProjects = () => {
  const t = useTranslation();

  return (
    <section
      id="private-projects"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32 lg:px-12 scroll-mt-12"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.4]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,var(--color-base)_85%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.45em] text-accent-violet">
            <span className="h-px w-10 bg-accent-violet/60" />
            {t.privateProjects.eyebrow}
          </p>
          <h2 className="font-display text-5xl font-bold leading-tight text-ink md:text-7xl">
            {t.privateProjects.titleLead}{" "}
            <span className="text-ink-light italic">{t.privateProjects.titleEmphasis}</span>
          </h2>
          <p className="mt-6 text-lg font-medium leading-relaxed text-ink-light">
            {t.privateProjects.subtitle}
          </p>
        </motion.div>

        <div className="mt-16 space-y-10">
          {privateProjects.map((project, index) => {
            const copy = t.privateProjects.items[index];
            const reverse = index % 2 === 1;

            return (
              <motion.article
                key={copy.title}
                className="group overflow-hidden rounded-[2rem] border border-ink/10 bg-base-alt shadow-2xl sm:rounded-[2.5rem]"
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-3 border-b border-ink/10 bg-surface-dark/80 px-5 py-3.5">
                  <span className="flex gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
                    <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
                    <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
                  </span>
                  <span className="ml-1 flex min-w-0 items-center gap-2 font-mono text-xs text-ink-light sm:text-sm">
                    <Github size={14} className="shrink-0" />
                    <span className="truncate">{project.repoLabel}</span>
                  </span>
                  {project.wip ? (
                    <span className="ml-auto flex items-center gap-1.5 rounded-full border border-amber-400/40 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-amber-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                      {t.privateProjects.wip}
                    </span>
                  ) : (
                    <span className="ml-auto hidden items-center gap-1.5 rounded-full border border-accent-violet/40 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent-violet sm:flex">
                      <Star size={12} className="fill-accent-violet" />
                      {t.privateProjects.featured}
                    </span>
                  )}
                </div>

                <div className={`grid ${reverse ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-[1.15fr_1fr]"}`}>
                  <div
                    className={`relative order-1 min-h-[220px] overflow-hidden border-b border-ink/10 bg-surface-dark lg:border-b-0 ${
                      reverse ? "lg:order-2 lg:border-l" : "lg:order-1 lg:border-r"
                    }`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_65%)]" />
                    {project.image ? (
                      <>
                        <img
                          src={project.image}
                          alt=""
                          loading="lazy"
                          className="relative block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.16)_0px,rgba(0,0,0,0.16)_1px,transparent_1px,transparent_3px)] mix-blend-multiply" />
                      </>
                    ) : (
                      <div className="relative z-10 flex h-full flex-col justify-center gap-5 p-6 sm:p-9">
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
                        <div className="relative flex items-center gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-violet/15 text-accent-violet">
                            <Dices size={26} />
                          </span>
                          <p className="font-display text-lg font-bold text-ink">
                            {t.privateProjects.roadmapTitle}
                          </p>
                        </div>
                        <ol className="relative space-y-2.5">
                          {t.privateProjects.boardGameSteps.map((step, stepIndex) => {
                            const stepNumber = stepIndex + 1;
                            const current = project.currentStep ?? 0;
                            const isDone = stepNumber < current;
                            const isCurrent = stepNumber === current;

                            return (
                              <li
                                key={step}
                                className={`flex items-center gap-3 text-sm font-medium ${
                                  isCurrent
                                    ? "text-ink"
                                    : isDone
                                      ? "text-ink-light"
                                      : "text-ink-light/45"
                                }`}
                              >
                                <span
                                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                                    isCurrent
                                      ? "bg-accent-violet text-white"
                                      : isDone
                                        ? "bg-accent-violet/20 text-accent-violet"
                                        : "border border-ink/15 text-ink-light/50"
                                  }`}
                                >
                                  {isDone ? <Check size={13} /> : stepNumber}
                                </span>
                                <span className={isCurrent ? "font-bold" : undefined}>{step}</span>
                                {isCurrent && (
                                  <span className="ml-auto flex items-center gap-1.5 rounded-full bg-accent-violet/15 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.15em] text-accent-violet">
                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-violet" />
                                    {t.privateProjects.currentStepLabel}
                                  </span>
                                )}
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-col gap-6 p-6 sm:p-9 ${reverse ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="space-y-2">
                      <h3 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                        {copy.title}
                      </h3>
                      <p className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-accent-violet">
                        {copy.subtitle}
                      </p>
                    </div>

                    <div className="space-y-4 text-base font-medium leading-relaxed text-ink-light">
                      {copy.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag.label}
                          className="flex items-center gap-2 rounded-full border border-ink/10 bg-surface-dark/70 px-3.5 py-1.5 font-mono text-xs font-bold text-ink-light"
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: tag.color }}
                          />
                          {tag.label}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-violet px-6 py-3 font-bold text-white transition-transform hover:scale-[1.03]"
                    >
                      <Github size={18} />
                      {t.privateProjects.viewCode}
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
