const ICONS = {
  camera: (
    <path
      d="M4 5.5h2.2L7 4h4l.8 1.5H14a1 1 0 011 1V12a1 1 0 01-1 1H4a1 1 0 01-1-1V6.5a1 1 0 011-1z M9 6.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
      fill="currentColor"
      fillRule="evenodd"
    />
  ),
  facebook: (
    <path
      d="M10.2 15V9.6h1.8l.3-2.1h-2.1V6.2c0-.6.2-1 1-1h1.1V3.3c-.2 0-.9-.1-1.6-.1-1.6 0-2.7 1-2.7 2.8v1.5H6.2v2.1H8V15h2.2z"
      fill="currentColor"
    />
  ),
  tiktok: (
    <path
      d="M11.2 3h1.9c.1.9.7 1.7 1.6 2v1.9c-.9 0-1.7-.3-2.4-.7v4.3a3.6 3.6 0 11-3.6-3.6c.2 0 .4 0 .6.1V9c-.2-.1-.4-.1-.6-.1a1.7 1.7 0 100 3.4c.9 0 1.7-.7 1.7-1.7V3z"
      fill="currentColor"
    />
  ),
  story: (
    <path
      d="M5 3h8a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1zm1 3h6M6 8.5h6M6 11h4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  ),
  play: (
    <path
      d="M6 4.3a1 1 0 011.5-.9l6 4.6a1 1 0 010 1.6l-6 4.6a1 1 0 01-1.5-.9V4.3z"
      fill="currentColor"
    />
  ),
  doc: (
    <path
      d="M5.5 2.5h5l3 3v9a1 1 0 01-1 1h-7a1 1 0 01-1-1v-11a1 1 0 011-1zM10 2.5v3h3M6.5 9h5M6.5 11.5h5"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      fill="none"
    />
  ),
  mail: (
    <path
      d="M3 5.5a1 1 0 011-1h10a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7zm1 0l6 4.5 6-4.5"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  youtube: (
    <path
      d="M15.8 5.8a1.8 1.8 0 00-1.3-1.3C13.3 4.2 9 4.2 9 4.2s-4.3 0-5.5.3a1.8 1.8 0 00-1.3 1.3A19 19 0 002 9a19 19 0 00.2 3.2 1.8 1.8 0 001.3 1.3C4.7 13.8 9 13.8 9 13.8s4.3 0 5.5-.3a1.8 1.8 0 001.3-1.3A19 19 0 0016 9a19 19 0 00-.2-3.2zM7.5 11.3V6.7L11.3 9l-3.8 2.3z"
      fill="currentColor"
    />
  ),
  linkedin: (
    <path
      d="M4.9 6.5H2.9V15h2v-8.5zM3.9 5.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM6.7 6.5h1.9v1.2h0a2.1 2.1 0 011.9-1.4c2 0 2.4 1.4 2.4 3.1V15h-2v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1.1-1.6 2.1V15h-2V6.5z"
      fill="currentColor"
    />
  ),
  bulb: (
    <path
      d="M9 2.5a4.5 4.5 0 00-2.5 8.2c.4.3.5.6.5 1v.3h4v-.3c0-.4.1-.7.5-1A4.5 4.5 0 009 2.5zM7.3 14h3.4M7.8 15.5h2.4"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      fill="none"
    />
  ),
}

export default function PlatformIcon({ icon, className }) {
  const path = ICONS[icon] || ICONS.doc
  return (
    <svg viewBox="0 0 18 18" className={className} width="12" height="12">
      {path}
    </svg>
  )
}
