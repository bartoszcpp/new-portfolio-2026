import { motion } from "motion/react";
import { Gamepad2, Home } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactElement } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import type { Language } from "../i18n/translations";

export type AppRoute = "/" | "/recruiter-game";

type NavigationProps = {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
};

const FlagPL = () => (
  <svg
    viewBox="0 0 30 20"
    className="h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <rect width="30" height="10" fill="#ffffff" />
    <rect y="10" width="30" height="10" fill="#DC143C" />
  </svg>
);

const FlagGB = () => (
  <svg
    viewBox="0 0 60 30"
    className="h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <clipPath id="nav-gb-frame">
      <rect width="60" height="30" />
    </clipPath>
    <clipPath id="nav-gb-diagonal">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
    </clipPath>
    <g clipPath="url(#nav-gb-frame)">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
      <path
        d="M0,0 L60,30 M60,0 L0,30"
        clipPath="url(#nav-gb-diagonal)"
        stroke="#C8102E"
        strokeWidth="4"
      />
      <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const languageOptions: { code: Language; label: string; Flag: () => ReactElement }[] = [
  { code: "pl", label: "Polski", Flag: FlagPL },
  { code: "en", label: "English", Flag: FlagGB },
];

export const Navigation = ({ currentRoute, onNavigate }: NavigationProps) => {
  const { language, setLanguage, t } = useLanguage();

  const navItems: { label: string; shortLabel: string; route: AppRoute; icon: LucideIcon }[] = [
    { label: t.nav.portfolio, shortLabel: t.nav.portfolio, route: "/", icon: Home },
    { label: t.nav.game, shortLabel: t.nav.gameShort, route: "/recruiter-game", icon: Gamepad2 },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-40 px-3 py-3 sm:px-6 sm:py-4 lg:px-12">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-ink/10 bg-surface-dark/70 px-3 py-2 shadow-2xl backdrop-blur-md sm:px-6 sm:py-3">
        <button
          type="button"
          onClick={() => onNavigate("/")}
          className="whitespace-nowrap font-display text-base font-bold text-ink transition-colors hover:text-accent-cyan sm:text-lg"
        >
          Bartosz Ciąpała
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="flex items-center gap-1.5 rounded-full border border-ink/10 bg-ink/5 p-1"
            role="group"
            aria-label={t.nav.language}
          >
            {languageOptions.map(({ code, label, Flag }) => {
              const isActive = language === code;

              return (
                <motion.button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  aria-label={label}
                  aria-pressed={isActive}
                  className={`h-5 w-[30px] overflow-hidden rounded-[5px] ring-1 ring-inset ring-black/10 transition-all ${
                    isActive
                      ? "opacity-100"
                      : "opacity-40 grayscale hover:opacity-100 hover:grayscale-0"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <Flag />
                </motion.button>
              );
            })}
          </div>

          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            const Icon = item.icon;

            return (
              <motion.button
                key={item.route}
                type="button"
                onClick={() => onNavigate(item.route)}
                aria-label={item.label}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-bold transition-colors sm:px-4 ${
                  isActive
                    ? "bg-accent-indigo text-white"
                    : "text-ink-light hover:bg-ink/10 hover:text-ink"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{item.label}</span>
                {item.route === "/recruiter-game" && (
                  <span className="sm:hidden">{item.shortLabel}</span>
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
