'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'
import { cn } from '@/lib/utils'
import { slugify } from '@/lib/utils'

interface Heading {
  id: string
  text: string
  level: 2 | 3
}

function extractHeadings(content: string): Heading[] {
  const lines = content.split('\n')
  const headings: Heading[] = []
  let inFence = false
  for (const line of lines) {
    if (line.startsWith('```')) {
      inFence = !inFence
      continue
    }
    if (inFence) continue
    if (line.startsWith('## ')) {
      const text = line.slice(3).trim()
      headings.push({ id: slugify(text), text, level: 2 })
    } else if (line.startsWith('### ')) {
      const text = line.slice(4).trim()
      headings.push({ id: slugify(text), text, level: 3 })
    }
  }
  return headings
}

export function PostTOC({ content }: { content: string }) {
  const headings = extractHeadings(content)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: [0, 1] },
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav className="hidden lg:block">
      <div className="flex items-center gap-2 mb-3">
        <List size={12} className="text-subtle" />
        <h3 className="eyebrow">Neste post</h3>
      </div>
      <ul className="space-y-1.5 border-l border-line">
        {headings.map((h) => {
          const isActive = active === h.id
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={cn(
                  'block text-sm leading-snug pl-4 -ml-px py-1 border-l-2 transition-colors',
                  h.level === 3 && 'pl-7 text-[13px]',
                  isActive
                    ? 'border-accent text-foreground'
                    : 'border-transparent text-subtle hover:text-foreground',
                )}
              >
                {h.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
