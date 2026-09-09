import { getPlatformStyle } from '../lib/platforms.js'
import PlatformIcon from './PlatformIcon.jsx'

function formatDateLabel(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

function formatTime(timeString) {
  if (!timeString) return null
  const [h, m] = timeString.split(':')
  const hour = Number(h)
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${hour12}:${m} ${period}`
}

export default function ListView({ itemsByDate, onSelectDate, onEditItem }) {
  const sortedDates = Object.keys(itemsByDate).sort()

  if (sortedDates.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-paper-raised p-8 text-center shadow-soft">
        <p className="text-sm text-ink-soft">Nothing scheduled this month yet.</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-3 shadow-soft md:p-6">
      <div className="flex flex-col divide-y divide-line">
        {sortedDates.map((dateKey) => (
          <div key={dateKey} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => onSelectDate(new Date(`${dateKey}T00:00:00`))}
              className="w-28 shrink-0 text-left text-sm font-medium text-ink-soft hover:text-ink"
            >
              {formatDateLabel(dateKey)}
            </button>
            <div className="flex flex-1 flex-col gap-1.5">
              {itemsByDate[dateKey].map((item) => {
                const style = getPlatformStyle(item.platform)
                return (
                  <div
                    key={item.id}
                    onClick={() => onEditItem?.(item)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5"
                    style={{ backgroundColor: style.bg, color: style.text }}
                  >
                    <PlatformIcon icon={style.icon} className="shrink-0" />
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="ml-auto shrink-0 text-xs opacity-80">
                      {[item.content_type, formatTime(item.post_time)].filter(Boolean).join(' · ')}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
