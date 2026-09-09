import { useEffect, useState, useCallback, useMemo } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { CONTENT_TABLE, CONTENT_COLUMNS } from '../lib/schema.js'
import { getPlatformStyle } from '../lib/platforms.js'
import PlatformIcon from '../components/PlatformIcon.jsx'

const STATUS_LABEL = {
  idea: 'Idea',
  draft: 'Draft',
  in_review: 'In review',
  scheduled: 'Scheduled',
  published: 'Published',
}

const FILTERS = ['All', 'Idea', 'Draft', 'In review', 'Scheduled', 'Published']

export default function ContentLibrary() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from(CONTENT_TABLE)
      .select('*')
      .order(CONTENT_COLUMNS.createdAt, { ascending: false })

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

  const filteredItems = useMemo(() => {
    if (activeFilter === 'All') return items
    const targetKey = Object.keys(STATUS_LABEL).find(
      (key) => STATUS_LABEL[key] === activeFilter
    )
    return items.filter((item) => item[CONTENT_COLUMNS.status] === targetKey)
  }, [items, activeFilter])

  return (
    <div className="mx-auto max-w-5xl px-5 py-6 md:px-8 md:py-8">
      <h1 className="mb-6 font-serif text-2xl text-ink">Content Library</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
              activeFilter === filter
                ? 'bg-harbor text-white'
                : 'bg-paper-raised text-ink-soft border border-line hover:bg-paper'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
          Couldn't load content: {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-ink-soft">Loading…</p>
      ) : filteredItems.length === 0 ? (
        <p className="text-sm text-ink-soft">Nothing here yet.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-paper-raised shadow-soft">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-ink-soft">
                <th className="px-5 py-3 font-normal">Title</th>
                <th className="px-5 py-3 font-normal">Platform</th>
                <th className="px-5 py-3 font-normal">Type</th>
                <th className="px-5 py-3 font-normal">Date</th>
                <th className="px-5 py-3 font-normal">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const style = getPlatformStyle(item.platform)
                return (
                  <tr key={item.id} className="border-b border-line last:border-0">
                    <td className="px-5 py-3.5 text-ink">{item.title}</td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs"
                        style={{ backgroundColor: style.bg, color: style.text }}
                      >
                        <PlatformIcon icon={style.icon} />
                        {style.label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-ink-soft">{item.content_type || '—'}</td>
                    <td className="px-5 py-3.5 text-ink-soft">
                      {item.post_date || '—'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-full bg-harbor-soft px-2.5 py-0.5 text-xs text-harbor-dark">
                        {STATUS_LABEL[item.status] || item.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
