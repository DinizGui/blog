export const SITE = {
  name: 'Dev Junior',
  title: 'Dev Junior — diário de bordo',
  description:
    'Notas técnicas e aprendizados de um desenvolvedor júnior. Por Guilherme Diniz.',
  twitterHandle: '@DinizGui',
  locale: 'pt_BR',
  author: 'Guilherme Diniz',
} as const

export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  const vercel = process.env.VERCEL_URL
  if (vercel) return `https://${vercel.replace(/\/$/, '')}`
  return 'http://localhost:3000'
}

export function absoluteUrl(path = '/'): string {
  const base = siteUrl()
  if (!path) return base
  if (path.startsWith('http')) return path
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
