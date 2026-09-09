import { getPlatformStyle } from '../lib/platforms.js'
import PlatformIcon from './PlatformIcon.jsx'

function formatTime(timeString) {
  if (!timeString) return null
  const [h, m] = timeString.split(':')
  const hour = Number(h)
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${hour12}:${m} ${period}`
}

export default function TodaysContent({ date, items, loading, onAdd, onEdit, onDelete, deletingId }) {
  const label = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-serif text-lg text-ink">{label}</h2>
        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="shrink-0 rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink-soft hover:bg-paper"
          >
            + Add
          </button>
        )}
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-ink-soft">Loading…</p>
      ) : items.length === 0 ? (
        <div className="mt-4 flex flex-col items-center gap-2 rounded-xl bg-paper py-6 text-center">
          <PlatformIcon icon="doc" className="text-ink-soft/50" />
          <p className="text-sm text-ink-soft">Nothing planned for this day yet.</p>
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-2.5">
          {items.map((item) => {
            const style = getPlatformStyle(item.platform)
            return (
              <li
                key={item.id}
                onClick={() => onEdit?.(item)}
                className={`rounded-xl px-3.5 py-3 ${onEdit ? 'cursor-pointer' : ''}`}
                style={{ backgroundColor: style.bg, color: style.text }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <PlatformIcon icon={style.icon} className="shrink-0" />
                    <p className="text-sm font-medium">{item.title}</p>
                  </div>
                  {onDelete && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (window.confirm(`Delete "${item.title}"? This can't be undone.`)) {
                          onDelete(item.id)
                        }
                      }}
                      disabled={deletingId === item.id}
                      className="shrink-0 rounded-md p-1 opacity-60 hover:opacity-100 disabled:opacity-30"
                      aria-label={`Delete ${item.title}`}
                      style={{ color: style.text }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M2.5 3.5h9M5.5 3.5V2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1.5M5.5 6.5v4M8.5 6.5v4M3.5 3.5l.5 8a1 1 0 001 1h4a1 1 0 001-1l.5-8"
                          stroke="currentColor"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <p className="mt-0.5 text-xs opacity-80">
                  {[item.content_type, formatTime(item.post_time)].filter(Boolean).join(' · ')}
                </p>
                {item.file_url && (
                  <img
                    src={item.file_url}
                    alt={item.file_name || item.title}
                    className="mt-2 h-20 w-full rounded-lg object-cover"
                  />
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
