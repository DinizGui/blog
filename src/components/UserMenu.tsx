'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, LayoutDashboard, LogOut, Shield, User as UserIcon } from 'lucide-react'
import { logoutAction } from '@/app/login/actions'
import type { SessionPayload } from '@/lib/auth'

export function UserMenu({ user }: { user: SessionPayload | null }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  if (!user) {
    return (
      <div className="hidden sm:flex items-center gap-1">
        <Link
          href="/login"
          className="text-sm text-muted hover:text-foreground px-3 py-1.5 rounded-md hover:bg-card transition-colors"
        >
          Entrar
        </Link>
        <Link href="/register" className="btn-primary text-sm">
          Cadastrar
        </Link>
      </div>
    )
  }

  const initial = user.name?.charAt(0).toUpperCase() ?? user.email.charAt(0).toUpperCase()

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-card transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="w-7 h-7 rounded-full border border-line-strong bg-card-solid flex items-center justify-center text-xs font-semibold text-foreground">
          {initial}
        </div>
        <span className="hidden sm:inline text-sm text-foreground">{user.name}</span>
        {user.isAdmin && (
          <span className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-foreground/80 border border-line-strong px-1.5 py-0.5 rounded">
            admin
          </span>
        )}
        <ChevronDown size={13} className="text-subtle" />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-56 rounded-lg border border-line bg-elevated overflow-hidden animate-fade-in z-50"
          style={{ boxShadow: 'var(--shadow-popover)' }}
        >
          <div className="px-3 py-2.5 border-b border-line">
            <p className="text-sm font-medium text-foreground leading-tight">{user.name}</p>
            <p className="text-xs text-subtle truncate mt-0.5">{user.email}</p>
          </div>
          <div className="py-1">
            {user.isAdmin && (
              <Link
                href="/painel"
                className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-card transition-colors"
                onClick={() => setOpen(false)}
              >
                <LayoutDashboard size={14} />
                Painel
                <Shield size={11} className="ml-auto text-subtle" />
              </Link>
            )}
            <Link
              href="/about"
              className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-card transition-colors"
              onClick={() => setOpen(false)}
            >
              <UserIcon size={14} />
              Sobre o blog
            </Link>
          </div>
          <form action={logoutAction} className="border-t border-line">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-card transition-colors"
            >
              <LogOut size={14} />
              Sair
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
