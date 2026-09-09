import { useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (signInError) {
      setError(signInError.message)
      return
    }

    window.location.href = '/'
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-line bg-paper-raised p-7 shadow-soft"
      >
        <h1 className="font-serif text-2xl text-ink">Content Calendar</h1>
        <p className="mt-1.5 text-sm text-ink-soft">Sign in to continue.</p>

        <div className="mt-6 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-ink-soft">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-harbor focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm text-ink-soft">Password</span>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink focus:border-harbor focus:outline-none"
            />
          </label>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-harbor px-4 py-2.5 text-sm font-medium text-white hover:bg-harbor-dark disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
