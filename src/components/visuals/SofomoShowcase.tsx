import { motion } from "motion/react";
import { Globe } from "lucide-react";

const disciplines = ["Backend", "Frontend", "Mobile", "DevOps"];

export const SofomoShowcase = () => (
  <div className="relative w-full overflow-hidden rounded-[2rem] bg-surface-dark p-4 py-8 sm:rounded-[3rem] sm:p-6 sm:py-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.2),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.18),transparent_38%)]" />

    <motion.div
      className="relative z-10 mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] border border-ink/10 bg-base-alt shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3 border-b border-ink/10 bg-surface-dark/60 px-5 py-3">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-accent-violet/70" />
          <span className="h-3 w-3 rounded-full bg-accent-cyan/70" />
          <span className="h-3 w-3 rounded-full bg-accent-indigo/70" />
        </span>
        <span className="flex flex-1 items-center gap-2 rounded-full bg-ink/5 px-4 py-1.5 text-sm font-bold text-ink-light">
          <Globe size={14} className="text-accent-cyan" />
          sofomo.com
        </span>
      </div>

      <div className="space-y-6 p-7">
        <p className="font-display text-3xl font-bold lowercase tracking-tight text-ink">sofomo</p>
        <p className="font-display text-2xl font-bold leading-tight text-ink">
          The devs you need.
          <br />
          <span className="text-accent-cyan">The partners you want.</span>
        </p>

        <div className="flex flex-wrap gap-2">
          {disciplines.map((discipline, i) => (
            <motion.span
              key={discipline}
              className="rounded-full border border-ink/10 bg-surface-dark/70 px-4 py-1.5 text-sm font-bold text-ink-light"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
            >
              {discipline}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);
