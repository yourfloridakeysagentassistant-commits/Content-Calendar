import { getPlatformStyle } from '../lib/platforms.js'
import PlatformIcon from './PlatformIcon.jsx'

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

function toDateKey(date) {
  return date.toISOString().slice(0, 10)
}

function formatTime(timeString) {
  if (!timeString) return null
  const [h, m] = timeString.split(':')
  const hour = Number(h)
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${hour12}:${m} ${period}`
}

function getWeekDates(anchorDate) {
  const start = new Date(anchorDate)
  start.setDate(start.getDate() - start.getDay())
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

export default function WeekView({ selectedDate, onSelectDate, onAddForDate, onEditItem, itemsByDate }) {
  const weekDates = getWeekDates(selectedDate)
  const today = toDateKey(new Date())

  const rangeLabel = `${weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-3 shadow-soft md:p-6">
      <h2 className="mb-4 font-serif text-xl text-ink">{rangeLabel}</h2>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-7">
        {weekDates.map((date, i) => {
          const key = toDateKey(date)
          const isToday = key === today
          const isSelected = key === toDateKey(selectedDate)
          const dayItems = itemsByDate?.[key] || []

          return (
            <div
              key={key}
              className={`rounded-xl border p-2.5 ${
                isSelected ? 'border-harbor' : 'border-line'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectDate(date)}
                className="mb-2 flex w-full items-center justify-between"
              >
                <span className="text-[11px] font-medium tracking-wide text-ink-soft">
                  {WEEKDAYS[i]}
                </span>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    isToday ? 'bg-harbor font-medium text-white' : 'text-ink-soft'
                  }`}
                >
                  {date.getDate()}
                </span>
              </button>

              <div className="flex flex-col gap-1.5">
                {dayItems.map((item) => {
                  const style = getPlatformStyle(item.platform)
                  return (
                    <div
                      key={item.id}
                      onClick={() => onEditItem?.(item)}
                      className="cursor-pointer rounded-md px-2 py-1.5"
                      style={{ backgroundColor: style.bg, color: style.text }}
                    >
                      <div className="flex items-center gap-1">
                        <PlatformIcon icon={style.icon} className="shrink-0" />
                        <span className="truncate text-[11px] font-medium">{item.title}</span>
                      </div>
                      {(item.content_type || item.post_time) && (
                        <div className="truncate text-[10px] opacity-80">
                          {[item.content_type, formatTime(item.post_time)].filter(Boolean).join(' · ')}
                        </div>
                      )}
                    </div>
                  )
                })}
                <button
                  type="button"
                  onClick={() => onAddForDate(date)}
                  className="rounded-md border border-dashed border-line py-1.5 text-[11px] text-ink-soft hover:bg-paper"
                >
                  + Add
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
