'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserMenu } from '@/components/UserMenu'
import type { SessionPayload } from '@/lib/auth'

const navLinks = [
  { label: 'Início', href: '/' },
  { label: 'Artigos', href: '/articles' },
  { label: 'Sobre', href: '/about' },
]

export function HeaderNav({ user }: { user: SessionPayload | null }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const navWithPainel = user?.isAdmin ? [...navLinks, { label: 'Painel', href: '/painel' }] : navLinks

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-colors duration-200 border-b',
        scrolled
          ? 'border-zinc-800 bg-zinc-950/85 backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md border border-zinc-700 bg-zinc-900 flex items-center justify-center font-mono text-[11px] font-bold text-zinc-200 group-hover:border-zinc-500 transition-colors">
              DJ
            </div>
            <span className="font-semibold text-zinc-100 text-[15px] tracking-tight group-hover:text-white transition-colors">
              Dev Junior
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navWithPainel.map((link) => {
              const active =
                link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm transition-colors',
                    active
                      ? 'text-white bg-zinc-900'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <UserMenu user={user} />
            <button
              aria-label="Menu"
              className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 pt-1 flex flex-col gap-0.5 border-t border-zinc-800">
            {navWithPainel.map((link) => {
              const active =
                link.href === '/' ? pathname === '/' : pathname?.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2.5 rounded-md text-sm transition-colors',
                    active
                      ? 'bg-zinc-900 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
            {!user && (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="text-sm text-zinc-200 border border-zinc-800 px-3 py-2.5 rounded-md text-center hover:border-zinc-600"
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium text-zinc-950 bg-zinc-100 px-3 py-2.5 rounded-md text-center"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
