import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PostForm } from '@/components/PostForm'
import { createPostAction } from '@/app/painel/actions'
import { PainelHeader } from '@/components/PainelHeader'

export const metadata = { title: 'Novo post' }

export default function NovoPostPage() {
  return (
    <div className="container-wide pt-10 pb-12">
      <PainelHeader />

      <Link
        href="/painel"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200 transition-colors mb-6 group animate-fade-in"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Voltar pro painel
      </Link>

      <header className="mb-8 animate-fade-in-up">
        <p className="eyebrow mb-2">Criar publicação</p>
        <h1 className="text-3xl font-semibold text-white tracking-tight">Novo post</h1>
      </header>

      <div className="animate-fade-in-up delay-100">
        <PostForm action={createPostAction} submitLabel="Publicar" />
      </div>
    </div>
  )
}
