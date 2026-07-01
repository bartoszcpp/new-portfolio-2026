import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Leadership } from './components/Leadership';
import { Journey } from './components/Journey';

export default function App() {
  return (
    <div className="min-h-screen bg-base selection:bg-accent-indigo selection:text-white">
      <Hero />
      <Projects />
      <Leadership />
      <Journey />
      
      {/* Footer */}
      <footer className="bg-surface-dark py-12 text-center">
        <p className="text-ink-light/60 font-medium">
          © {new Date().getFullYear()} Bartosz Ciąpała. Engineered with intention.
        </p>
      </footer>
    </div>
  );
}
