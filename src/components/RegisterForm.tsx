'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2, UserPlus } from 'lucide-react'
import { registerAction, type RegisterState } from '@/app/register/actions'

export function RegisterForm() {
  const [state, formAction] = useActionState<RegisterState, FormData>(registerAction, null)

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
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="input-field"
          placeholder="Mínimo 8 caracteres"
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
      {pending ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
      {pending ? 'Criando conta…' : 'Criar conta'}
    </button>
  )
}
