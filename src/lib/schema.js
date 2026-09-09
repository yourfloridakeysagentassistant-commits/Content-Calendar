// ---------------------------------------------------------------------------
// SUPABASE SCHEMA — confirmed against the live database
// ---------------------------------------------------------------------------
// Every query in this app reads table and column names from this file ONLY,
// so if the schema changes later, this is the single place to fix it.
//
// Table: content_items
//   id             uuid                      primary key
//   title          text
//   platform       text                      e.g. "Instagram", "Facebook"
//   content_type   text                      e.g. "Post", "Story", "Reel"
//   content_size   text
//   status         text                      workflow state (see STATUS below —
//                                             exact values were not confirmed
//                                             against a check constraint, so
//                                             verify these match your data)
//   post_date      date
//   post_time      time without time zone
//   caption        text
//   private_note   text
//   partner_note   text
//   canva_link     text
//   file_url       text
//   file_name      text
//   created_by     uuid                      references auth.users(id)
//   created_at     timestamp with time zone
//   updated_at     timestamp with time zone
// ---------------------------------------------------------------------------

export const CONTENT_TABLE = 'content_items'

export const CONTENT_COLUMNS = {
  id: 'id',
  title: 'title',
  platform: 'platform',
  contentType: 'content_type',
  contentSize: 'content_size',
  status: 'status',
  postDate: 'post_date',
  postTime: 'post_time',
  caption: 'caption',
  privateNote: 'private_note',
  partnerNote: 'partner_note',
  canvaLink: 'canva_link',
  fileUrl: 'file_url',
  fileName: 'file_name',
  createdBy: 'created_by',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
}

// Not confirmed against a DB check constraint — these are the same values
// Version 1 was built against. If your real status values differ, this is
// the only place that needs to change.
export const STATUS = {
  IDEA: 'idea',
  DRAFT: 'draft',
  IN_REVIEW: 'in_review',
  SCHEDULED: 'scheduled',
  PUBLISHED: 'published',
}
