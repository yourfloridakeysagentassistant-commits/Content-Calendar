const VIEWS = [
  { key: 'month', label: 'Month' },
  { key: 'week', label: 'Week' },
  { key: 'list', label: 'List' },
]

export default function ViewToggle({ view, onChange }) {
  return (
    <div className="inline-flex rounded-xl border border-line bg-paper-raised p-0.5">
      {VIEWS.map((v) => (
        <button
          key={v.key}
          type="button"
          onClick={() => onChange(v.key)}
          className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
            view === v.key
              ? 'bg-harbor text-white'
              : 'text-ink-soft hover:bg-paper'
          }`}
        >
          {v.label}
        </button>
      ))}
    </div>
  )
}
