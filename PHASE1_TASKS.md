# Phase 1 tasks for Antigravity

Paste one task at a time into Antigravity's agent manager. Tell it to read AGENTS.md first.
Finish and test each task before starting the next.

## Task 1: Repo, PWA shell, GitHub Pages deploy
```
Read AGENTS.md. Create a Vite + React + Tailwind project called "Opportunity Manager".
- Add vite-plugin-pwa with a manifest (name, short_name, theme color, 192/512 icons, display: standalone) and a service worker.
- Use HashRouter with placeholder routes: /, /opportunity/:id, /add, /tracker, /settings, /login.
- Set Vite `base` to "/<repo-name>/" (ask me for the repo name).
- Add a GitHub Actions workflow that builds and deploys to GitHub Pages on push to main.
- Add .gitignore, .env.example (empty placeholders), and a short README.
Do not add Supabase yet. Show me how to verify the deploy and that the app is installable on Android.
```

## Task 2: Supabase schema, RLS and auth
```
Read AGENTS.md. Create supabase/migrations with these tables, each with user_id (default auth.uid()) and RLS so only the owner can read and write:
- profile: interests text[], skills text[], links jsonb, cv_path text, email text
- opportunities: title, organization, deadline, requirements, link, how_to_apply, source, score, raw_text, created_at
- applications: opportunity_id, status, notes, submitted_payload jsonb
- events: opportunity_id, type, created_at
- raw_messages: source, group_name, text, received_at, processed boolean default false
- push_subscriptions: endpoint, keys jsonb
- notification_settings: match_threshold default 75, reminder_days int[] default {7,3,1}, quiet_hours jsonb, new_match_enabled, reminder_enabled
Statuses: New, Interested, Preparing, Applied, Accepted, Rejected, On hold, Skipped, Expired.
Also create a private "cv" storage bucket with owner-only policies.
Add src/lib/supabase.js reading VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. Build the Login screen (email auth, single user) and protect all other routes.
Tell me the manual steps I must do in the Supabase dashboard (create project, run migrations, create my user, disable sign-ups).
```

## Task 3: Feed and Details screens
```
Read AGENTS.md. Build the Feed: opportunity cards sorted by nearest deadline, each with a countdown ("5 days left", "Today", "Expired").
Build Details: title, organization, requirements, how to apply, link, and buttons Interested / On hold / Skip.
Each button updates the application status and writes a row in events.
Add a small status-update helper that auto-sets Expired when the deadline has passed.
Mobile-first, with loading and empty states.
```

## Task 4: Add opportunity manually
```
Read AGENTS.md. Build the /add form (title, organization, deadline, requirements, link, how to apply, source = "manual").
Implement it through the source-plugin interface in src/sources (a "manual" source), not directly in the screen.
Validate required fields and send me back to the Feed after saving.
```

## Task 5: Tracker
```
Read AGENTS.md. Build the Tracker screen with tabs: Interested, Preparing, Applied, On hold, Rejected, Expired.
Each tab lists its opportunities; tapping one opens Details. Allow changing status from Details (including Preparing, Applied, Accepted, Rejected).
Show a simple history (events) list on Details.
```

## Task 6: Profile and settings
```
Read AGENTS.md. Build the Profile and Settings screen: interests and skills (tag inputs), links, email, CV upload to the private "cv" bucket,
and notification settings (match threshold, reminder days, quiet hours, toggles). Save everything to Supabase.
```

## Task 7: Web Push notifications
```
Read AGENTS.md. Add Web Push with VAPID.
- Register the service worker and subscribe; store the subscription in push_subscriptions.
- Add a "Send test notification" button in Settings, backed by a Supabase Edge Function that sends the push (VAPID private key stored as a Supabase secret).
- Tapping a notification opens that opportunity's Details screen (deep link via HashRouter).
Explain how to generate VAPID keys and where to put each key. Note any Android limitations I should test.
```

## Task 8: Webhook ingest
```
Read AGENTS.md. Create the Supabase Edge Function `ingest`:
- Accepts POST {group, text, secret}.
- Verifies `secret` against an INGEST_SECRET Supabase secret (constant-time compare); return 401 if wrong.
- Inserts into raw_messages (source = "whatsapp", group_name = group, text) using the service role, then returns 200 quickly.
- No AI processing yet.
Give me a curl example to test it and explain how MacroDroid will call it later.
```

## Check before moving to Phase 2
- Installs on Android and opens offline
- Login works, sign-ups are disabled
- Add, Feed, Details, Tracker all work with real data
- Test notification arrives and opens the right screen
- curl to `ingest` writes a row; a wrong secret is rejected
