import { Shield } from 'lucide-react'
import { getSession } from '@/lib/auth'

export async function PainelHeader() {
  const session = await getSession()
  return (
    <div className="flex items-center justify-between mb-8 pb-5 border-b border-line animate-fade-in">
      <div className="flex items-center gap-2 text-xs text-subtle">
        <Shield size={13} />
        <span>
          Logado como{' '}
          <strong className="text-foreground font-medium">{session?.name ?? 'Admin'}</strong>
        </span>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/80 border border-line-strong px-1.5 py-0.5 rounded">
        admin
      </span>
    </div>
  )
}
