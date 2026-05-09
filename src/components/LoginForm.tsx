'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2, LogIn } from 'lucide-react'
import { loginAction, type LoginState } from '@/app/login/actions'

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(loginAction, null)

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next ?? '/'} />

      <div>
        <label htmlFor="email" className="label">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoFocus
          autoComplete="email"
          className="input-field"
          placeholder="voce@exemplo.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="label">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="input-field"
          placeholder="••••••••"
        />
      </div>

      {state && !state.ok && (
        <div className="text-sm text-red-300 border border-red-900/60 bg-red-950/40 rounded-md px-3 py-2 animate-fade-in">
          {state.error}
        </div>
      )}

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="btn-primary w-full justify-center">
      {pending ? <Loader2 size={14} className="animate-spin" /> : <LogIn size={14} />}
      {pending ? 'Entrando…' : 'Entrar'}
    </button>
  )
}
