// Visual styling per platform value (content_items.platform).
// If your real platform values differ from these, add or rename entries here —
// unmatched values fall back to DEFAULT_PLATFORM_STYLE.

export const PLATFORM_STYLES = {
  Instagram: { label: 'Instagram', bg: '#FBD9E4', text: '#9C2F53', icon: 'camera' },
  Facebook: { label: 'Facebook', bg: '#D6E4F2', text: '#1F4E79', icon: 'facebook' },
  TikTok: { label: 'TikTok', bg: '#1C1C1A', text: '#FFFFFF', icon: 'tiktok' },
  Story: { label: 'Story', bg: '#FCEFC7', text: '#8A6D1D', icon: 'story' },
  Reel: { label: 'Reel', bg: '#D3F1E8', text: '#1F6E56', icon: 'play' },
  'Blog/Website': { label: 'Blog / Website', bg: '#D9ECF7', text: '#1D5A78', icon: 'doc' },
  Email: { label: 'Email', bg: '#E7DFF5', text: '#5A3E8C', icon: 'mail' },
  'Idea/Planning': { label: 'Idea / Planning', bg: '#E7E5E0', text: '#57534E', icon: 'bulb' },
}

export const DEFAULT_PLATFORM_STYLE = {
  label: 'Content',
  bg: '#E7E5E0',
  text: '#57534E',
  icon: 'doc',
}

export function getPlatformStyle(platform) {
  return PLATFORM_STYLES[platform] || DEFAULT_PLATFORM_STYLE
}

export const PLATFORM_LEGEND = Object.values(PLATFORM_STYLES)
