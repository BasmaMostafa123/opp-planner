# OppPlanner

A personal PWA to track and plan opportunities — scholarships, jobs, internships, and programs.

## Stack

- **Frontend**: Vite + React + Tailwind CSS
- **PWA**: vite-plugin-pwa (Workbox service worker, installable on Android)
- **Backend**: Supabase (Postgres, Auth, Storage, Edge Functions) — added in Phase 1 Task 2
- **Deploy**: GitHub Pages via GitHub Actions

## Local development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values (never commit `.env.local`):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Deploy

Push to `main` — the GitHub Actions workflow builds the app and deploys it to the `gh-pages` branch.

Live URL: `https://BasmaMostafa123.github.io/opp-planner/`

## Project structure

```
src/
  components/   # Shared UI components
  screens/      # One file per route/screen
  lib/          # Supabase client, helpers (Task 2+)
  sources/      # Opportunity source plugins (Task 4+)
supabase/
  migrations/   # SQL migrations (Task 2+)
  functions/    # Edge Functions (Task 8+)
```
