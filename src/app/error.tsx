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
    <div className="container-blog py-24">
      <div className="card-surface p-10 max-w-2xl mx-auto text-center">
        <div className="inline-flex w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-400/30 items-center justify-center mb-5">
          <AlertTriangle className="text-rose-300" size={22} />
        </div>
        <h1
          className="text-2xl font-extrabold text-white mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Algo quebrou aqui
        </h1>
        <p className="text-slate-400 mb-6">
          Geralmente é o banco que ainda não tá conectado. Confere a{' '}
          <code className="text-cyan-300">DATABASE_URL</code> no <code className="text-cyan-300">.env</code> e
          se rodou <code className="text-cyan-300">npx prisma migrate dev</code>.
        </p>
        <div className="text-left bg-black/40 border border-white/10 rounded-xl p-4 mb-6 text-xs text-rose-200 font-mono break-all">
          {error.message}
        </div>
        <button onClick={reset} className="btn-primary inline-flex">
          <RefreshCw size={15} /> Tentar de novo
        </button>
      </div>
    </div>
  )
}
