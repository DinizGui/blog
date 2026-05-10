import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { PostForm } from '@/components/PostForm'
import { updatePostAction } from '@/app/painel/actions'
import { getPostById } from '@/lib/posts'
import { PainelHeader } from '@/components/PainelHeader'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Editar post' }

export default async function EditarPostPage({ params }: Props) {
  const { id } = await params
  const post = await getPostById(id)
  if (!post) notFound()

  const action = updatePostAction.bind(null, id)

  return (
    <div className="container-wide pt-10 pb-12">
      <PainelHeader />

      <Link
        href="/painel"
        className="inline-flex items-center gap-1.5 text-sm text-subtle hover:text-foreground transition-colors mb-6 group animate-fade-in"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Voltar pro painel
      </Link>

      <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 animate-fade-in-up">
        <div>
          <p className="eyebrow mb-2">Editando</p>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">{post.title}</h1>
        </div>
        <Link
          href={`/post/${post.slug}`}
          target="_blank"
          className="btn-ghost text-xs"
        >
          <ExternalLink size={12} /> Ver post
        </Link>
      </header>

      <div className="animate-fade-in-up delay-100">
        <PostForm action={action} initial={post} submitLabel="Salvar alterações" />
      </div>
    </div>
  )
}
