'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserMenu } from '@/components/UserMenu'
import { ThemeToggle } from '@/components/ThemeToggle'
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
        'sticky top-0 z-40 transition-all duration-200 border-b',
        scrolled
          ? 'border-line backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
      style={scrolled ? { backgroundColor: 'var(--header-bg-scrolled)' } : undefined}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md border border-line-strong bg-card-solid flex items-center justify-center font-mono text-[11px] font-bold text-foreground/90 group-hover:border-accent/60 transition-colors">
              DJ
            </div>
            <span className="font-semibold text-foreground text-[15px] tracking-tight transition-colors">
              Dev Junior
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
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
                      ? 'text-foreground bg-card'
                      : 'text-muted hover:text-foreground hover:bg-card/60',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <UserMenu user={user} />
            <button
              aria-label="Menu"
              className="md:hidden btn-icon"
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="md:hidden pb-4 pt-1 flex flex-col gap-0.5 border-t border-line animate-fade-in-down">
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
                      ? 'bg-card text-foreground'
                      : 'text-muted hover:text-foreground hover:bg-card/60',
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
                  className="text-sm text-foreground border border-line px-3 py-2.5 rounded-md text-center hover:border-line-strong transition-colors"
                >
                  Entrar
                </Link>
                <Link href="/register" className="btn-primary justify-center text-sm">
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
