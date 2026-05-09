'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createSession } from '@/lib/auth'
import { registerUser } from '@/lib/users'

const RegisterSchema = z.object({
  name: z.string().min(2, 'Nome muito curto').max(120),
  email: z.string().email('E-mail inválido').max(160),
  password: z.string().min(8, 'Senha precisa ter pelo menos 8 caracteres').max(128),
})

export type RegisterState = { ok: false; error: string } | null

export async function registerAction(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const parsed = RegisterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? 'Dados inválidos' }
  }

  try {
    const user = await registerUser(parsed.data)
    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    })
    redirect(user.isAdmin ? '/painel' : '/')
  } catch (err) {
    if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) throw err
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Erro ao criar conta',
    }
  }
}
