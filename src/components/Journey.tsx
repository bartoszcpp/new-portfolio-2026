import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { BriefcaseBusiness, Code2, Palette, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type AccentName = "accent-cyan" | "accent-indigo" | "accent-violet";
type MilestoneSide = "left" | "right";

type Milestone = {
  period: string;
  role: string;
  company: string;
  description: string;
  tags: readonly string[];
  icon: LucideIcon;
  accent: AccentName;
  side: MilestoneSide;
};

type AccentClassSet = {
  text: string;
  bg: string;
  border: string;
  glow: string;
};

type TagProps = {
  key?: string;
  label: string;
};

const milestones: Milestone[] = [
  {
    period: "12.2020 - Present",
    role: "Senior Software Engineer",
    company: "Sofomo",
    description:
      "Leading the development of complex web applications and B2B/B2C e-commerce platforms. Driving technical standards, performing code reviews, and mentoring teams while integrating AI tools into the daily workflow.",
    tags: ["React", "Next.js", "Node.js", "AI Tools"],
    icon: Rocket,
    accent: "accent-cyan",
    side: "right",
  },
  {
    period: "06.2020 - 09.2020",
    role: "Front-End Developer",
    company: "KMB Studio",
    description:
      "Implemented pixel-perfect landing pages and web apps, integrated CMS solutions and APIs, and focused on performance optimization and SEO.",
    tags: ["React", "Gatsby", "CMS", "SEO"],
    icon: Code2,
    accent: "accent-indigo",
    side: "left",
  },
  {
    period: "07.2018 - 06.2020",
    role: "Full-Stack Developer",
    company: "Freelancer",
    description:
      "Designed and built custom web solutions from the ground up for individual clients and small businesses, handling both frontend and backend architecture.",
    tags: ["Frontend", "Backend", "API Integration"],
    icon: BriefcaseBusiness,
    accent: "accent-cyan",
    side: "right",
  },
  {
    period: "05.2017 - 08.2017",
    role: "Graphic & UI Designer",
    company: "Profit Plus",
    description:
      "Crafted high-end marketing and advertising materials, establishing a strong foundation in visual design, typography, and pixel-perfect layouts.",
    tags: ["Adobe Photoshop", "Print & Digital Design"],
    icon: Palette,
    accent: "accent-violet",
    side: "left",
  },
];

const accentClasses: Record<AccentName, AccentClassSet> = {
  "accent-cyan": {
    text: "text-accent-cyan",
    bg: "bg-accent-cyan",
    border: "border-accent-cyan/30",
    glow: "shadow-accent-cyan/30",
  },
  "accent-indigo": {
    text: "text-accent-indigo",
    bg: "bg-accent-indigo",
    border: "border-accent-indigo/30",
    glow: "shadow-accent-indigo/30",
  },
  "accent-violet": {
    text: "text-accent-violet",
    bg: "bg-accent-violet",
    border: "border-accent-violet/30",
    glow: "shadow-accent-violet/30",
  },
};

const Tag = ({ label }: TagProps) => (
  <span className="rounded-full border border-ink/10 bg-ink/5 px-3 py-1 text-xs font-bold text-ink-light">
    {label}
  </span>
);

export const Journey = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end 80%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <section className="relative overflow-hidden bg-base py-32 px-6 lg:px-12">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-indigo/20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-12 right-0 h-96 w-96 rounded-full bg-accent-cyan/10 blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.45em] text-accent-violet">
            Journey
          </p>
          <h2 className="font-display text-5xl font-bold leading-tight text-ink md:text-7xl">
            Evolution of an <span className="text-ink-light">Engineer.</span>
          </h2>
        </motion.div>

        <div ref={timelineRef} className="relative mx-auto mt-20 max-w-5xl space-y-10 lg:space-y-14">
          <div className="absolute left-5 top-8 bottom-8 w-px bg-ink/10 lg:left-1/2 lg:-translate-x-1/2" />
          <motion.div
            className="absolute left-5 top-8 bottom-8 w-px origin-top bg-gradient-to-b from-accent-cyan via-accent-indigo to-accent-violet shadow-[0_0_24px_rgba(6,182,212,0.45)] lg:left-1/2 lg:-translate-x-1/2"
            style={{ scaleY: lineScale }}
          />

          {milestones.map((item, i) => {
            const accent = accentClasses[item.accent];
            const Icon = item.icon;
            const isLeft = item.side === "left";

            return (
              <motion.div
                key={`${item.role}-${item.period}`}
                className="relative grid gap-6 pl-14 lg:grid-cols-[minmax(0,1fr)_4rem_minmax(0,1fr)] lg:items-center lg:pl-0"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
              >
                <div
                  className={`absolute left-5 top-8 z-20 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-ink/10 bg-base-alt shadow-xl ${accent.glow} lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto lg:translate-x-0`}
                >
                  <span className={`h-4 w-4 rounded-full ${accent.bg}`} />
                </div>

                <motion.article
                  whileHover={{ y: -6 }}
                  className={`group relative overflow-hidden rounded-[2rem] border ${accent.border} bg-base-alt/80 p-7 shadow-2xl backdrop-blur-sm ${isLeft ? "lg:col-start-1 lg:text-right" : "lg:col-start-3"}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-ink/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className={`mb-5 inline-flex rounded-2xl bg-ink/5 p-3 ${accent.text}`}>
                      <Icon size={24} />
                    </div>
                    <p className="mb-3 font-display text-xs font-bold uppercase tracking-[0.28em] text-ink-light">
                      {item.period}
                    </p>
                    <h3 className="font-display text-3xl font-bold leading-tight text-ink">
                      {item.role}
                    </h3>
                    <p className="mt-2 text-lg font-bold text-ink-light">{item.company}</p>
                    <p className="mt-6 text-base font-medium leading-relaxed text-ink-light/80">
                      {item.description}
                    </p>
                    <div className={`mt-6 flex flex-wrap gap-2 ${isLeft ? "lg:justify-end" : ""}`}>
                      {item.tags.map((tag) => (
                        <Tag key={tag} label={tag} />
                      ))}
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
