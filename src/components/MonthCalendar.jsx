import { getPlatformStyle } from '../lib/platforms.js'
import PlatformIcon from './PlatformIcon.jsx'
import { isImageFile } from '../lib/schema.js'

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
  onAddForDate,
  onEditItem,
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
          const isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6
          const dayItems = itemsByDate?.[key] || []
          const visibleItems = dayItems.slice(0, MAX_VISIBLE_PER_DAY)
          const overflowCount = dayItems.length - visibleItems.length

          return (
            <div
              key={key}
              role="button"
              tabIndex={0}
              onClick={() => {
                onSelectDate(cellDate)
                if (dayItems.length === 0) onAddForDate?.(cellDate)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectDate(cellDate)
                  if (dayItems.length === 0) onAddForDate?.(cellDate)
                }
              }}
              className={`group relative flex min-h-[52px] cursor-pointer flex-col gap-1 p-1 text-left align-top transition-colors md:min-h-[92px] md:p-1.5 ${
                isSelected
                  ? 'ring-2 ring-inset ring-harbor bg-paper-raised'
                  : isToday
                  ? 'ring-1 ring-inset ring-coral/50 bg-coral-soft/40 hover:bg-coral-soft/60'
                  : isWeekend
                  ? 'bg-paper hover:bg-line/40'
                  : 'bg-paper-raised hover:bg-paper'
              } ${!inCurrentMonth ? 'opacity-40' : ''}`}
            >
              {dayItems.length > 0 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddForDate?.(cellDate)
                  }}
                  aria-label="Add content to this day"
                  className="absolute right-1 top-1 hidden h-4 w-4 items-center justify-center rounded-full bg-hotpink text-[10px] leading-none text-white hover:bg-hotpink-dark md:flex"
                >
                  +
                </button>
              )}
              <span
                className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                  isToday ? 'bg-harbor font-medium text-white' : 'text-ink-soft'
                }`}
              >
                {cellDate.getDate()}
              </span>

              {/* Mobile: bold colored bars instead of tiny dots */}
              {dayItems.length > 0 && (
                <div className="flex flex-col gap-0.5 md:hidden">
                  {dayItems.slice(0, 3).map((item) => {
                    const style = getPlatformStyle(item.platform)
                    return (
                      <span
                        key={item.id}
                        className="block h-1.5 w-full rounded-full"
                        style={{ backgroundColor: style.accent }}
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
                      onClick={(e) => {
                        e.stopPropagation()
                        onEditItem?.(item)
                      }}
                      className="cursor-pointer rounded-md px-1.5 py-1 leading-tight"
                      style={{ backgroundColor: style.bg, color: style.text }}
                    >
                      <div className="flex items-center gap-1">
                        {item.file_url && isImageFile(item.file_name) ? (
                          <img
                            src={item.file_url}
                            alt=""
                            className="h-3.5 w-3.5 shrink-0 rounded-sm object-cover"
                          />
                        ) : (
                          <PlatformIcon icon={style.icon} className="shrink-0" />
                        )}
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
            </div>
          )
        })}
      </div>
    </div>
  )
}
