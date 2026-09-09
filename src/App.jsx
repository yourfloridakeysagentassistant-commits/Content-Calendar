import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabaseClient.js'
import { CalendarProvider } from './lib/CalendarContext.jsx'
import Layout from './components/Layout.jsx'
import Calendar from './pages/Calendar.jsx'
import Ideas from './pages/Ideas.jsx'
import ContentLibrary from './pages/ContentLibrary.jsx'
import Review from './pages/Review.jsx'
import Analytics from './pages/Analytics.jsx'
import BrandAssets from './pages/BrandAssets.jsx'
import Settings from './pages/Settings.jsx'
import Login from './pages/Login.jsx'

export default function App() {
  const [session, setSession] = useState(undefined) // undefined = loading, null = signed out

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="flex h-screen items-center justify-center bg-paper">
        <p className="text-sm text-ink-soft">Loading…</p>
      </div>
    )
  }

  if (session === null) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <CalendarProvider>
      <Routes>
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route element={<Layout user={session.user} />}>
          <Route path="/" element={<Calendar />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/library" element={<ContentLibrary />} />
          <Route path="/review" element={<Review />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/brand-assets" element={<BrandAssets />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CalendarProvider>
  )
}
