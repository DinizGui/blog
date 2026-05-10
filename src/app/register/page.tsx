import Link from 'next/link'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { RegisterForm } from '@/components/RegisterForm'

export const metadata = {
  title: 'Criar conta',
  robots: { index: false, follow: false },
}

export default function RegisterPage() {
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
            <UserPlus size={17} />
          </div>

          <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-2 animate-fade-in-up delay-100">
            Criar conta
          </h1>
          <p className="text-sm text-muted mb-7 animate-fade-in-up delay-200">
            Cadastro aberto. Leva 30 segundos.
          </p>

          <div className="animate-fade-in-up delay-300">
            <RegisterForm />
          </div>

          <p className="mt-6 text-sm text-subtle animate-fade-in-up delay-400">
            Já tem conta?{' '}
            <Link
              href="/login"
              className="text-foreground hover:text-accent underline underline-offset-4 decoration-line-strong hover:decoration-accent transition-colors"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
