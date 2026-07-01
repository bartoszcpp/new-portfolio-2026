# Coding Standards

This repo is a Vite + React + TypeScript portfolio with Tailwind CSS v4, Motion, and Lucide icons. Keep changes small, visual, and consistent with the existing component style.

## Components

- Write React components as arrow functions.
- Prefer named exports for reusable sections and visual components.
- Use a local `const App = () => (...)` plus `export default App` for the root app.
- Keep page sections in `src/components`.
- Keep decorative or project-specific visuals in `src/components/visuals`.
- Extract small local presentational helpers when they remove repetition, for example badges or tags.

```tsx
export const Hero = () => (
  <section>
    {/* content */}
  </section>
);
```

## TypeScript

- Do not use `any`.
- Add explicit types for props, data arrays, and records that drive JSX.
- Use `type` aliases for component props and content models.
- Import types with `import type`.
- Prefer concrete unions for known visual variants such as accents, sides, and statuses.
- Do not add defensive fallbacks for content that is fully controlled in the repo.

## Styling

- Use Tailwind utility classes directly in JSX.
- Reuse theme tokens from `src/index.css`: `base`, `base-alt`, `surface-dark`, `ink`, `ink-light`, `accent-indigo`, `accent-cyan`, and `accent-violet`.
- Keep the visual language dark, rounded, high-contrast, and softly glowing.
- Use `font-display` for headings and important labels.
- Use `font-medium` or `font-bold` consistently for body copy and badges.
- Keep responsive behavior mobile-first, then add `md:` and `lg:` variants.

## Motion

- Use `motion/react` for animations.
- Prefer subtle `whileInView`, `whileHover`, and scroll-linked animations that support the section's story.
- Use `viewport={{ once: true }}` for entrance animations unless the interaction should respond continuously to scroll.
- Keep animation durations and delays readable and restrained.

## Content

- Portfolio copy is written in English.
- Keep copy confident, concise, and engineering-focused.
- Section headings should be short, high-impact, and aligned with the existing tone.

## Assets

- Store local static assets in `assets`.
- Import images from components so Vite can hash and optimize them in the build.
- Keep accessible `alt` text on images.

## Verification

- Run `npm run lint` after TypeScript or JSX changes.
- Run `npm run build` after visual, asset, or Vite-related changes.
