import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="container-blog py-32 flex items-center justify-center">
      <div className="flex items-center gap-3 text-muted">
        <Loader2 className="animate-spin" size={20} />
        <span className="text-sm">Carregando…</span>
      </div>
    </div>
  )
}
