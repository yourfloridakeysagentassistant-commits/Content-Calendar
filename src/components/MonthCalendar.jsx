import { getPlatformStyle } from '../lib/platforms.js'
import PlatformIcon from './PlatformIcon.jsx'

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MAX_VISIBLE_PER_DAY = 3

function toDateKey(date) {
  return date.toISOString().slice(0, 10)
}

function buildMonthGrid(year, month) {
  const firstOfMonth = new Date(year, month, 1)
  const startWeekday = firstOfMonth.getDay()
  const gridStart = new Date(year, month, 1 - startWeekday)

  const cells = []
  for (let i = 0; i < 42; i += 1) {
    const cellDate = new Date(gridStart)
    cellDate.setDate(gridStart.getDate() + i)
    cells.push(cellDate)
  }
  return cells
}

function formatTime(timeString) {
  if (!timeString) return null
  const [h, m] = timeString.split(':')
  const hour = Number(h)
  const period = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 === 0 ? 12 : hour % 12
  return `${hour12}:${m} ${period}`
}

export default function MonthCalendar({
  currentMonth,
  onMonthChange,
  selectedDate,
  onSelectDate,
  itemsByDate,
}) {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const cells = buildMonthGrid(year, month)
  const today = toDateKey(new Date())

  const monthLabel = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const goToPrevMonth = () => onMonthChange(new Date(year, month - 1, 1))
  const goToNextMonth = () => onMonthChange(new Date(year, month + 1, 1))

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-3 shadow-soft md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">{monthLabel}</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goToPrevMonth}
            aria-label="Previous month"
            className="rounded-lg p-2 text-ink-soft hover:bg-paper"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={goToNextMonth}
            aria-label="Next month"
            className="rounded-lg p-2 text-ink-soft hover:bg-paper"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl border border-line bg-line text-center text-[11px] font-medium tracking-wide text-ink-soft">
        {WEEKDAYS.map((day) => (
          <div key={day} className="bg-paper py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-px overflow-hidden rounded-b-xl border-x border-b border-line bg-line">
        {cells.map((cellDate) => {
          const key = toDateKey(cellDate)
          const inCurrentMonth = cellDate.getMonth() === month
          const isToday = key === today
          const isSelected = key === toDateKey(selectedDate)
          const dayItems = itemsByDate?.[key] || []
          const visibleItems = dayItems.slice(0, MAX_VISIBLE_PER_DAY)
          const overflowCount = dayItems.length - visibleItems.length

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate(cellDate)}
              className={`flex min-h-[52px] flex-col gap-1 bg-paper-raised p-1 text-left align-top transition-colors md:min-h-[92px] md:p-1.5 ${
                isSelected ? 'ring-2 ring-inset ring-harbor' : 'hover:bg-paper'
              } ${!inCurrentMonth ? 'opacity-40' : ''}`}
            >
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  isToday ? 'bg-harbor font-medium text-white' : 'text-ink-soft'
                }`}
              >
                {cellDate.getDate()}
              </span>

              {/* Mobile: compact colored dots only */}
              {dayItems.length > 0 && (
                <div className="flex flex-wrap gap-0.5 md:hidden">
                  {dayItems.slice(0, 4).map((item) => {
                    const style = getPlatformStyle(item.platform)
                    return (
                      <span
                        key={item.id}
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: style.text }}
                      />
                    )
                  })}
                </div>
              )}

              {/* Tablet/desktop: full chips */}
              <div className="hidden flex-col gap-1 md:flex">
                {visibleItems.map((item) => {
                  const style = getPlatformStyle(item.platform)
                  return (
                    <div
                      key={item.id}
                      className="rounded-md px-1.5 py-1 leading-tight"
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
                {overflowCount > 0 && (
                  <span className="px-1.5 text-[10px] text-ink-soft">+{overflowCount} more</span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
