import { useEffect, useMemo, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { CONTENT_TABLE, CONTENT_COLUMNS } from '../lib/schema.js'
import MonthCalendar from '../components/MonthCalendar.jsx'
import TodaysContent from '../components/TodaysContent.jsx'
import CreateContentModal from '../components/CreateContentModal.jsx'
import PlatformLegend from '../components/PlatformLegend.jsx'
import QuickIdea from '../components/QuickIdea.jsx'

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
  const [createError, setCreateError] = useState(null)

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
      .gte(CONTENT_COLUMNS.postDate, monthRange.start)
      .lte(CONTENT_COLUMNS.postDate, monthRange.end)
      .order(CONTENT_COLUMNS.postTime, { ascending: true })

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

  const itemsByDate = useMemo(() => {
    const grouped = {}
    for (const item of items) {
      const key = item[CONTENT_COLUMNS.postDate]
      if (!key) continue
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(item)
    }
    return grouped
  }, [items])

  const selectedDateItems = useMemo(() => {
    const key = toDateKey(selectedDate)
    return itemsByDate[key] || []
  }, [itemsByDate, selectedDate])

  const handleCreate = async (payload, file) => {
    setSaving(true)
    setCreateError(null)
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData?.user?.id

    let fileFields = {}
    if (file) {
      const filePath = `${userId}/${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage
        .from('content-uploads')
        .upload(filePath, file)

      if (uploadError) {
        setSaving(false)
        setCreateError(`File upload failed: ${uploadError.message}`)
        return
      }

      const { data: publicUrlData } = supabase.storage
        .from('content-uploads')
        .getPublicUrl(filePath)

      fileFields = {
        [CONTENT_COLUMNS.fileUrl]: publicUrlData?.publicUrl || null,
        [CONTENT_COLUMNS.fileName]: file.name,
      }
    }

    const { error: insertError } = await supabase.from(CONTENT_TABLE).insert({
      ...payload,
      ...fileFields,
      [CONTENT_COLUMNS.createdBy]: userId,
    })

    setSaving(false)

    if (insertError) {
      setCreateError(insertError.message)
      return
    }

    setModalOpen(false)
    fetchItems()
  }

  const openCreateModal = (date) => {
    if (date) setSelectedDate(date)
    setCreateError(null)
    setModalOpen(true)
  }

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-5 sm:py-6 md:px-8 md:py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-ink">Calendar</h1>
        <button
          type="button"
          onClick={() => openCreateModal(selectedDate)}
          className="rounded-xl bg-coral px-4 py-2.5 text-sm font-medium text-white hover:bg-coral-dark"
        >
          + Create Content
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
          Couldn't load content: {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr,340px]">
        <div>
          <MonthCalendar
            currentMonth={currentMonth}
            onMonthChange={setCurrentMonth}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onAddForDate={openCreateModal}
            itemsByDate={itemsByDate}
          />
          <PlatformLegend />
        </div>
        <div className="flex flex-col gap-6">
          <TodaysContent
            date={selectedDate}
            items={selectedDateItems}
            loading={loading}
            onAdd={() => openCreateModal(selectedDate)}
          />
          <QuickIdea />
        </div>
      </div>

      {modalOpen && (
        <CreateContentModal
          defaultDate={selectedDate}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreate}
          saving={saving}
          error={createError}
        />
      )}
    </div>
  )
}
