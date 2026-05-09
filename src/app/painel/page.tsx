import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Pencil, Plus, FileText, BookOpen, Star } from 'lucide-react'
import { listPosts } from '@/lib/posts'
import { DeletePostButton } from '@/components/DeletePostButton'
import { PainelHeader } from '@/components/PainelHeader'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Painel' }

export default async function PainelPage() {
  const posts = await listPosts()
  const featuredCount = posts.filter((p) => p.featured).length
  const totalMin = posts.reduce((acc, p) => acc + p.readTime, 0)

  return (
    <div className="container-wide pt-10 pb-12">
      <PainelHeader />

      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 animate-fade-in-up">
        <div>
          <p className="eyebrow mb-2">Administração</p>
          <h1 className="text-3xl font-semibold text-white tracking-tight">Painel</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Gerencie os posts publicados no blog.
          </p>
        </div>
        <Link href="/painel/novo" className="btn-primary self-start sm:self-auto">
          <Plus size={14} />
          Novo post
        </Link>
      </header>

      <section className="grid sm:grid-cols-3 gap-3 mb-10 animate-fade-in-up delay-100">
        <Stat icon={FileText} label="Posts" value={posts.length} />
        <Stat icon={Star} label="Em destaque" value={featuredCount} />
        <Stat icon={BookOpen} label="Min. de leitura" value={totalMin} />
      </section>

      <section className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/30 animate-fade-in-up delay-200">
        <header className="px-5 py-3.5 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-200">Todos os posts</h2>
          <span className="text-xs text-zinc-500 font-mono">{posts.length}</span>
        </header>

        {posts.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={20} className="mx-auto text-zinc-600 mb-3" />
            <p className="text-zinc-400 mb-4 text-sm">Nenhum post ainda.</p>
            <Link href="/painel/novo" className="btn-primary inline-flex">
              <Plus size={14} /> Escrever o primeiro
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-800">
            {posts.map((post) => (
              <li
                key={post.id}
                className="px-5 py-3.5 flex items-center gap-4 hover:bg-zinc-900/40 transition-colors"
              >
                <div className="relative w-12 h-12 rounded-md overflow-hidden border border-zinc-800 flex-shrink-0">
                  <Image
                    src={post.coverImage}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1 text-xs text-zinc-500">
                    <span>{post.category}</span>
                    {post.featured && (
                      <>
                        <span>·</span>
                        <span className="inline-flex items-center gap-1 text-zinc-300">
                          <Star size={10} /> destaque
                        </span>
                      </>
                    )}
                  </div>
                  <Link
                    href={`/post/${post.slug}`}
                    className="block text-zinc-100 font-medium leading-tight hover:text-white transition-colors line-clamp-1"
                  >
                    {post.title}
                  </Link>
                  <p className="text-xs text-zinc-500 mt-1">
                    {format(new Date(post.publishedAt), "d 'de' MMM yyyy", { locale: ptBR })} ·{' '}
                    {post.readTime} min
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/painel/${post.id}`}
                    className="inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white px-3 py-1.5 rounded-md border border-zinc-800 hover:border-zinc-600 transition-colors"
                  >
                    <Pencil size={12} />
                    Editar
                  </Link>
                  <DeletePostButton id={post.id} title={post.title} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof FileText
  label: string
  value: number
}) {
  return (
    <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/30 flex items-center gap-3">
      <div className="w-9 h-9 rounded-md border border-zinc-800 bg-zinc-950 flex items-center justify-center">
        <Icon size={15} className="text-zinc-400" />
      </div>
      <div>
        <p className="text-2xl font-semibold text-white leading-none mb-1">{value}</p>
        <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  )
}
