import 'server-only'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { isAdminEmail } from '@/lib/auth'

const ROUNDS = 10

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS)
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email: email.toLowerCase() } })
}

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export async function registerUser(input: RegisterInput) {
  const email = input.email.toLowerCase().trim()
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    throw new Error('Já existe uma conta com esse e-mail')
  }
  const passwordHash = await hashPassword(input.password)
  const user = await prisma.user.create({
    data: {
      email,
      name: input.name.trim(),
      passwordHash,
      isAdmin: isAdminEmail(email),
    },
  })
  return user
}

/** Promove o user a admin se o email estiver em ADMIN_EMAILS — chamado a cada login */
export async function syncAdminFromEnv(userId: string, email: string, currentIsAdmin: boolean) {
  const shouldBeAdmin = isAdminEmail(email)
  if (shouldBeAdmin && !currentIsAdmin) {
    await prisma.user.update({ where: { id: userId }, data: { isAdmin: true } })
    return true
  }
  return currentIsAdmin
}
