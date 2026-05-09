import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function pickCoverByCategory(category: string, seed: string): string {
  const map: Record<string, string> = {
    React: 'photo-1633356122544-f134324a6cee',
    'Next.js': 'photo-1633356122544-f134324a6cee',
    TypeScript: 'photo-1555066931-4365d14bab8c',
    'Node.js': 'photo-1558494949-ef010cbdcc31',
    CSS: 'photo-1507721999472-8ed4421c4af2',
    Database: 'photo-1544383835-bda2bc66a55d',
    DevOps: 'photo-1618401471353-b98afee0b2eb',
    Aprendizado: 'photo-1456513080510-7bf3a84b82f8',
    Anotação: 'photo-1456513080510-7bf3a84b82f8',
  }
  const id = map[category] ?? 'photo-1517694712202-14dd9538aa97'
  return `https://images.unsplash.com/${id}?w=1200&q=80&sig=${encodeURIComponent(seed)}`
}

export const CATEGORY_OPTIONS = [
  'Aprendizado',
  'Anotação',
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'CSS',
  'Database',
  'DevOps',
] as const

export function categoryLabel(cat: string): string {
  return cat
}
