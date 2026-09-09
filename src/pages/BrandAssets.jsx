import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabaseClient.js'

const FOLDER = 'brand-assets'

function isImage(name) {
  return /\.(png|jpe?g|gif|webp|svg)$/i.test(name)
}

export default function BrandAssets() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  const fetchFiles = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { data, error: listError } = await supabase.storage
      .from('content-uploads')
      .list(FOLDER, { sortBy: { column: 'created_at', order: 'desc' } })

    if (listError) {
      setError(listError.message)
      setFiles([])
      setLoading(false)
      return
    }

    const named = (data || []).filter((f) => f.name && !f.name.startsWith('.'))

    const withUrls = await Promise.all(
      named.map(async (f) => {
        const path = `${FOLDER}/${f.name}`
        const { data: signed } = await supabase.storage
          .from('content-uploads')
          .createSignedUrl(path, 60 * 60 * 24 * 365)
        return { ...f, path, url: signed?.signedUrl }
      })
    )

    setFiles(withUrls)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchFiles()
  }, [fetchFiles])

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)

    const path = `${FOLDER}/${Date.now()}-${file.name}`
    const { error: uploadError } = await supabase.storage
      .from('content-uploads')
      .upload(path, file)

    setUploading(false)
    e.target.value = ''

    if (uploadError) {
      setError(uploadError.message)
      return
    }

    fetchFiles()
  }

  const handleDelete = async (path) => {
    if (!window.confirm('Delete this file? This can\'t be undone.')) return
    const { error: deleteError } = await supabase.storage.from('content-uploads').remove([path])
    if (deleteError) {
      setError(deleteError.message)
      return
    }
    fetchFiles()
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-6 md:px-8 md:py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl text-ink">Brand Assets</h1>
        <label className="cursor-pointer rounded-xl bg-coral px-4 py-2.5 text-sm font-medium text-white hover:bg-coral-dark">
          {uploading ? 'Uploading…' : '+ Upload'}
          <input type="file" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-line bg-paper-raised px-4 py-3 text-sm text-ink-soft">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-ink-soft">Loading…</p>
      ) : files.length === 0 ? (
        <p className="text-sm text-ink-soft">
          No brand assets yet — upload logos, fonts, or reference files here.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {files.map((file) => (
            <div
              key={file.path}
              className="group relative overflow-hidden rounded-xl border border-line bg-paper-raised shadow-soft"
            >
              {isImage(file.name) && file.url ? (
                <img src={file.url} alt={file.name} className="h-28 w-full object-cover" />
              ) : (
                <div className="flex h-28 w-full items-center justify-center bg-paper text-xs text-ink-soft">
                  {file.name.split('.').pop()?.toUpperCase()}
                </div>
              )}
              <p className="truncate px-2.5 py-2 text-xs text-ink-soft">
                {file.name.replace(/^\d+-/, '')}
              </p>
              <button
                type="button"
                onClick={() => handleDelete(file.path)}
                className="absolute right-1.5 top-1.5 rounded-md bg-paper-raised/90 p-1 opacity-0 shadow-soft group-hover:opacity-100"
                aria-label={`Delete ${file.name}`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2.5 3.5h9M5.5 3.5V2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1.5M5.5 6.5v4M8.5 6.5v4M3.5 3.5l.5 8a1 1 0 001 1h4a1 1 0 001-1l.5-8"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
