# KOICA ActionHub — Professional Interface

A participant innovation for the KOICA Youth Leaders Program 2026–2027.

## Design direction
This version deliberately avoids the generic “AI dashboard” look. It uses:
- a formal institutional white masthead;
- KOICA-blue primary navigation and communication accents;
- editorial information hierarchy instead of floating card grids;
- a five-country network ribbon;
- a 90-day implementation timeline;
- a field-journal metaphor for evidence;
- a conversation-led AI coach;
- a programme oversight view focused on follow-up and support.

The interface is inspired by KOICA’s external communication approach: clear public-service hierarchy, KOICA Blue, open communication, collaboration and professional support.

## Deploy
Replace the files in your existing `actionhub-prototype` GitHub repository with everything in this package, including the `assets/` and `api/` folders. Commit to `main`; Vercel should redeploy automatically.

## Supabase
The site works in demo mode without Supabase. Later:
1. Create a Supabase project.
2. Run `supabase-schema.sql`.
3. Enable Email authentication.
4. Add the Project URL and anon/public key to `config.js`.
5. Commit and redeploy.

## AI Coach
The coach has a local fallback. For the real AI endpoint, add `OPENAI_API_KEY` in Vercel Environment Variables and redeploy. Optionally set `OPENAI_MODEL`.

Never expose a secret API key inside `index.html`, `app.js`, or `config.js`.

## Branding
This package uses the name **KOICA ActionHub** and a custom ActionHub mark designed for the platform. The mark is not the KOICA Authority Mark. If KOICA provides the official Communication Mark asset for this platform, it can replace or sit alongside `assets/actionhub-mark.svg`.


## Connected backend status
This package is configured for the active Supabase project using a browser-safe publishable key.

Backend objects already created:
- profiles
- action_plans
- milestones
- evidence
- collaboration_interests
- feedback
- private evidence storage bucket
- Row Level Security policies
- automatic participant profile creation after signup

The publishable key in `config.js` is intentionally browser-visible. Access control is enforced by Supabase Row Level Security. Never put a Supabase service-role key in browser code.

## Trust layer
This version adds About ActionHub, How It Works, Privacy & Data Use, and Help & User Guide. Before full cohort rollout, the programme team should review and approve final privacy and retention wording.
