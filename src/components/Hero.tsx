import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Code2, Database, Layout, Linkedin, Mail, Phone, Sparkles, Terminal, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import portraitImage from "../../assets/bartosz-portrait.png";
import { useTranslation } from "../i18n/LanguageContext";

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

export const Hero = () => {
  const t = useTranslation();
  const [isContactOpen, setIsContactOpen] = useState(false);

  const contactLinks: ContactLink[] = [
    {
      label: t.hero.contact.phone,
      value: "502 116 119",
      href: "tel:+48502116119",
      icon: Phone,
    },
    {
      label: t.hero.contact.email,
      value: "bartosz.cp@gmail.com",
      href: "mailto:bartosz.cp@gmail.com",
      icon: Mail,
    },
    {
      label: t.hero.contact.linkedin,
      value: "Bartosz Ciąpała",
      href: "https://www.linkedin.com/in/bartosz-cpp/",
      icon: Linkedin,
      external: true,
    },
  ];

  const icons = [
    { Icon: Layout, color: "text-accent-indigo", top: "10%", left: "10%", delay: 0 },
    { Icon: Database, color: "text-accent-cyan", top: "20%", left: "80%", delay: 0.2 },
    { Icon: Terminal, color: "text-ink-light", top: "70%", left: "15%", delay: 0.4 },
    { Icon: Code2, color: "text-accent-violet", top: "80%", left: "85%", delay: 0.6 },
    { Icon: Sparkles, color: "text-accent-cyan", top: "40%", left: "90%", delay: 0.8 },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.color} opacity-80`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          <item.Icon size={48} />
        </motion.div>
      ))}

      <div className="max-w-6xl w-full mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-16 relative z-10">
        <motion.div 
          className="flex-1 space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl font-display font-bold text-ink leading-[1.1] tracking-tight">
            {t.hero.titleLine1}
            <br />
            <span className="text-accent-indigo italic">{t.hero.titleEmphasis}</span>
            <br />
            {t.hero.titleLine3}
          </h1>
          <p className="text-xl md:text-2xl text-ink-light max-w-xl font-medium leading-relaxed">
            {t.hero.intro}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.a 
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent-indigo text-base rounded-full font-bold text-lg shadow-lg hover:bg-accent-violet transition-colors"
            >
              {t.hero.exploreCta}
            </motion.a>
            <motion.button 
              type="button"
              onClick={() => setIsContactOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-base-alt text-ink rounded-full font-bold text-lg border-2 border-ink-light hover:bg-base transition-colors"
            >
              {t.hero.contactCta}
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="flex-1 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="w-full aspect-[4/5] relative rounded-t-[12rem] rounded-b-[4rem] overflow-hidden border-8 border-base-alt shadow-2xl">
            <div className="absolute inset-0 bg-ink opacity-10 mix-blend-multiply"></div>
            <img 
              src={portraitImage} 
              alt="Bartosz Ciąpała" 
              className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
            />
          </div>
          
          <motion.div 
            className="absolute -bottom-8 -left-8 bg-surface-dark border border-ink/10 text-ink p-6 rounded-[2rem] shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="font-display font-bold text-2xl">{t.hero.badgeRole}</p>
            <p className="text-accent-cyan font-medium">{t.hero.badgeStack}</p>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isContactOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-surface-dark/80 px-4 py-6 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsContactOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-modal-title"
              className="relative max-h-full w-full max-w-lg overflow-y-auto overflow-x-hidden rounded-[2rem] border border-ink/10 bg-base-alt p-6 shadow-2xl sm:rounded-[2.5rem] sm:p-8"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.16),transparent_36%)]" />
              <div className="relative z-10">
                <button
                  type="button"
                  onClick={() => setIsContactOpen(false)}
                  className="absolute right-0 top-0 rounded-full border border-ink/10 bg-ink/5 p-2.5 text-ink-light transition-colors hover:bg-ink/10 hover:text-ink sm:p-3"
                  aria-label={t.hero.contact.close}
                >
                  <X size={20} />
                </button>

                <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-accent-cyan sm:text-sm">
                  {t.hero.contact.eyebrow}
                </p>
                <h2 id="contact-modal-title" className="pr-12 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
                  {t.hero.contact.title}
                </h2>
                <p
                  className="mt-4 max-w-sm text-sm font-medium leading-relaxed sm:text-base"
                  style={{ color: "#E2E8F0" }}
                >
                  {t.hero.contact.subtitle}
                </p>

                <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                  {contactLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        className="group flex min-w-0 items-center gap-3 rounded-[1.25rem] border border-ink/10 bg-surface-dark/70 p-3 transition-colors hover:border-accent-cyan/40 hover:bg-surface-dark sm:gap-4 sm:rounded-[1.5rem] sm:p-4"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-cyan/10 text-accent-cyan sm:h-12 sm:w-12">
                          <Icon size={20} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs font-bold uppercase tracking-[0.18em] text-ink-light sm:text-sm">
                            {item.label}
                          </span>
                          <span className="block break-words font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-accent-cyan sm:text-lg">
                            {item.value}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
