import { Shield } from 'lucide-react'
import { getSession } from '@/lib/auth'

export async function PainelHeader() {
  const session = await getSession()
  return (
    <div className="flex items-center justify-between mb-8 pb-5 border-b border-zinc-800 animate-fade-in">
      <div className="flex items-center gap-2 text-xs text-zinc-500">
        <Shield size={13} />
        <span>
          Logado como{' '}
          <strong className="text-zinc-300 font-medium">{session?.name ?? 'Admin'}</strong>
        </span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 border border-zinc-700 px-1.5 py-0.5 rounded">
        admin
      </span>
    </div>
  )
}
