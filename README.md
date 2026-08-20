# ActionHub V2.1

Unofficial participant-built prototype developed during the KOICA Youth Leaders Program 2026–2027.

## Improvements in V2.1
- Real SVG flags for Cameroon, Côte d'Ivoire, Ghana, Nigeria and Senegal (works on Windows)
- Full participant name and full country names
- English / French / Korean navigation
- Clear DEMO DATA / LIVE BACKEND indicator
- Prototype-data disclaimer
- Participant account creation, sign-in and sign-out
- Coordinator Dashboard hidden and restricted for ordinary participants
- Cross-country Action Plan discovery
- 90-Day Challenge
- Evidence uploads with private Supabase Storage support
- Feedback form
- Real AI Action Plan Coach endpoint using OpenAI Responses API
- Footer identifying the prototype as participant-built

## Deploy to your existing GitHub/Vercel project
Replace the files in your `actionhub-prototype` repository with all files from this package.

Important: upload the complete `assets/flags/` and `api/` folders.

Expected structure:

```
index.html
styles.css
app.js
config.js
README.md
supabase-schema.sql
api/
  coach.js
assets/
  flags/
    cameroon.svg
    cote-divoire.svg
    ghana.svg
    nigeria.svg
    senegal.svg
```

Commit to the `main` branch. Vercel should redeploy automatically.

## Activate real AI Coach
In Vercel:
1. Project → Settings → Environment Variables
2. Add `OPENAI_API_KEY`
3. Optional: add `OPENAI_MODEL` (default is `gpt-5.6-luna`)
4. Redeploy

Never place an OpenAI API key in browser files.

## Activate real accounts, shared data and file uploads
1. Create a Supabase project.
2. Open SQL Editor and run `supabase-schema.sql`.
3. Enable Email authentication.
4. Copy your Supabase Project URL and anon/public key.
5. Edit `config.js`:

```js
window.ACTIONHUB_CONFIG={
  SUPABASE_URL:"https://YOUR-PROJECT.supabase.co",
  SUPABASE_ANON_KEY:"YOUR-ANON-KEY"
};
```

6. Commit the change to GitHub.
7. To make a user a coordinator, change their `profiles.role` to `coordinator` in Supabase. Participants cannot self-assign coordinator rights in real mode.

## Recommended demo flow
1. Open Dashboard and show the five country flags.
2. Change English → Français → 한국어.
3. Open Cross-country Plans.
4. Open SmartDry Cameroon.
5. Ask the AI Action Plan Coach for a 90-day plan.
6. Mark a milestone complete.
7. Upload evidence.
8. Send feedback.
9. Switch to Coordinator in demo mode and show the restricted dashboard.
10. Explain how Supabase turns demo data into real shared cohort data.
