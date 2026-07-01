import { motion } from "motion/react";
import { Code2, GitMerge, Sparkles, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ImpactArea = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
};

const impactAreas: ImpactArea[] = [
  {
    title: "Main Platform",
    description: "Ongoing React, RxJS and Magento development for the core sales system.",
    icon: Store,
    accent: "text-accent-indigo",
  },
  {
    title: "B2B Portal",
    description: "A dedicated business portal delivered from scratch for a new client need.",
    icon: Code2,
    accent: "text-accent-cyan",
  },
  {
    title: "Review Ownership",
    description: "Progressed from receiving reviews to reviewing teammates' work and raising standards.",
    icon: GitMerge,
    accent: "text-accent-violet",
  },
  {
    title: "AI Workflow",
    description: "Integrated AI assistants into delivery to move faster without lowering code quality.",
    icon: Sparkles,
    accent: "text-accent-cyan",
  },
];

export const WorkwearImpact = () => (
  <div className="relative mt-8 overflow-hidden rounded-[2.5rem] bg-surface-dark p-6">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.22),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.16),transparent_35%)]" />
    <div className="relative z-10">
      <motion.div
        className="mx-auto mb-6 flex h-32 w-32 flex-col items-center justify-center rounded-full border border-accent-cyan/30 bg-base-alt text-center shadow-[0_0_40px_rgba(6,182,212,0.18)]"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-accent-cyan">
          UK
        </span>
        <span className="mt-2 font-display text-xl font-bold leading-tight text-ink">
          Workwear Express
        </span>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {impactAreas.map((area, i) => {
          const Icon = area.icon;

          return (
            <motion.div
              key={area.title}
              className="rounded-[1.5rem] border border-ink/10 bg-base-alt/80 p-5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
            >
              <div className={`mb-4 inline-flex rounded-2xl bg-ink/5 p-3 ${area.accent}`}>
                <Icon size={22} />
              </div>
              <h4 className="font-display text-lg font-bold text-ink">{area.title}</h4>
              <p className="mt-2 text-sm font-medium leading-relaxed text-ink-light/80">
                {area.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
);
