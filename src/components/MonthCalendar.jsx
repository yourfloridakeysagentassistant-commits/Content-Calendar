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

export default function MonthCalendar({
  currentMonth,
  onMonthChange,
  selectedDate,
  onSelectDate,
  itemCountsByDate,
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
    <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-soft md:p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-serif text-xl text-ink">{monthLabel}</h2>
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

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-ink-soft">
        {WEEKDAYS.map((day, i) => (
          <div key={`${day}-${i}`} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((cellDate) => {
          const key = toDateKey(cellDate)
          const inCurrentMonth = cellDate.getMonth() === month
          const isToday = key === today
          const isSelected = key === toDateKey(selectedDate)
          const count = itemCountsByDate?.[key] || 0

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectDate(cellDate)}
              className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-xl text-sm transition-colors ${
                isSelected
                  ? 'bg-harbor text-white'
                  : isToday
                  ? 'bg-harbor-soft text-harbor-dark font-medium'
                  : inCurrentMonth
                  ? 'text-ink hover:bg-paper'
                  : 'text-ink-soft/40 hover:bg-paper'
              }`}
            >
              <span>{cellDate.getDate()}</span>
              {count > 0 && (
                <span
                  className={`h-1 w-1 rounded-full ${
                    isSelected ? 'bg-white' : 'bg-harbor'
                  }`}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
