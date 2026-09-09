import { useState } from 'react'
import { STATUS } from '../lib/schema.js'

const CONTENT_TYPES = ['Instagram Post', 'Blog', 'Email', 'Video', 'Newsletter']

export default function CreateContentModal({ defaultDate, onClose, onCreate, saving }) {
  const [title, setTitle] = useState('')
  const [contentType, setContentType] = useState(CONTENT_TYPES[0])
  const [postDate, setPostDate] = useState(
    defaultDate.toISOString().slice(0, 10)
  )
  const [caption, setCaption] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onCreate({
      title: title.trim(),
      content_type: contentType,
      status: STATUS.IDEA,
      post_date: postDate,
      caption: caption.trim() || null,
    })
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

          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-ink-soft">Type</span>
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
            <span className="text-sm text-ink-soft">Caption</span>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className="resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-harbor focus:outline-none"
            />
          </label>
        </div>

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
            className="rounded-xl bg-harbor px-4 py-2 text-sm font-medium text-white hover:bg-harbor-dark disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}
