import { createContext, useContext, useState } from 'react'

const CalendarContext = createContext(null)

export function CalendarProvider({ children }) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = useState(() => new Date())

  return (
    <CalendarContext.Provider
      value={{ currentMonth, setCurrentMonth, selectedDate, setSelectedDate }}
    >
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendarContext() {
  const ctx = useContext(CalendarContext)
  if (!ctx) {
    throw new Error('useCalendarContext must be used within CalendarProvider')
  }
  return ctx
}
