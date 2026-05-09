import Link from 'next/link'
import { Hero } from '@/components/Hero'
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

  return (
    <div className="container-blog">
      <Hero />

      {error === 'admin-only' && (
        <div className="mt-6 text-sm text-amber-300 border border-amber-900/60 bg-amber-950/30 rounded-md px-4 py-3 animate-fade-in">
          O painel é restrito ao administrador.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 pt-8">
        <section>
          <div className="flex items-center justify-between pt-2">
            <h2 className="eyebrow">Últimos posts</h2>
            <Link
              href="/articles"
              className="text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Ver todos →
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="border border-zinc-800 rounded-xl p-10 text-center bg-zinc-900/30 mt-6">
              <p className="text-zinc-400">Ainda não há posts publicados.</p>
            </div>
          ) : (
            <div>
              {posts.slice(0, 12).map((post, i) => (
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
