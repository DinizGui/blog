'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { AlertCircle, Eye, EyeOff, Loader2, LogIn } from 'lucide-react'
import { loginAction, type LoginState } from '@/app/login/actions'

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(loginAction, null)
  const [showPwd, setShowPwd] = useState(false)

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
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPwd ? 'text' : 'password'}
            required
            autoComplete="current-password"
            className="input-field pr-10"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPwd((s) => !s)}
            tabIndex={-1}
            aria-label={showPwd ? 'Esconder senha' : 'Mostrar senha'}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded text-subtle hover:text-foreground transition-colors"
          >
            {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {state && !state.ok && (
        <div
          key={state.error}
          role="alert"
          className="flex items-start gap-2 text-sm alert-danger px-3 py-2.5 animate-shake"
        >
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          <span>{state.error}</span>
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
