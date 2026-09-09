# Content Calendar — Version 1

React + Vite + Tailwind + Supabase app for planning and reviewing content.

## Pages

- **Calendar** (home) — month view, today's content panel, create content
- **Ideas** — capture and browse raw ideas
- **Content Library** — all content, filterable by status
- **Review** — approve or send back content in review
- **Settings** — account info, sign out

## Setup

```
npm install
cp .env.example .env   # fill in your Supabase project URL and anon key
npm run dev
```

## Required environment variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## Database schema this app expects

This app was built without access to the live schema, so it assumes one table,
documented in full — with column names — in `src/lib/schema.js`. That file is
the single source of truth every query reads from:

**`content_items`**

| column | type | notes |
|---|---|---|
| `id` | uuid | primary key |
| `title` | text | required |
| `content_type` | text | e.g. "Instagram Post", "Blog", "Email", "Video" |
| `status` | text | `idea`, `draft`, `in_review`, `scheduled`, or `published` |
| `scheduled_date` | date | nullable |
| `notes` | text | nullable |
| `created_by` | uuid | references `auth.users(id)` |
| `created_at` | timestamptz | default `now()` |

**If your real table/column names differ, edit `src/lib/schema.js` only** —
no need to touch any component or page.

## Assumptions made to ship Version 1

The brief said "Authentication already exists" but didn't specify a sign-in
page. Since a fully unauthenticated app can't call Supabase safely, a minimal
`/login` route was added (email + password via `supabase.auth.signInWithPassword`).
It is intentionally not in the sidebar and not one of the five requested pages —
if you already have a separate login flow, this route can be deleted.

## Deployment

Deploy to Vercel and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as
project environment variables.
