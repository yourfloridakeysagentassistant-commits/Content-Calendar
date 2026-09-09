import { useEffect, useState, useCallback, useMemo } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { CONTENT_TABLE, CONTENT_COLUMNS } from '../lib/schema.js'
import { getPlatformStyle } from '../lib/platforms.js'

const STATUS_LABEL = {
  idea: 'Idea',
  draft: 'Draft',
  in_review: 'In review',
  scheduled: 'Scheduled',
  published: 'Published',
}
const STATUS_ORDER = ['idea', 'draft', 'in_review', 'scheduled', 'published']

function StatBar({ label, count, total, color }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-ink">{label}</span>
        <span className="text-ink-soft">{count}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-paper">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export default function Analytics() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase.from(CONTENT_TABLE).select('*')

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

  const statusCounts = useMemo(() => {
    const counts = {}
    for (const item of items) {
      const key = item[CONTENT_COLUMNS.status]
      counts[key] = (counts[key] || 0) + 1
    }
    return counts
  }, [items])

  const platformCounts = useMemo(() => {
    const counts = {}
    for (const item of items) {
      const key = item.platform || 'Unspecified'
      counts[key] = (counts[key] || 0) + 1
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1])
  }, [items])

  const upcomingCount = useMemo(() => {
    const todayKey = new Date().toISOString().slice(0, 10)
    return items.filter((item) => item[CONTENT_COLUMNS.postDate] >= todayKey).length
  }, [items])

  return (
    <div className="mx-auto max-w-4xl px-5 py-6 md:px-8 md:py-8">
      <h1 className="mb-6 font-serif text-2xl text-ink">Analytics</h1>

      {error && (
        <div className="mb-6 rounded-xl border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
          Couldn't load content: {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-ink-soft">Loading…</p>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-soft">
              <p className="text-3xl font-serif text-ink">{items.length}</p>
              <p className="mt-1 text-sm text-ink-soft">Total pieces</p>
            </div>
            <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-soft">
              <p className="text-3xl font-serif text-ink">{upcomingCount}</p>
              <p className="mt-1 text-sm text-ink-soft">Upcoming</p>
            </div>
            <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-soft">
              <p className="text-3xl font-serif text-ink">{statusCounts.published || 0}</p>
              <p className="mt-1 text-sm text-ink-soft">Published</p>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper-raised p-6 shadow-soft">
            <h2 className="mb-4 font-serif text-lg text-ink">By status</h2>
            <div className="flex flex-col gap-4">
              {STATUS_ORDER.map((status) => (
                <StatBar
                  key={status}
                  label={STATUS_LABEL[status]}
                  count={statusCounts[status] || 0}
                  total={items.length}
                  color="#1F3A4D"
                />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper-raised p-6 shadow-soft">
            <h2 className="mb-4 font-serif text-lg text-ink">By platform</h2>
            {platformCounts.length === 0 ? (
              <p className="text-sm text-ink-soft">No content yet.</p>
            ) : (
              <div className="flex flex-col gap-4">
                {platformCounts.map(([platform, count]) => {
                  const style = getPlatformStyle(platform === 'Unspecified' ? null : platform)
                  return (
                    <StatBar
                      key={platform}
                      label={platform}
                      count={count}
                      total={items.length}
                      color={style.text}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
