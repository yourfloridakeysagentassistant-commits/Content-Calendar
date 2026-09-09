import { useState } from 'react'

export default function TopBar({ user, onMenuClick }) {
  const [query, setQuery] = useState('')

  const initials = (user?.email || 'U')
    .split('@')[0]
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="flex items-center gap-4 border-b border-line bg-paper-raised px-5 py-3.5 md:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-ink-soft hover:bg-paper md:hidden"
        aria-label="Open menu"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M2.5 5h15M2.5 10h15M2.5 15h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      <div className="relative flex-1 max-w-md">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search content"
          className="w-full rounded-xl border border-line bg-paper py-2 pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft/60 focus:border-harbor focus:outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-harbor text-sm font-medium text-white">
          {initials}
        </div>
      </div>
    </header>
  )
}
