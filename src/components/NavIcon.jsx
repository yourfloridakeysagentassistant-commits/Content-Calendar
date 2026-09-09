const ICONS = {
  calendar: (
    <path
      d="M5 3v2M13 3v2M3 7h12M4 4h10a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  idea: (
    <path
      d="M9 2.5a4.5 4.5 0 00-2.5 8.2c.4.3.5.6.5 1v.3h4v-.3c0-.4.1-.7.5-1A4.5 4.5 0 009 2.5zM7.3 14h3.4M7.8 15.5h2.4"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      fill="none"
    />
  ),
  library: (
    <path
      d="M3.5 3.5h4v13h-4zM10.5 3.5h4v13h-4z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  review: (
    <path
      d="M15 6L8 14l-4-4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  analytics: (
    <path
      d="M3.5 14.5v-4M9 14.5v-8M14.5 14.5v-6"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      fill="none"
    />
  ),
  brand: (
    <path
      d="M3.5 4.5h11a1 1 0 011 1v8a1 1 0 01-1 1h-11a1 1 0 01-1-1v-8a1 1 0 011-1z M3 13l3.5-4 2.5 2.8L11.5 8l3.5 5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinejoin="round"
      strokeLinecap="round"
      fill="none"
    />
  ),
  settings: (
    <path
      d="M9 11.3a2.3 2.3 0 100-4.6 2.3 2.3 0 000 4.6z M14.7 9c0 .3 0 .6-.1.9l1.4 1.1-1.4 2.4-1.6-.6c-.4.4-.9.6-1.4.8l-.2 1.7H8.1l-.2-1.7c-.5-.2-1-.4-1.4-.8l-1.6.6-1.4-2.4 1.4-1.1a4.2 4.2 0 010-1.8L3.5 6.9l1.4-2.4 1.6.6c.4-.4.9-.6 1.4-.8l.2-1.7h2.9l.2 1.7c.5.2 1 .4 1.4.8l1.6-.6 1.4 2.4-1.4 1.1c.1.3.1.6.1.9z"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      fill="none"
    />
  ),
}

export default function NavIcon({ icon, className }) {
  return (
    <svg viewBox="0 0 18 18" className={className} width="16" height="16">
      {ICONS[icon]}
    </svg>
  )
}
