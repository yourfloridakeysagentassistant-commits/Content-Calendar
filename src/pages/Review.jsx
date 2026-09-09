import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { CONTENT_TABLE, CONTENT_COLUMNS, STATUS } from '../lib/schema.js'

export default function Review() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from(CONTENT_TABLE)
      .select('*')
      .eq(CONTENT_COLUMNS.status, STATUS.IN_REVIEW)
      .order(CONTENT_COLUMNS.postDate, { ascending: true })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const updateStatus = async (id, status) => {
    setUpdatingId(id)
    const { error: updateError } = await supabase
      .from(CONTENT_TABLE)
      .update({ [CONTENT_COLUMNS.status]: status })
      .eq(CONTENT_COLUMNS.id, id)

    setUpdatingId(null)

    if (updateError) {
      setError(updateError.message)
      return
    }
    fetchItems()
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-8 md:py-8">
      <h1 className="mb-6 font-serif text-2xl text-ink">Review</h1>

      {error && (
        <div className="mb-6 rounded-xl border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
          Couldn't load content: {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-ink-soft">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink-soft">Nothing waiting on review.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="rounded-2xl border border-line bg-paper-raised p-5 shadow-soft"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-ink">{item.title}</p>
                  {item.content_type && (
                    <p className="mt-1 text-xs text-ink-soft">{item.content_type}</p>
                  )}
                  {item.private_note && (
                    <p className="mt-2 text-sm text-ink-soft">{item.private_note}</p>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    disabled={updatingId === item.id}
                    onClick={() => updateStatus(item.id, STATUS.DRAFT)}
                    className="rounded-xl border border-line px-3 py-1.5 text-sm text-ink-soft hover:bg-paper disabled:opacity-60"
                  >
                    Send back
                  </button>
                  <button
                    type="button"
                    disabled={updatingId === item.id}
                    onClick={() => updateStatus(item.id, STATUS.SCHEDULED)}
                    className="rounded-xl bg-harbor px-3 py-1.5 text-sm font-medium text-white hover:bg-harbor-dark disabled:opacity-60"
                  >
                    Approve
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
