'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container-blog py-20">
      <div className="card-surface p-8 max-w-xl mx-auto">
        <div className="inline-flex w-10 h-10 rounded-md alert-danger items-center justify-center mb-4">
          <AlertTriangle size={18} />
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-2 tracking-tight">Algo deu errado</h1>
        <p className="text-sm text-muted mb-5 leading-relaxed">
          Em produção, o Next esconde a mensagem por segurança. O ID abaixo aparece nos logs do
          servidor (Vercel → Logs) — use ele pra encontrar o erro real.
        </p>

        {error.digest && (
          <div className="mb-3">
            <p className="eyebrow mb-1.5">Error digest</p>
            <code
              className="block rounded-md px-3 py-2 text-xs text-foreground font-mono break-all border border-line"
              style={{ background: 'var(--codeblock-bg)', color: 'var(--codeblock-fg)' }}
            >
              {error.digest}
            </code>
          </div>
        )}

        <details className="mb-6 group">
          <summary className="text-xs text-subtle hover:text-foreground cursor-pointer select-none">
            Causas comuns →
          </summary>
          <ul className="mt-3 space-y-1.5 text-xs text-muted list-disc pl-5">
            <li>
              Variáveis de ambiente faltando em produção (<code className="text-foreground">AUTH_SECRET</code>,{' '}
              <code className="text-foreground">DATABASE_URL</code>,{' '}
              <code className="text-foreground">ADMIN_EMAILS</code>)
            </li>
            <li>Adicionou env nova mas não fez redeploy</li>
            <li>
              Migrations não rodadas no banco de prod —{' '}
              <code className="text-foreground">npx prisma migrate deploy</code>
            </li>
            <li>
              <code className="text-foreground">AUTH_SECRET</code> com menos de 32 caracteres
            </li>
          </ul>
        </details>

        <button onClick={reset} className="btn-primary">
          <RefreshCw size={13} /> Tentar de novo
        </button>
      </div>
    </div>
  )
}
