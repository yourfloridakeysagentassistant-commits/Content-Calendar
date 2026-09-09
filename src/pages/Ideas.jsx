import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { CONTENT_TABLE, CONTENT_COLUMNS, STATUS } from '../lib/schema.js'

export default function Ideas() {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newIdea, setNewIdea] = useState('')
  const [saving, setSaving] = useState(false)

  const fetchIdeas = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from(CONTENT_TABLE)
      .select('*')
      .eq(CONTENT_COLUMNS.status, STATUS.IDEA)
      .order(CONTENT_COLUMNS.createdAt, { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setIdeas(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchIdeas()
  }, [fetchIdeas])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!newIdea.trim()) return
    setSaving(true)
    const { data: userData } = await supabase.auth.getUser()

    const { error: insertError } = await supabase.from(CONTENT_TABLE).insert({
      [CONTENT_COLUMNS.title]: newIdea.trim(),
      [CONTENT_COLUMNS.status]: STATUS.IDEA,
      [CONTENT_COLUMNS.createdBy]: userData?.user?.id,
    })

    setSaving(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    setNewIdea('')
    fetchIdeas()
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-6 md:px-8 md:py-8">
      <h1 className="mb-6 font-serif text-2xl text-ink">Ideas</h1>

      <form onSubmit={handleAdd} className="mb-8 flex gap-3">
        <input
          value={newIdea}
          onChange={(e) => setNewIdea(e.target.value)}
          type="text"
          placeholder="Jot down a new idea"
          className="flex-1 rounded-xl border border-line bg-paper-raised px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/60 focus:border-harbor focus:outline-none"
        />
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-harbor px-4 py-2.5 text-sm font-medium text-white hover:bg-harbor-dark disabled:opacity-60"
        >
          Add
        </button>
      </form>

      {error && (
        <div className="mb-6 rounded-xl border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
          Couldn't load ideas: {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-ink-soft">Loading…</p>
      ) : ideas.length === 0 ? (
        <p className="text-sm text-ink-soft">No ideas yet. Add your first one above.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {ideas.map((idea) => (
            <li
              key={idea.id}
              className="rounded-xl border border-line bg-paper-raised px-4 py-3.5 shadow-soft"
            >
              <p className="text-sm text-ink">{idea.title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
