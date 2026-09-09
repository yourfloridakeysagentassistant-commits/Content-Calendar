// ---------------------------------------------------------------------------
// ASSUMED SUPABASE SCHEMA
// ---------------------------------------------------------------------------
// The database already exists per project instructions, but its exact table
// and column names were not provided. Every query in this app reads table
// and column names from this file ONLY, so if the real schema differs, this
// is the single place to fix it — no need to hunt through components.
//
// Assumed table: content_items
//   id             uuid        primary key, default gen_random_uuid()
//   title          text        required
//   content_type   text        e.g. "Instagram Post", "Blog", "Email", "Video"
//   status         text        one of: idea | draft | in_review | scheduled | published
//   scheduled_date date        nullable — date this content is planned to go out
//   notes          text        nullable
//   created_by     uuid        references auth.users(id)
//   created_at     timestamptz default now()
// ---------------------------------------------------------------------------

export const CONTENT_TABLE = 'content_items'

export const CONTENT_COLUMNS = {
  id: 'id',
  title: 'title',
  contentType: 'content_type',
  status: 'status',
  scheduledDate: 'scheduled_date',
  notes: 'notes',
  createdBy: 'created_by',
  createdAt: 'created_at',
}

export const STATUS = {
  IDEA: 'idea',
  DRAFT: 'draft',
  IN_REVIEW: 'in_review',
  SCHEDULED: 'scheduled',
  PUBLISHED: 'published',
}
