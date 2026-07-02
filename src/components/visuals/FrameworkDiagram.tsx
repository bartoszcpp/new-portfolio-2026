import { motion } from "motion/react";
import { Building2, Globe2, Server, Store } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "../../i18n/LanguageContext";

type Brand = {
  name: string;
  color: string;
};

type WorkstreamStyle = {
  icon: LucideIcon;
  accent: string;
};

const brands: Brand[] = [
  { name: "Greyson Clothiers", color: "bg-surface-dark" },
  { name: "UTZ Snacks", color: "bg-accent-indigo" },
  { name: "Great Garden", color: "bg-ink-light" }
];

const workstreamStyles: WorkstreamStyle[] = [
  { icon: Globe2, accent: "text-accent-cyan" },
  { icon: Server, accent: "text-accent-indigo" },
];

export const FrameworkDiagram = () => {
  const t = useTranslation();

  return (
    <div className="relative w-full overflow-hidden rounded-[3rem] bg-surface-dark p-6 py-12">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.18),transparent_36%)]" />

    <div className="relative z-10 flex flex-col items-center">
      <motion.div
        className="flex w-full max-w-md flex-col items-center rounded-[2rem] border border-accent-cyan/30 bg-base-alt p-6 text-center shadow-[0_0_36px_rgba(6,182,212,0.14)]"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Building2 size={42} className="text-accent-cyan" />
        <p className="mt-4 font-display text-sm font-bold uppercase tracking-[0.28em] text-accent-cyan">
          {t.framework.eyebrow}
        </p>
        <h3 className="mt-2 font-display text-3xl font-bold text-ink">VaynerMedia</h3>
        <p className="mt-3 text-sm font-medium leading-relaxed text-ink-light/80">
          {t.framework.subtitle}
        </p>
      </motion.div>

      <div className="relative my-8 grid w-full gap-4 md:grid-cols-2">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-accent-cyan to-accent-indigo md:block" />
        {workstreamStyles.map((style, i) => {
          const item = t.framework.workstreams[i];
          const Icon = style.icon;

          return (
            <motion.div
              key={item.title}
              className="relative rounded-[1.75rem] border border-ink/10 bg-base-alt/80 p-5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -5 }}
            >
              <div className={`mb-4 inline-flex rounded-2xl bg-ink/5 p-3 ${style.accent}`}>
                <Icon size={24} />
              </div>
              <h4 className="font-display text-xl font-bold text-ink">{item.title}</h4>
              <p className="mt-2 text-sm font-medium leading-relaxed text-ink-light/80">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="w-full">
        <p className="mb-4 text-center font-display text-xs font-bold uppercase tracking-[0.28em] text-ink-light">
          {t.framework.generatedLabel}
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              className={`${brand.color} flex min-h-28 flex-col items-center justify-center gap-3 rounded-[2rem] border-4 border-base p-5 text-center text-white shadow-lg`}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.15 }}
              whileHover={{ y: -8 }}
            >
              <Store size={30} />
              <h4 className="font-bold leading-tight">{brand.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};
