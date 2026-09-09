import { useState } from 'react'
import { STATUS } from '../lib/schema.js'
import { PLATFORM_STYLES } from '../lib/platforms.js'

const PLATFORMS = Object.keys(PLATFORM_STYLES)
const CONTENT_TYPES = ['Post', 'Story', 'Reel', 'Carousel', 'Blog', 'Email', 'Video']

export default function CreateContentModal({ defaultDate, onClose, onCreate, saving, error }) {
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState(PLATFORMS[0])
  const [contentType, setContentType] = useState(CONTENT_TYPES[0])
  const [postDate, setPostDate] = useState(
    defaultDate.toISOString().slice(0, 10)
  )
  const [postTime, setPostTime] = useState('')
  const [caption, setCaption] = useState('')
  const [note, setNote] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onCreate(
      {
        title: title.trim(),
        platform,
        content_type: contentType,
        status: STATUS.IDEA,
        post_date: postDate,
        post_time: postTime || null,
        caption: caption.trim() || null,
        private_note: note.trim() || null,
      },
      file
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/30 md:items-center">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-t-2xl border border-line bg-paper-raised p-6 shadow-soft md:rounded-2xl"
      >
        <h2 className="font-serif text-xl text-ink">New content</h2>

        <div className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-ink-soft">Title</span>
            <input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              required
              className="rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-harbor focus:outline-none"
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-ink-soft">Platform</span>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-harbor focus:outline-none"
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {PLATFORM_STYLES[p].label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-ink-soft">Format</span>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-harbor focus:outline-none"
              >
                {CONTENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-ink-soft">Date</span>
              <input
                value={postDate}
                onChange={(e) => setPostDate(e.target.value)}
                type="date"
                required
                className="rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-harbor focus:outline-none"
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-ink-soft">Time</span>
              <input
                value={postTime}
                onChange={(e) => setPostTime(e.target.value)}
                type="time"
                className="rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-harbor focus:outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-ink-soft">Photo or video</span>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink file:mr-3 file:rounded-lg file:border-0 file:bg-harbor-soft file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-harbor-dark"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-ink-soft">Caption</span>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className="resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-harbor focus:outline-none"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-ink-soft">Notes</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Internal notes — not shown publicly"
              className="resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-harbor focus:outline-none"
            />
          </label>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-coral/40 bg-coral-soft px-3.5 py-2.5 text-sm text-coral-dark">
            {error}
          </div>
        )}

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm text-ink-soft hover:bg-paper"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-coral px-4 py-2 text-sm font-medium text-white hover:bg-coral-dark disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
