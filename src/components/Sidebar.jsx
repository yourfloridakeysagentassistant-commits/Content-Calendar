import { NavLink, useNavigate } from 'react-router-dom'
import MiniCalendar from './MiniCalendar.jsx'
import NavIcon from './NavIcon.jsx'

const NAV_ITEMS = [
  { to: '/', label: 'Calendar', icon: 'calendar' },
  { to: '/ideas', label: 'Ideas', icon: 'idea' },
  { to: '/library', label: 'Content Library', icon: 'library' },
  { to: '/review', label: 'Review', icon: 'review' },
  { to: '/analytics', label: 'Analytics', icon: 'analytics' },
  { to: '/brand-assets', label: 'Brand Assets', icon: 'brand' },
  { to: '/settings', label: 'Settings', icon: 'settings' },
]

export default function Sidebar({ onNavigate }) {
  const navigate = useNavigate()

  const handleCreate = () => {
    onNavigate?.()
    navigate('/', { state: { openCreate: true } })
  }

  return (
    <aside className="flex h-full w-full flex-col overflow-y-auto bg-paper-raised">
      <div className="px-6 py-7">
        <span className="block font-serif text-xl leading-tight tracking-tight text-ink">
          Your Florida Keys Agent
        </span>
        <span className="mt-0.5 block text-[11px] font-medium tracking-[0.15em] text-ink-soft">
          CONTENT CALENDAR
        </span>
      </div>

      <div className="px-3">
        <button
          type="button"
          onClick={handleCreate}
          className="w-full rounded-xl bg-hotpink px-3 py-2.5 text-sm font-medium text-white hover:bg-hotpink-dark"
        >
          + Create Content
        </button>
      </div>

      <nav className="mt-4 flex flex-col gap-1 px-3">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[15px] transition-colors ${
                isActive
                  ? 'bg-harbor-soft text-harbor-dark font-medium'
                  : 'text-ink-soft hover:bg-paper hover:text-ink'
              }`
            }
          >
            <NavIcon icon={item.icon} className="shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="my-3 border-t border-line" />
      <MiniCalendar />
    </aside>
  )
}
