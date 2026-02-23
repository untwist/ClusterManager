# Development Guide

Guide for running Pecu.ai Cluster Manager locally and iterating on the UI and data.

---

## Local workflow

1. From the project root: `npm install` then `npm run dev`.
2. Open **http://localhost:3000** in your browser.
3. Edit files under `src/`; Vite will hot-reload the app.
4. No `.env.local` or API keys are required for UI-only changes; the dashboard uses mock data.

---

## Where to change things

### UI and layout

- **`src/App.tsx`** — Main UI:
  - Sidebar: logo, department nav, user block.
  - Header: breadcrumb, title, status badge, “Export Report” / “New Agent”.
  - KPI cards: Total Agents, Tokens, Avg Workload, Cluster Status.
  - Process list (per department) and task flow (per process).
  - Right column: Cluster Distribution (Recharts pie), Top Token Consumers, Node Topology.

Edit JSX and Tailwind classes here to change layout, copy, or behavior. Reusable pieces (e.g. `StatusBadge`, `NodeTopology`) are defined in the same file; you can split them into `src/components/` when useful.

### Data and content

- **`src/constants.ts`** — All mock data:
  - **`DEPARTMENTS`** — Departments with `id`, `name`, `icon` (Lucide component), `status`, and `processes`.
  - **`Process`** — `id`, `name`, `status`, `workload`, `tokens`, `description`, `tasks`.
  - **`Task`** — `id`, `name`, `status`, `description`, optional `progress`, `timestamp`.
  - **`AGENT_DISTRIBUTION`** — Pie chart: `name`, `value`, `color`.
  - **`TOP_CONSUMERS`** — Name, role, tokens.

Add or edit entries here to change departments, processes, tasks, and chart/consumer data. Types are exported for use in `App.tsx`.

### Styling and theme

- **`src/index.css`** — Tailwind entry and theme:
  - `@theme` defines: `--font-sans`, `--font-mono`, `--font-raleway`, `--color-primary`, `--color-background-dark`, `--color-card-dark`, `--color-border-dark`.
  - `.no-scrollbar` and `.animate-pulse-soft` utilities.
  - Google Fonts: Inter, JetBrains Mono, Raleway.

Change primary color, dark palette, or fonts here; use Tailwind classes (e.g. `bg-primary`, `text-primary`, `border-border-dark`) in `App.tsx` to stay consistent.

---

## Key files reference

| File | Purpose |
|------|--------|
| `src/main.tsx` | React mount and `index.css` import; rarely edited. |
| `src/App.tsx` | Main dashboard UI and inline components. |
| `src/constants.ts` | Types and mock data for departments, processes, tasks, charts. |
| `src/index.css` | Tailwind config, theme variables, global/utility styles. |
| `index.html` | Root HTML and script tag; title set to “Pecu.ai Cluster Manager”. |
| `vite.config.ts` | Vite + React + Tailwind; loads env (e.g. `GEMINI_API_KEY`). |
| `.env.example` | Template for `GEMINI_API_KEY` and `APP_URL`; copy to `.env.local` if adding API/backend. |

---

## Scripts

- **`npm run dev`** — Dev server with HMR (port 3000).
- **`npm run build`** — Production build to `dist/`.
- **`npm run preview`** — Serve `dist/` locally.
- **`npm run lint`** — TypeScript check (`tsc --noEmit`).
- **`npm run clean`** — Remove `dist/`.

---

## Optional: environment and API

The current UI does not call any backend or Gemini API. If you add API features:

1. Copy `.env.example` to `.env.local`.
2. Set `GEMINI_API_KEY` to your [Gemini API key](https://ai.google.dev/gemini-api/docs/api-key).
3. Use `process.env.GEMINI_API_KEY` in code; Vite exposes it via `define` in `vite.config.ts`.

`APP_URL` in `.env.example` is for scenarios (e.g. OAuth, Cloud Run) where the app needs its own URL; leave it unset for local UI work.
