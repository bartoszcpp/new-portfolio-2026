import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { WorkwearImpact } from "./visuals/WorkwearImpact";
import { FrameworkDiagram } from "./visuals/FrameworkDiagram";
import { CanvasDiagram } from "./visuals/CanvasDiagram";
import { SofomoShowcase } from "./visuals/SofomoShowcase";
import { useTranslation } from "../i18n/LanguageContext";

const Badge = ({ children }: { children: ReactNode }) => (
  <span className="px-4 py-2 bg-surface-dark rounded-full text-ink font-bold text-sm shadow-sm border-2 border-ink/10">
    {children}
  </span>
);

const ProjectLink = ({ href, label, className }: { href: string; label: string; className: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className={`group inline-flex items-center gap-2 rounded-full border-2 px-6 py-3 font-bold transition-colors ${className}`}
  >
    {label}
    <ExternalLink size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </a>
);

export const Projects = () => {
  const t = useTranslation();

  return (
    <section id="projects" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto space-y-48 scroll-mt-12">
      <motion.div
        className="flex flex-col lg:flex-row gap-16 items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
              {t.projects.workwear.title} <br />
              <span className="text-accent-indigo">{t.projects.workwear.subtitle}</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge>React</Badge>
              <Badge>RxJS</Badge>
              <Badge>Magento</Badge>
              <Badge>B2B Portal</Badge>
              <Badge>AI Agents</Badge>
            </div>
          </div>

          <div className="space-y-6 text-lg text-ink-light font-medium leading-relaxed">
            {t.projects.workwear.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <ProjectLink
            href="https://www.workwearexpress.com/"
            label={t.projects.visit}
            className="border-accent-indigo text-accent-indigo hover:bg-accent-indigo hover:text-white"
          />
        </div>
        <div className="flex-1 w-full bg-base-alt p-8 rounded-[3rem] shadow-xl border-4 border-base relative overflow-hidden">
          <h3 className="font-display font-bold text-ink text-2xl mb-2">
            {t.projects.workwear.panelTitle}
          </h3>
          <p className="text-ink-light/70 font-medium">{t.projects.workwear.panelSubtitle}</p>
          <WorkwearImpact />
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col lg:flex-row-reverse gap-16 items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
              {t.projects.vayner.title} <br />
              <span className="text-accent-cyan">{t.projects.vayner.subtitle}</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge>Vue.js</Badge>
              <Badge>Shopify</Badge>
              <Badge>Agency Platform</Badge>
              <Badge>VaynerX</Badge>
            </div>
          </div>

          <div className="space-y-6 text-lg text-ink-light font-medium leading-relaxed">
            {t.projects.vayner.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <ProjectLink
            href="https://vaynermedia.com/"
            label={t.projects.visit}
            className="border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-white"
          />
        </div>
        <div className="flex-1 w-full bg-base-alt rounded-[3rem] shadow-xl border-4 border-base overflow-hidden">
          <FrameworkDiagram />
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col lg:flex-row gap-16 items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
              {t.projects.videri.title} <br />
              <span className="text-accent-violet">{t.projects.videri.subtitle}</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge>React</Badge>
              <Badge>Canvas API</Badge>
              <Badge>Node.js</Badge>
              <Badge>WebSockets</Badge>
            </div>
          </div>

          <div className="space-y-6 text-lg text-ink-light font-medium leading-relaxed">
            {t.projects.videri.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <ProjectLink
            href="https://wallbuilder.videri.com/"
            label={t.projects.visit}
            className="border-accent-violet text-accent-violet hover:bg-accent-violet hover:text-white"
          />
        </div>
        <div className="flex-1 w-full bg-base-alt p-4 rounded-[3rem] shadow-xl border-4 border-base">
          <CanvasDiagram />
        </div>
      </motion.div>
      
      <motion.div
        className="flex flex-col lg:flex-row-reverse gap-16 items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">
              {t.projects.sofomo.title} <br />
              <span className="text-accent-cyan">{t.projects.sofomo.subtitle}</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge>React</Badge>
              <Badge>Next.js</Badge>
              <Badge>Tailwind CSS</Badge>
              <Badge>Motion</Badge>
            </div>
          </div>

          <div className="space-y-6 text-lg text-ink-light font-medium leading-relaxed">
            {t.projects.sofomo.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <ProjectLink
            href="https://www.sofomo.com/"
            label={t.projects.visit}
            className="border-accent-cyan text-accent-cyan hover:bg-accent-cyan hover:text-white"
          />
        </div>
        <div className="flex-1 w-full bg-base-alt rounded-[3rem] shadow-xl border-4 border-base overflow-hidden">
          <SofomoShowcase />
        </div>
      </motion.div>
    </section>
  );
};
