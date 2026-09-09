# Content Calendar — Version 1

React + Vite + Tailwind + Supabase app for planning and reviewing content.

## Pages

- **Calendar** (home) — Month/Week/List views, mini calendar, today's content, quick idea capture, create content (with photo/video upload)
- **Ideas** — capture and browse raw ideas
- **Content Library** — all content, filterable by status, deletable
- **Review** — approve or send back content in review
- **Analytics** — counts by status and by platform
- **Brand Assets** — upload/browse logos and reference files
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

## Database schema

Confirmed against the live database. Every query reads table and column names
from `src/lib/schema.js` only — that's the single place to edit if this ever
changes.

**`content_items`**

| column | type |
|---|---|
| `id` | uuid |
| `title` | text |
| `platform` | text |
| `content_type` | text |
| `content_size` | text |
| `status` | text |
| `post_date` | date |
| `post_time` | time without time zone |
| `caption` | text |
| `private_note` | text |
| `partner_note` | text |
| `canva_link` | text |
| `file_url` | text |
| `file_name` | text |
| `created_by` | uuid, references `auth.users(id)` |
| `created_at` | timestamptz |
| `updated_at` | timestamptz |

Version 1's UI only reads/writes a subset of these columns (`title`,
`content_type`, `status`, `post_date`, `caption`) since that's what the
requested pages needed. The rest (`platform`, `content_size`, `post_time`,
`private_note`, `partner_note`, `canva_link`, `file_url`, `file_name`) exist
in the table but aren't surfaced yet — add fields for them in a future
version if needed.

**Status values were not confirmed against a check constraint.** The app
uses `idea`, `draft`, `in_review`, `scheduled`, `published` — if your actual
data uses different strings, update `STATUS` in `src/lib/schema.js`.

## Assumptions made to ship Version 1

The brief said "Authentication already exists" but didn't specify a sign-in
page. Since a fully unauthenticated app can't call Supabase safely, a minimal
`/login` route was added (email + password via `supabase.auth.signInWithPassword`).
It is intentionally not in the sidebar and not one of the five requested pages —
if you already have a separate login flow, this route can be deleted.

## Deployment

Deploy to Vercel and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as
project environment variables.
