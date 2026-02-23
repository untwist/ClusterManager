# Pecu.ai Cluster Manager

<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

Enterprise command center for tracking AI agent clusters across departments, processes, and tasks. This app was created with [Google Stitch](https://stitch.google/) (UI) and [Google AI Studio](https://ai.google.dev/studio) (run/deploy).

**View in AI Studio:** [Pecu.ai Cluster Manager](https://ai.studio/apps/83e3057e-2627-4360-8318-908272d64c46)

---

## Prerequisites

- **Node.js** (v18+ recommended)

---

## Run locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment (optional for UI-only)**
   - For **UI iteration only**, no env file is required; the dashboard uses mock data.
   - To use Gemini API features later: copy [.env.example](.env.example) to `.env.local` and set `GEMINI_API_KEY` to your [Gemini API key](https://ai.google.dev/gemini-api/docs/api-key).

3. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open **http://localhost:3000** in your browser.

---

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `npm run dev`  | Start Vite dev server (port 3000, HMR) |
| `npm run build`| Production build to `dist/`    |
| `npm run preview` | Preview production build   |
| `npm run clean`| Remove `dist/`                |
| `npm run lint` | Type-check with `tsc --noEmit` |

---

## Project structure

```
pecu.ai-cluster-manager/
├── index.html           # Entry HTML; root div and script
├── src/
│   ├── main.tsx         # React mount and global CSS import
│   ├── App.tsx          # Main UI: sidebar, KPIs, process list, task flow, charts
│   ├── constants.ts     # Mock data: departments, processes, tasks, agent distribution
│   └── index.css        # Tailwind + theme (primary, dark palette), utilities
├── vite.config.ts      # Vite + React + Tailwind; env loading
├── tsconfig.json        # TypeScript config
├── package.json         # Dependencies and scripts
├── .env.example         # Env template (GEMINI_API_KEY, APP_URL)
└── metadata.json        # App name/description (AI Studio)
```

See [DEVELOPMENT.md](docs/DEVELOPMENT.md) for a guide to iterating on the UI and changing data.

---

## Tech stack

- **Build:** Vite 6, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **UI:** Lucide icons, Motion (animations), Recharts (charts)
- **Data:** Static mock data in `src/constants.ts` (no backend required for current UI)

---

## License

SPDX-License-Identifier: Apache-2.0 (see source headers)
