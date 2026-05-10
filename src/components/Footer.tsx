import Link from 'next/link'
import { Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="container-wide py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-md border border-line-strong bg-card-solid flex items-center justify-center font-mono text-[11px] font-bold text-foreground/90">
                DJ
              </div>
              <span className="font-semibold text-foreground text-[15px]">Dev Junior</span>
            </div>
            <p className="text-sm leading-relaxed text-muted max-w-sm">
              Notas técnicas e aprendizados de um desenvolvedor júnior em formação.
            </p>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Navegar</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Início', href: '/' },
                { label: 'Artigos', href: '/articles' },
                { label: 'Sobre', href: '/about' },
                { label: 'Painel', href: '/painel' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-4">Categorias</h3>
            <ul className="space-y-2 text-sm">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'CSS', 'Database'].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/articles?category=${encodeURIComponent(cat)}`}
                    className="text-muted hover:text-foreground transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-line mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-subtle">
          <p>© {new Date().getFullYear()} Guilherme Diniz. Todos os direitos reservados.</p>
          <a
            href="https://github.com/DinizGui"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github size={13} /> github.com/DinizGui
          </a>
        </div>
      </div>
    </footer>
  )
}
