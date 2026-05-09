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
        <div className="inline-flex w-10 h-10 rounded-md bg-red-950/40 border border-red-900/60 items-center justify-center mb-4">
          <AlertTriangle className="text-red-300" size={18} />
        </div>
        <h1 className="text-xl font-semibold text-white mb-2 tracking-tight">Algo deu errado</h1>
        <p className="text-sm text-zinc-400 mb-5 leading-relaxed">
          Em produção, o Next esconde a mensagem por segurança. O ID abaixo aparece nos logs do
          servidor (Vercel → Logs) — use ele pra encontrar o erro real.
        </p>

        {error.digest && (
          <div className="mb-3">
            <p className="eyebrow mb-1.5">Error digest</p>
            <code className="block bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-xs text-zinc-200 font-mono break-all">
              {error.digest}
            </code>
          </div>
        )}

        <details className="mb-6 group">
          <summary className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer select-none">
            Causas comuns →
          </summary>
          <ul className="mt-3 space-y-1.5 text-xs text-zinc-400 list-disc pl-5">
            <li>
              Variáveis de ambiente faltando em produção (<code className="text-zinc-200">AUTH_SECRET</code>,{' '}
              <code className="text-zinc-200">DATABASE_URL</code>,{' '}
              <code className="text-zinc-200">ADMIN_EMAILS</code>)
            </li>
            <li>Adicionou env nova mas não fez redeploy</li>
            <li>
              Migrations não rodadas no banco de prod —{' '}
              <code className="text-zinc-200">npx prisma migrate deploy</code>
            </li>
            <li>
              <code className="text-zinc-200">AUTH_SECRET</code> com menos de 32 caracteres
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
