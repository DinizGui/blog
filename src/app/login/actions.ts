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

  let isAdmin = false
  let safeNext = '/'

  try {
    const user = await findUserByEmail(parsed.data.email)
    await new Promise((r) => setTimeout(r, 250))

    if (!user) {
      return { ok: false, error: 'E-mail ou senha incorretos' }
    }

    const valid = await verifyPassword(parsed.data.password, user.passwordHash)
    if (!valid) {
      return { ok: false, error: 'E-mail ou senha incorretos' }
    }

    isAdmin = await syncAdminFromEnv(user.id, user.email, user.isAdmin)

    await createSession({
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin,
    })

    safeNext = parsed.data.next.startsWith('/') ? parsed.data.next : '/'
  } catch (err) {
    if (err instanceof Error && err.message.includes('NEXT_REDIRECT')) throw err
    console.error('[loginAction]', err)
    const msg =
      err instanceof Error && err.message.startsWith('AUTH_SECRET')
        ? 'Servidor mal configurado. Avise o admin (AUTH_SECRET).'
        : 'Não foi possível entrar agora. Tente novamente em instantes.'
    return { ok: false, error: msg }
  }

  redirect(isAdmin && safeNext === '/' ? '/painel' : safeNext)
}

export async function logoutAction() {
  await destroySession()
  redirect('/')
}
