// Visual styling per platform value (content_items.platform).
// If your real platform values differ from these, add or rename entries here —
// unmatched values fall back to DEFAULT_PLATFORM_STYLE.

export const PLATFORM_STYLES = {
  Instagram: { label: 'Instagram', bg: '#FBD9E4', text: '#9C2F53', accent: '#E0357F', icon: 'camera' },
  Facebook: { label: 'Facebook', bg: '#D6E4F2', text: '#1F4E79', accent: '#1877F2', icon: 'facebook' },
  TikTok: { label: 'TikTok', bg: '#1C1C1A', text: '#FFFFFF', accent: '#1C1C1A', icon: 'tiktok' },
  YouTube: { label: 'YouTube', bg: '#FFDCC4', text: '#B3401A', accent: '#FF0000', icon: 'youtube' },
  LinkedIn: { label: 'LinkedIn', bg: '#D7ECF2', text: '#1B6E86', accent: '#0A66C2', icon: 'linkedin' },
  'Blog/Website': { label: 'Blog / Website', bg: '#D9ECF7', text: '#1D5A78', accent: '#1D9BD8', icon: 'doc' },
  Email: { label: 'Email', bg: '#E7DFF5', text: '#5A3E8C', accent: '#8B5CF6', icon: 'mail' },
  'Idea/Planning': { label: 'Idea / Planning', bg: '#E7E5E0', text: '#57534E', accent: '#9CA3AF', icon: 'bulb' },
}

export const DEFAULT_PLATFORM_STYLE = {
  label: 'Content',
  bg: '#E7E5E0',
  text: '#57534E',
  accent: '#9CA3AF',
  icon: 'doc',
}

export function getPlatformStyle(platform) {
  return PLATFORM_STYLES[platform] || DEFAULT_PLATFORM_STYLE
}

export const PLATFORM_LEGEND = Object.values(PLATFORM_STYLES)
