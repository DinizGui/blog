import { PostListItem } from '@/components/PostListItem'
import { Sidebar } from '@/components/Sidebar'
import { listPosts } from '@/lib/posts'

interface SearchParams {
  searchParams: Promise<{ category?: string; tag?: string }>
}

export const revalidate = 60

export const metadata = {
  title: 'Artigos',
  description: 'Todos os posts publicados.',
}

export default async function ArticlesPage({ searchParams }: SearchParams) {
  const params = await searchParams
  const all = await listPosts()
  const filtered = all.filter((p) => {
    if (params.category && p.category.toLowerCase() !== params.category.toLowerCase()) return false
    if (params.tag && !p.tags.map((t) => t.toLowerCase()).includes(params.tag.toLowerCase())) {
      return false
    }
    return true
  })

  const filterLabel = params.category
    ? `Categoria: ${params.category}`
    : params.tag
      ? `Tag: ${params.tag}`
      : null

  return (
    <div className="container-blog pt-12 pb-10">
      <header className="mb-8 pb-6 border-b border-zinc-800 animate-fade-in-up">
        <p className="eyebrow mb-2">{filterLabel ?? 'Arquivo'}</p>
        <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
          {filterLabel ?? 'Todos os artigos'}
        </h1>
        <p className="text-zinc-400">
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
        <section>
          {filtered.length === 0 ? (
            <div className="border border-zinc-800 rounded-xl p-10 text-center bg-zinc-900/30">
              <p className="text-zinc-400">Nada encontrado com esse filtro.</p>
            </div>
          ) : (
            filtered.map((post, i) => <PostListItem key={post.id} post={post} index={i} />)
          )}
        </section>
        <Sidebar />
      </div>
    </div>
  )
}
