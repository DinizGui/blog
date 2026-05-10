'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const label = theme === 'dark' ? 'Mudar pro modo claro' : 'Mudar pro modo escuro'
  const Icon = theme === 'dark' ? Sun : Moon

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={
        compact
          ? 'btn-icon w-8 h-8'
          : 'btn-icon'
      }
    >
      {mounted ? (
        <Icon size={15} className="transition-transform duration-300" />
      ) : (
        <Moon size={15} className="opacity-0" />
      )}
    </button>
  )
}
