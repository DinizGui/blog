'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createSession, destroySession } from '@/lib/auth'
import { findUserByEmail, verifyPassword, syncAdminFromEnv } from '@/lib/users'

const LoginSchema = z.object({
  email: z.string().email('E-mail inválido').max(160),
  password: z.string().min(1, 'Senha obrigatória'),
  next: z.string().optional().default('/'),
})

export type LoginState = { ok: false; error: string } | null

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    next: formData.get('next') ?? '/',
  })

  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? 'Dados inválidos' }
  }

  const user = await findUserByEmail(parsed.data.email)
  // Pequeno delay constante pra dificultar enumeração de e-mails
  await new Promise((r) => setTimeout(r, 250))

  if (!user) {
    return { ok: false, error: 'E-mail ou senha incorretos' }
  }

  const valid = await verifyPassword(parsed.data.password, user.passwordHash)
  if (!valid) {
    return { ok: false, error: 'E-mail ou senha incorretos' }
  }

  const isAdmin = await syncAdminFromEnv(user.id, user.email, user.isAdmin)

  await createSession({
    id: user.id,
    email: user.email,
    name: user.name,
    isAdmin,
  })

  const next = parsed.data.next.startsWith('/') ? parsed.data.next : '/'
  redirect(isAdmin && next === '/' ? '/painel' : next)
}

export async function logoutAction() {
  await destroySession()
  redirect('/')
}
