import { useNavigate, useLocation } from 'react-router-dom'
import { useCalendarContext } from '../lib/CalendarContext.jsx'

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

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

export default function MiniCalendar() {
  const { currentMonth, setCurrentMonth, selectedDate, setSelectedDate } = useCalendarContext()
  const navigate = useNavigate()
  const location = useLocation()

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const cells = buildMonthGrid(year, month)
  const today = toDateKey(new Date())

  const monthLabel = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const handlePick = (date) => {
    setSelectedDate(date)
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1))
    if (location.pathname !== '/') navigate('/')
  }

  return (
    <div className="px-4 pb-4">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-xs font-medium text-ink-soft">{monthLabel}</span>
        <div className="flex gap-0.5">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
            className="rounded p-1 text-ink-soft hover:bg-paper"
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M10 3l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
            className="rounded p-1 text-ink-soft hover:bg-paper"
          >
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-y-0.5 text-center text-[10px] text-ink-soft/70">
        {WEEKDAYS.map((d, i) => (
          <div key={`${d}-${i}`}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((cellDate) => {
          const key = toDateKey(cellDate)
          const inCurrentMonth = cellDate.getMonth() === month
          const isToday = key === today
          const isSelected = key === toDateKey(selectedDate)
          return (
            <button
              key={key}
              type="button"
              onClick={() => handlePick(cellDate)}
              className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${
                isSelected
                  ? 'bg-harbor font-medium text-white'
                  : isToday
                  ? 'bg-harbor-soft text-harbor-dark font-medium'
                  : inCurrentMonth
                  ? 'text-ink hover:bg-paper'
                  : 'text-ink-soft/30 hover:bg-paper'
              }`}
            >
              {cellDate.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
