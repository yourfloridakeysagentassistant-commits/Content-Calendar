import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Calendar' },
  { to: '/ideas', label: 'Ideas' },
  { to: '/library', label: 'Content' },
  { to: '/review', label: 'Review' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/settings', label: 'Settings' },
]

export default function TopBar({ user, onMenuClick }) {
  const [query, setQuery] = useState('')

  return (
    <header className="flex items-center gap-3 border-b border-line bg-paper-raised px-5 py-3.5 md:px-8">
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

      <nav className="hidden items-center gap-1 lg:flex">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-sm transition-colors ${
                isActive
                  ? 'bg-harbor-soft font-medium text-harbor-dark'
                  : 'text-ink-soft hover:bg-paper hover:text-ink'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="relative ml-auto max-w-xs flex-1 lg:max-w-sm">
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
    </header>
  )
}
