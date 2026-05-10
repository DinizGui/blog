import Link from 'next/link'
import { ArrowLeft, Lock } from 'lucide-react'
import { LoginForm } from '@/components/LoginForm'

interface Props {
  searchParams: Promise<{ next?: string }>
}

export const metadata = {
  title: 'Entrar',
  robots: { index: false, follow: false },
}

export default async function LoginPage({ searchParams }: Props) {
  const { next } = await searchParams

  return (
    <div className="auth-shell px-4 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-subtle hover:text-foreground transition-colors mb-8 group animate-fade-in-down"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Voltar pro blog
        </Link>

        <div className="auth-card animate-scale-in">
          <div className="auth-icon mb-5 animate-fade-in-up">
            <Lock size={17} />
          </div>

          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-2 animate-fade-in-up delay-100">
            Bem-vindo de volta
          </h1>
          <p className="text-sm text-muted mb-7 animate-fade-in-up delay-200">
            Entre na sua conta pra continuar.
          </p>

          <div className="animate-fade-in-up delay-300">
            <LoginForm next={next} />
          </div>

          <p className="mt-6 text-sm text-subtle animate-fade-in-up delay-400">
            Não tem conta?{' '}
            <Link
              href="/register"
              className="text-foreground hover:text-accent underline underline-offset-4 decoration-line-strong hover:decoration-accent transition-colors"
            >
              Crie uma agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
