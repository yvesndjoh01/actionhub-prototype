# ActionHub V2
Unofficial participant-built prototype developed during the KOICA Youth Leaders Program.

## What V2 adds
- English, French and Korean navigation
- Flags for Cameroon, Côte d'Ivoire, Ghana, Nigeria and Senegal
- Participant / coordinator role views
- Cross-country Action Plan discovery
- 90-Day Impact Challenge
- Evidence upload interface
- Coordinator dashboard
- AI Action Plan Coach with secure Vercel serverless endpoint
- Supabase-ready shared login, database and file storage
- Demo/local fallback so the site works before backend setup

## Deploy over V1
Upload/replace these files in your GitHub repository:
- index.html
- styles.css
- app.js
- config.js
- api/coach.js
- supabase-schema.sql
- README.md

Commit to `main`. Vercel should redeploy automatically.

## Activate the real AI Coach
In Vercel → Project → Settings → Environment Variables:
1. Add `OPENAI_API_KEY`
2. Optional: add `OPENAI_MODEL` (the code defaults to `gpt-5.6-luna`)
3. Redeploy

Never put the secret API key in browser files.

## Activate real login, shared plans and evidence files
1. Create a Supabase project.
2. Run `supabase-schema.sql` in Supabase SQL Editor.
3. Enable Email authentication.
4. Copy your Supabase Project URL and anon key into `config.js`.
5. Create participant/coordinator accounts.
6. Set coordinator users' `profiles.role` to `coordinator`.

For a production version, strengthen coordinator RLS so coordinators can only access participants in their assigned country.

## Demo sequence
1. Switch English → French → Korean.
2. Open Cross-country Plans and filter by country.
3. Open SmartDry Cameroon.
4. Ask AI Coach to improve the 90-day implementation plan.
5. Mark a milestone complete.
6. Upload evidence.
7. Switch to Coordinator role and show the follow-up dashboard.

## Branding
Keep “Unofficial participant-built prototype” visible. Do not use the official KOICA logo or imply KOICA/Hallym University endorsement without explicit permission.
