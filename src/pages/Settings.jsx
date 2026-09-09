import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

export default function Settings() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null))
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-6 md:px-8 md:py-8">
      <h1 className="mb-6 font-serif text-2xl text-ink">Settings</h1>

      <div className="rounded-2xl border border-line bg-paper-raised p-6 shadow-soft">
        <h2 className="text-sm text-ink-soft">Account</h2>
        <p className="mt-1.5 text-sm text-ink">{user?.email || '—'}</p>

        <button
          type="button"
          onClick={handleSignOut}
          className="mt-6 rounded-xl border border-line px-4 py-2 text-sm text-ink-soft hover:bg-paper"
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
