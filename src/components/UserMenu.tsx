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
          className="text-sm text-zinc-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-zinc-900 transition-colors"
        >
          Entrar
        </Link>
        <Link
          href="/register"
          className="text-sm font-medium text-zinc-950 bg-zinc-100 hover:bg-white px-3 py-1.5 rounded-md transition-colors"
        >
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
        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-900 transition-colors"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="w-7 h-7 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-xs font-semibold text-zinc-200">
          {initial}
        </div>
        <span className="hidden sm:inline text-sm text-zinc-300">{user.name}</span>
        {user.isAdmin && (
          <span className="hidden sm:inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-zinc-300 border border-zinc-700 px-1.5 py-0.5 rounded">
            admin
          </span>
        )}
        <ChevronDown size={13} className="text-zinc-500" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-zinc-800 bg-zinc-950 shadow-xl overflow-hidden animate-fade-in z-50">
          <div className="px-3 py-2.5 border-b border-zinc-800">
            <p className="text-sm font-medium text-zinc-100 leading-tight">{user.name}</p>
            <p className="text-xs text-zinc-500 truncate mt-0.5">{user.email}</p>
          </div>
          <div className="py-1">
            {user.isAdmin && (
              <Link
                href="/painel"
                className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-900 hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                <LayoutDashboard size={14} />
                Painel
                <Shield size={11} className="ml-auto text-zinc-500" />
              </Link>
            )}
            <Link
              href="/about"
              className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              <UserIcon size={14} />
              Sobre o blog
            </Link>
          </div>
          <form action={logoutAction} className="border-t border-zinc-800">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white transition-colors"
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
