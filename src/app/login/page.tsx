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
    <div className="container-blog pt-16 pb-20">
      <div className="max-w-sm mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors mb-10 group animate-fade-in"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
          Voltar pro blog
        </Link>

        <div className="animate-fade-in-up">
          <div className="inline-flex w-10 h-10 rounded-md border border-zinc-800 bg-zinc-900 items-center justify-center mb-5">
            <Lock size={16} className="text-zinc-400" />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">Entrar</h1>
          <p className="text-sm text-zinc-400 mb-8">
            Acesse com sua conta para continuar.
          </p>

          <LoginForm next={next} />

          <p className="mt-6 text-sm text-zinc-500">
            Não tem conta?{' '}
            <Link href="/register" className="text-zinc-200 hover:text-white underline underline-offset-4 decoration-zinc-700">
              Crie uma agora
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
