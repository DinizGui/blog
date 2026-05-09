import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'devjunior_session'

interface SessionPayload {
  isAdmin?: boolean
  email?: string
}

async function readSession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null
  const secret = process.env.AUTH_SECRET
  if (!secret || secret.length < 32) return null
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
    return payload as unknown as SessionPayload
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get(COOKIE_NAME)?.value
  const session = await readSession(token)

  // /painel/* → exige admin
  if (pathname.startsWith('/painel')) {
    if (!session) {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }
    if (!session.isAdmin) {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      url.searchParams.set('error', 'admin-only')
      return NextResponse.redirect(url)
    }
  }

  // /login e /register → se já logado, vai pro início (ou painel se admin)
  if ((pathname === '/login' || pathname === '/register') && session) {
    const url = req.nextUrl.clone()
    url.pathname = session.isAdmin ? '/painel' : '/'
    url.search = ''
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/painel/:path*', '/login', '/register'],
}
