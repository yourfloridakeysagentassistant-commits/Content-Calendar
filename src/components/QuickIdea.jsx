import { useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { CONTENT_TABLE, CONTENT_COLUMNS, STATUS } from '../lib/schema.js'

export default function QuickIdea() {
  const [value, setValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!value.trim()) return
    setSaving(true)
    setSaved(false)
    const { data: userData } = await supabase.auth.getUser()

    const { error } = await supabase.from(CONTENT_TABLE).insert({
      [CONTENT_COLUMNS.title]: value.trim(),
      [CONTENT_COLUMNS.status]: STATUS.IDEA,
      [CONTENT_COLUMNS.createdBy]: userData?.user?.id,
    })

    setSaving(false)

    if (!error) {
      setValue('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5 shadow-soft">
      <h2 className="font-serif text-lg text-ink">Quick idea</h2>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={2}
        placeholder="Jot down a content idea…"
        className="mt-3 w-full resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink-soft/60 focus:border-harbor focus:outline-none"
      />
      <button
        type="button"
        onClick={handleSave}
        disabled={saving || !value.trim()}
        className="mt-3 w-full rounded-xl bg-mint px-4 py-2 text-sm font-medium text-white hover:bg-mint-dark disabled:opacity-50"
      >
        {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save to Ideas'}
      </button>
    </div>
  )
}
