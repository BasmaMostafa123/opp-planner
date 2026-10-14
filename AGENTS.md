# Opportunity Manager: project rules

Personal, single-user PWA to track opportunities (scholarships, jobs, internships, programs).
Mobile-first, installable on Android. Owner: Basma.

## Stack
- Vite + React + Tailwind CSS
- vite-plugin-pwa (manifest + service worker)
- Supabase: Postgres, Auth (email, single user), Storage, Edge Functions
- Deploy: GitHub Pages via GitHub Actions
  - Vite `base` = "/<repo-name>/"
  - Use HashRouter so routing works on GitHub Pages

## Hard rules
1. Never commit secrets. Keys live in `.env.local` (git-ignored) and in GitHub / Supabase secrets.
   Commit only `.env.example` with empty placeholder values.
2. The Supabase anon key may be in the frontend bundle. The service-role key, VAPID private key and webhook secret must NEVER be.
3. Every table has Row Level Security: a row is visible and writable only by its owner (`user_id = auth.uid()`).
   Exception: the `ingest` Edge Function writes `raw_messages` with the service role, after verifying the secret.
4. Disable public sign-ups in Supabase once the owner account exists.
5. CV files go in a PRIVATE storage bucket, readable only by the owner.
6. Sources are plugins. Each source (manual, WhatsApp, future ones) implements the same interface,
   e.g. `{ id, name, ingest(): RawOpportunity[] }`. Never hard-code source logic inside screens.
7. Keep code modular: `src/screens`, `src/components`, `src/lib` (supabase client, helpers),
   `src/sources`, `supabase/migrations`, `supabase/functions`.
8. Small, reviewable commits. One task = one branch or one clear group of commits.
9. Mobile-first: design for ~390px width first, touch targets at least 44px.

## Statuses
New, Interested, Preparing, Applied, Accepted, Rejected, On hold, Skipped, Expired.
Expired is set automatically when the deadline has passed (and status is not Applied, Accepted or Rejected).

## Out of scope for Phase 1
AI processing of messages, auto-apply, emailed copies of applications, MacroDroid setup,
scheduled reminders. Do not build these yet; leave clean extension points.

## Definition of done (every task)
- App builds with no errors and no lint errors
- Works at mobile width in the browser
- No secrets in the diff
- Short note of what changed and how to test it
