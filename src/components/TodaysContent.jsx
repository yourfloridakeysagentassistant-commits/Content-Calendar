const STATUS_LABEL = {
  idea: 'Idea',
  draft: 'Draft',
  in_review: 'In review',
  scheduled: 'Scheduled',
  published: 'Published',
}

export default function TodaysContent({ date, items, loading }) {
  const label = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-soft md:p-6">
      <h2 className="font-serif text-xl text-ink">{label}</h2>

      {loading ? (
        <p className="mt-4 text-sm text-ink-soft">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-4 text-sm text-ink-soft">
          Nothing planned for this day yet.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-line px-4 py-3"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-ink">{item.title}</p>
                <span className="shrink-0 rounded-full bg-harbor-soft px-2.5 py-0.5 text-xs text-harbor-dark">
                  {STATUS_LABEL[item.status] || item.status}
                </span>
              </div>
              {item.content_type && (
                <p className="mt-1 text-xs text-ink-soft">{item.content_type}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
