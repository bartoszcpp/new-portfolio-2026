import { motion } from "motion/react";
import { Gamepad2, Home } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppRoute = "/" | "/recruiter-game";

type NavigationProps = {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
};

type NavItem = {
  label: string;
  shortLabel: string;
  route: AppRoute;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Portfolio", shortLabel: "Portfolio", route: "/", icon: Home },
  { label: "Hiring? Play the game", shortLabel: "Play", route: "/recruiter-game", icon: Gamepad2 },
];

export const Navigation = ({ currentRoute, onNavigate }: NavigationProps) => (
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
              {item.route === "/recruiter-game" && <span className="sm:hidden">{item.shortLabel}</span>}
            </motion.button>
          );
        })}
      </div>
    </nav>
  </header>
);
