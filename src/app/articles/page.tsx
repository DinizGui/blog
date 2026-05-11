import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { PostListItem } from '@/components/PostListItem'
import { Sidebar } from '@/components/Sidebar'
import { listPosts } from '@/lib/posts'
import { absoluteUrl } from '@/lib/seo'

interface SearchParams {
  searchParams: Promise<{ category?: string; tag?: string }>
}

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Artigos',
  description: 'Todos os posts publicados sobre React, Next.js, TypeScript e desenvolvimento full-stack.',
  alternates: { canonical: absoluteUrl('/articles') },
  openGraph: {
    title: 'Artigos',
    description: 'Todos os posts publicados.',
    url: absoluteUrl('/articles'),
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Artigos · Dev Junior',
    description: 'Todos os posts publicados.',
  },
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

  const filterKind = params.category ? 'category' : params.tag ? 'tag' : null
  const filterValue = params.category ?? params.tag ?? null
  const hasFilter = filterKind != null

  return (
    <div className="container-blog pt-12 pb-10">
      <header className="mb-8 pb-6 border-b border-line animate-fade-in-up">
        <div className="flex items-center gap-2 mb-2">
          <p className="eyebrow">{hasFilter ? (filterKind === 'category' ? 'Categoria' : 'Tag') : 'Arquivo'}</p>
          {hasFilter && (
            <Link
              href="/articles"
              className="text-xs text-faint hover:text-foreground transition-colors"
            >
              limpar filtro ×
            </Link>
          )}
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-2">
          {hasFilter ? (
            <>
              {filterKind === 'tag' && <span className="text-faint">#</span>}
              {filterValue}
            </>
          ) : (
            'Todos os artigos'
          )}
        </h1>
        <p className="text-muted">
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
          {hasFilter && (
            <>
              {' de '}
              <span className="font-mono">{all.length}</span>
            </>
          )}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">
        <section>
          {filtered.length === 0 ? (
            <div className="card-surface p-12 text-center">
              <div className="inline-flex w-12 h-12 rounded-xl items-center justify-center border border-line mb-4" style={{ background: 'var(--card-solid)' }}>
                <Search size={18} className="text-faint" />
              </div>
              <h2 className="text-foreground font-semibold mb-2">Nada encontrado</h2>
              <p className="text-muted text-sm mb-5 max-w-sm mx-auto">
                Nenhum post bate com esse filtro. Tente outra categoria ou volte pro arquivo completo.
              </p>
              <Link href="/articles" className="btn-ghost">
                Ver todos os artigos
              </Link>
            </div>
          ) : (
            filtered.map((post, i) => (
              <PostListItem
                key={post.id}
                post={post}
                index={i}
                total={filtered.length}
              />
            ))
          )}
        </section>
        <Sidebar />
      </div>
    </div>
  )
}
