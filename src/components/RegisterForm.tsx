'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { AlertCircle, Eye, EyeOff, Loader2, UserPlus } from 'lucide-react'
import { registerAction, type RegisterState } from '@/app/register/actions'

export function RegisterForm() {
  const [state, formAction] = useActionState<RegisterState, FormData>(registerAction, null)
  const [showPwd, setShowPwd] = useState(false)

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="name" className="label">Nome</label>
        <input
          id="name"
          name="name"
          required
          minLength={2}
          maxLength={120}
          autoFocus
          autoComplete="name"
          className="input-field"
          placeholder="Como você quer ser chamado"
        />
      </div>

      <div>
        <label htmlFor="email" className="label">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
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
            minLength={8}
            autoComplete="new-password"
            className="input-field pr-10"
            placeholder="Mínimo 8 caracteres"
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
      {pending ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
      {pending ? 'Criando conta…' : 'Criar conta'}
    </button>
  )
}
