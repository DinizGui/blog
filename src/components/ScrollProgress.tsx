'use client'

import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      if (total <= 0) {
        setProgress(0)
        return
      }
      const pct = (window.scrollY / total) * 100
      setProgress(Math.max(0, Math.min(100, pct)))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[2px] pointer-events-none"
      aria-hidden
    >
      <div
        className="h-full origin-left transition-transform duration-100"
        style={{
          background: 'var(--accent)',
          transform: `scaleX(${progress / 100})`,
          width: '100%',
        }}
      />
    </div>
  )
}
