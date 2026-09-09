import { PLATFORM_LEGEND } from '../lib/platforms.js'

export default function PlatformLegend() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 px-1">
      {PLATFORM_LEGEND.map((style) => (
        <div key={style.label} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: style.bg, border: `1px solid ${style.text}33` }}
          />
          <span className="text-xs text-ink-soft">{style.label}</span>
        </div>
      ))}
    </div>
  )
}
