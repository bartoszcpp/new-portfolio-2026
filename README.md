# Bartosz Ciapala Portfolio

Personal engineering portfolio built with React, TypeScript, Vite, Tailwind CSS v4, and Motion. The site presents selected projects, engineering philosophy, career journey, and a polished animated hero experience.

The codebase is intentionally small and component-focused, with each page section isolated into its own React component and visual-heavy pieces kept under `src/components/visuals`.

## Highlights

- Animated hero section with local portrait asset and floating icon details.
- Project showcase with custom visual diagrams for e-commerce, framework, and canvas work.
- Engineering philosophy section focused on leadership, architecture, mentorship, and AI-assisted delivery.
- Scroll-linked journey timeline with responsive desktop and mobile layouts.
- Delivery Dash recruiter arcade mini-game with a canvas game engine, player setup, city normalization, local leaderboard, and statistics charts.
- Dark visual system using custom Tailwind theme tokens, rounded surfaces, glow effects, and display typography.

## Tech Stack

- React 19 for UI composition.
- TypeScript for typed components, content models, and asset imports.
- Vite 6 for local development and production builds.
- Tailwind CSS v4 with theme tokens defined in `src/index.css`.
- Motion for entrance, hover, looping, and scroll-linked animations.
- Lucide React for icons.
- npm for dependency management and scripts.

## Project Structure

```text
.
├── assets/
│   ├── bartosz-portrait.png
│   └── videri-demo.mp4
├── server/
│   └── index.ts
├── src/
│   ├── components/
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Projects.tsx
│   │   ├── Leadership.tsx
│   │   ├── Journey.tsx
│   │   ├── RecruiterGame.tsx
│   │   ├── game/
│   │   │   └── DeliveryDashCanvas.tsx
│   │   └── visuals/
│   │       ├── CanvasDiagram.tsx
│   │       ├── FrameworkDiagram.tsx
│   │       └── WorkwearImpact.tsx
│   ├── lib/
│   │   └── scoresApi.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── CODING_STANDARDS.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Getting Started

Use Node.js 22 or newer. This project uses modern Vite and TypeScript tooling, so older Node versions can fail before the app starts.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The dev server runs on port `3000` and is exposed on `0.0.0.0`.

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run TypeScript checks:

```bash
npm run lint
```

Clean generated output:

```bash
npm run clean
```

## Design System

The visual language is defined in `src/index.css` through Tailwind v4 theme tokens:

- `base` and `base-alt` for the main dark surfaces.
- `surface-dark` for deeper contrast areas such as the footer and visual containers.
- `ink` and `ink-light` for primary and secondary text.
- `accent-indigo`, `accent-cyan`, and `accent-violet` for highlights, glows, badges, and animation details.
- `font-sans` uses Inter for body text.
- `font-display` uses Space Grotesk for headings and strong labels.

Most styling lives directly in JSX through Tailwind utility classes. Components should stay mobile-first and use `md:` or `lg:` modifiers for larger layouts.

## Code Style

The repo follows the standards documented in `CODING_STANDARDS.md`. The most important rules are:

- Use arrow functions for React components.
- Prefer named exports for section and visual components.
- Do not use `any`.
- Type props, content arrays, and visual variants explicitly.
- Keep reusable visual data outside component bodies when practical.
- Import assets from components so Vite can hash them in production builds.
- Keep copy in English and aligned with the existing confident engineering tone.

## Main Sections

`Hero` introduces the portfolio with animated decorative icons, a local portrait, primary copy, and CTA buttons.

`Projects` showcases selected work through narrative case studies and custom visuals.

`Leadership` explains engineering philosophy, mentorship, standards, and AI-augmented workflows.

`Journey` renders the career timeline with animated cards and a scroll-linked vertical progress line.

`RecruiterGame` renders Delivery Dash, a standalone arcade mini-game for recruiters and HR teams. The gameplay runs on a dedicated canvas engine (`components/game/DeliveryDashCanvas.tsx`) using `requestAnimationFrame` for smooth 60fps movement: players move a glowing avatar around a neon grid, collect engineering skills, dodge bugs, grab rescue boosts that clear the swarm, and build combos across lives. Players enter their name, company, and city (normalized so `krakow`, `Kraków`, and `KRAKOW` all map to a single canonical city) before playing, and results are shown in a shared leaderboard plus city-level statistics with Recharts.

## Recruiter Game Database & API

Game scores are persisted to [Neon](https://neon.tech) (serverless PostgreSQL) through a small Express API in `server/index.ts`. The frontend talks to it via `src/lib/scoresApi.ts`, which transparently falls back to `localStorage` when the API or database is unavailable, so the game keeps working offline.

Endpoints:

- `GET /api/scores` returns the top scores.
- `POST /api/scores` stores a new run (`name`, `company`, `cityRaw`, `cityNormalized`, `avatarId`, `score`, `bestCombo`).

Setup:

1. Create a database on Neon and copy the pooled connection string.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` (and optionally `PORT`, default `3001`).
3. Run the API server alongside the Vite dev server:

```bash
npm run server
```

The Vite dev server proxies `/api` to `http://localhost:3001`, so with both `npm run dev` and `npm run server` running, scores are shared across everyone who opens the site. The `game_scores` table (including the `company` column) is created automatically on first start. For a single-process production deployment, run `npm run build` and then `npm start`, which serves the built `dist` output and the API from the same Express server.

## Assets

Local image assets live in `assets`. Import them from TypeScript files instead of hardcoding public URLs:

```tsx
import portraitImage from "../../assets/bartosz-portrait.png";
```

This keeps the build output fingerprinted and cache-friendly.

## Quality Checks

Before opening a pull request or pushing larger changes, run:

```bash
npm run lint
npm run build
```

`npm run lint` runs `tsc --noEmit`, so it verifies TypeScript correctness without generating files.
