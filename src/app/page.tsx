import Link from 'next/link'
import { Hero } from '@/components/Hero'
import { PostCard } from '@/components/PostCard'
import { PostListItem } from '@/components/PostListItem'
import { Sidebar } from '@/components/Sidebar'
import { listPosts } from '@/lib/posts'

export const revalidate = 60

interface Props {
  searchParams: Promise<{ error?: string }>
}

export default async function HomePage({ searchParams }: Props) {
  const { error } = await searchParams
  const posts = await listPosts()
  const featured = posts.find((p) => p.featured)
  const rest = featured ? posts.filter((p) => p.id !== featured.id) : posts

  return (
    <div className="container-blog">
      <Hero />

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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 pt-10">
        <section>
          <div className="flex items-center justify-between pt-2">
            <h2 className="eyebrow">Últimos posts</h2>
            <Link
              href="/articles"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Ver todos →
            </Link>
          </div>

          {rest.length === 0 ? (
            <div className="card-surface p-10 text-center mt-6">
              <p className="text-muted">Ainda não há posts publicados.</p>
            </div>
          ) : (
            <div>
              {rest.slice(0, 12).map((post, i) => (
                <PostListItem key={post.id} post={post} index={i} />
              ))}
            </div>
          )}
        </section>

        <Sidebar />
      </div>
    </div>
  )
}
