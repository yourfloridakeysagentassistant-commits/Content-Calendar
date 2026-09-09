import { NavLink } from 'react-router-dom'

const NAV_ITEMS = [
  { to: '/', label: 'Calendar' },
  { to: '/ideas', label: 'Ideas' },
  { to: '/library', label: 'Content Library' },
  { to: '/review', label: 'Review' },
  { to: '/settings', label: 'Settings' },
]

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="h-full w-full bg-paper-raised">
      <div className="px-6 py-7">
        <span className="font-serif text-xl tracking-tight text-ink">Content Calendar</span>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `rounded-xl px-3 py-2.5 text-[15px] transition-colors ${
                isActive
                  ? 'bg-harbor-soft text-harbor-dark font-medium'
                  : 'text-ink-soft hover:bg-paper hover:text-ink'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
