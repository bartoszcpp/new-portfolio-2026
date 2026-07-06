import { lazy, Suspense, useEffect, useState } from 'react';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { PrivateProjects } from './components/PrivateProjects';
import { Leadership } from './components/Leadership';
import { Journey } from './components/Journey';
import { Navigation } from './components/Navigation';
import type { AppRoute } from './components/Navigation';
import { useTranslation } from './i18n/LanguageContext';

const RecruiterGame = lazy(() =>
  import('./components/RecruiterGame').then((module) => ({ default: module.RecruiterGame })),
);

const getCurrentRoute = (): AppRoute =>
  window.location.pathname === '/recruiter-game' ? '/recruiter-game' : '/';

const PortfolioPage = () => (
  <>
    <Hero />
    <Projects />
    <PrivateProjects />
    <Leadership />
    <Journey />
  </>
);

const App = () => {
  const t = useTranslation();
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => getCurrentRoute());

  useEffect(() => {
    const handlePopState = () => setCurrentRoute(getCurrentRoute());

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: AppRoute) => {
    window.history.pushState(null, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-base selection:bg-accent-indigo selection:text-white">
      <Navigation currentRoute={currentRoute} onNavigate={handleNavigate} />
      {currentRoute === '/recruiter-game' ? (
        <Suspense
          fallback={
            <main className="flex min-h-screen items-center justify-center px-6 pt-32">
              <p className="font-display text-2xl font-bold text-ink">{t.game.loading}</p>
            </main>
          }
        >
          <RecruiterGame />
        </Suspense>
      ) : (
        <PortfolioPage />
      )}

      {/* Footer */}
    <footer className="bg-surface-dark py-12 text-center">
      <p className="text-ink-light/60 font-medium">
        © {new Date().getFullYear()} Bartosz Ciąpała. {t.footer.rights}
      </p>
    </footer>
    </div>
  );
};

export default App;
