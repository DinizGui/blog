import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { PostCard } from '@/components/PostCard'
import { PostListItem } from '@/components/PostListItem'
import { Sidebar } from '@/components/Sidebar'
import { listPosts, listCategories } from '@/lib/posts'

export const revalidate = 60

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function HomePage({ searchParams }: Props) {
  const { error } = await searchParams
  const [posts, categories] = await Promise.all([listPosts(), listCategories()])
  const featured = posts.find((p) => p.featured)
  const rest = featured ? posts.filter((p) => p.id !== featured.id) : posts

  const lastUpdate = posts.length
    ? new Date(
        posts.reduce((max, p) => {
          const t = new Date(p.updatedAt).getTime()
          return t > max ? t : max
        }, 0),
      )
    : null

  const gridPicks = rest.slice(0, 2)
  const listRest = rest.slice(2, 14)

  return (
    <div className="container-blog">
      <Hero
        postCount={posts.length}
        categories={categories.length}
        lastUpdate={lastUpdate}
      />

      {error === 'admin-only' && (
        <div className="mt-6 alert-warning text-sm px-4 py-3 animate-fade-in">
          O painel é restrito ao administrador.
        </div>
      )}

      {featured && (
        <section className="pt-10 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
            <h2 className="eyebrow">Em destaque</h2>
          </div>
          <PostCard post={featured} featured index={0} />
        </section>
      )}

      {gridPicks.length > 0 && (
        <section className="pt-12 animate-fade-in-up">
          <div className="flex items-center justify-between mb-5">
            <h2 className="eyebrow">Leituras rápidas</h2>
            <span className="text-xs text-faint font-mono">{gridPicks.length.toString().padStart(2, '0')} / {posts.length.toString().padStart(2, '0')}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {gridPicks.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 pt-14">
        <section>
          <div className="flex items-center justify-between pt-2 mb-2">
            <h2 className="eyebrow">Arquivo recente</h2>
            <Link
              href="/articles"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Ver todos →
            </Link>
          </div>

          {listRest.length === 0 && !featured ? (
            <div className="card-surface p-10 text-center mt-6">
              <p className="text-muted">Ainda não há posts publicados.</p>
            </div>
          ) : (
            <div>
              {listRest.map((post, i) => (
                <PostListItem
                  key={post.id}
                  post={post}
                  index={i}
                  total={listRest.length}
                />
              ))}
            </div>
          )}
        </section>

        <Sidebar />
      </div>
    </div>
  )
}
