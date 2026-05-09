import 'server-only'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'devjunior_session'
const SESSION_DAYS = 7
export const SESSION_COOKIE_NAME = COOKIE_NAME

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) {
    throw new Error(
      'AUTH_SECRET ausente ou < 32 chars. Defina no .env (gere com node -e "..."',
    )
  }
  return new TextEncoder().encode(secret)
}

export interface SessionUser {
  id: string
  email: string
  name: string
  isAdmin: boolean
}

export interface SessionPayload extends SessionUser {
  iat?: number
  exp?: number
}

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(getSecret())

  const jar = await cookies()
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
}

export async function destroySession() {
  const jar = await cookies()
  jar.delete(COOKIE_NAME)
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies()
  const token = jar.get(COOKIE_NAME)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecret())
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function requireAdmin(): Promise<SessionPayload> {
  const session = await getSession()
  if (!session || !session.isAdmin) {
    throw new Error('Acesso restrito ao administrador')
  }
  return session
}

/** Lista de e-mails que viram admin automático (definida em ADMIN_EMAILS no .env) */
export function adminEmailsFromEnv(): string[] {
  return (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email: string): boolean {
  return adminEmailsFromEnv().includes(email.toLowerCase())
}
