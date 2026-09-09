import { useEffect, useMemo, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { CONTENT_TABLE, CONTENT_COLUMNS } from '../lib/schema.js'
import MonthCalendar from '../components/MonthCalendar.jsx'
import TodaysContent from '../components/TodaysContent.jsx'
import CreateContentModal from '../components/CreateContentModal.jsx'

function toDateKey(date) {
  return date.toISOString().slice(0, 10)
}

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const monthRange = useMemo(() => {
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    const end = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 2, 0)
    return { start: toDateKey(start), end: toDateKey(end) }
  }, [currentMonth])

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from(CONTENT_TABLE)
      .select('*')
      .gte(CONTENT_COLUMNS.scheduledDate, monthRange.start)
      .lte(CONTENT_COLUMNS.scheduledDate, monthRange.end)
      .order(CONTENT_COLUMNS.scheduledDate, { ascending: true })

    if (fetchError) {
      setError(fetchError.message)
      setItems([])
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }, [monthRange])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const itemCountsByDate = useMemo(() => {
    const counts = {}
    for (const item of items) {
      const key = item[CONTENT_COLUMNS.scheduledDate]
      if (!key) continue
      counts[key] = (counts[key] || 0) + 1
    }
    return counts
  }, [items])

  const selectedDateItems = useMemo(() => {
    const key = toDateKey(selectedDate)
    return items.filter((item) => item[CONTENT_COLUMNS.scheduledDate] === key)
  }, [items, selectedDate])

  const handleCreate = async (payload) => {
    setSaving(true)
    const { data: userData } = await supabase.auth.getUser()

    const { error: insertError } = await supabase.from(CONTENT_TABLE).insert({
      ...payload,
      [CONTENT_COLUMNS.createdBy]: userData?.user?.id,
    })

    setSaving(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setModalOpen(false)
    fetchItems()
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-ink">Calendar</h1>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-xl bg-harbor px-4 py-2.5 text-sm font-medium text-white hover:bg-harbor-dark"
        >
          Create Content
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
          Couldn't load content: {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,340px]">
        <MonthCalendar
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          itemCountsByDate={itemCountsByDate}
        />
        <TodaysContent date={selectedDate} items={selectedDateItems} loading={loading} />
      </div>

      {modalOpen && (
        <CreateContentModal
          defaultDate={selectedDate}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreate}
          saving={saving}
        />
      )}
    </div>
  )
}
