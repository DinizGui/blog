import Link from 'next/link'
import { Clock } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Post } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  post: Post
  index?: number
}

export function PostListItem({ post, index = 0 }: Props) {
  const dateFormatted = format(new Date(post.publishedAt), "d 'de' MMMM',' yyyy", { locale: ptBR })
  const delayClass = index < 6 ? `delay-${(index + 1) * 100}` : ''

  return (
    <article
      className={cn(
        'group py-7 border-b border-zinc-800 last:border-0 animate-fade-in-up',
        delayClass,
      )}
    >
      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mb-3">
        <time>{dateFormatted}</time>
        <span>·</span>
        <span className="eyebrow">{post.category}</span>
        <span>·</span>
        <span className="inline-flex items-center gap-1">
          <Clock size={11} /> {post.readTime} min
        </span>
      </div>

      <Link href={`/post/${post.slug}`} className="block">
        <h2 className="text-2xl sm:text-[26px] font-semibold text-white tracking-tight leading-snug mb-2 group-hover:text-zinc-300 transition-colors">
          {post.title}
        </h2>
        <p className="text-zinc-400 leading-relaxed line-clamp-2 max-w-3xl">{post.excerpt}</p>
      </Link>

      {post.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 5).map((tag) => (
            <Link
              key={tag}
              href={`/articles?tag=${encodeURIComponent(tag)}`}
              className="text-xs px-2 py-0.5 rounded text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
