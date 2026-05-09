'use client'

import { useTransition } from 'react'
import { Loader2, Trash2 } from 'lucide-react'
import { deletePostAction } from '@/app/painel/actions'

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition()

  function onClick() {
    if (!confirm(`Apagar "${title}"? A ação é irreversível.`)) return
    startTransition(async () => {
      await deletePostAction(id)
    })
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="btn-danger"
      aria-label={`Apagar ${title}`}
    >
      {pending ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
      {pending ? 'Apagando…' : 'Apagar'}
    </button>
  )
}
