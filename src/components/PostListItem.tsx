import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowUpRight } from 'lucide-react'
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
        'group py-7 border-b border-line last:border-0 animate-fade-in-up',
        delayClass,
      )}
    >
      <Link href={`/post/${post.slug}`} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-5 items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-subtle mb-3">
            <time>{dateFormatted}</time>
            <span aria-hidden>·</span>
            <span className="eyebrow">{post.category}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} /> {post.readTime} min
            </span>
          </div>

          <h2 className="text-2xl sm:text-[26px] font-semibold text-foreground tracking-tight leading-snug mb-2 group-hover:text-accent transition-colors">
            {post.title}
            <ArrowUpRight
              size={18}
              className="inline-block ml-1.5 -translate-y-0.5 text-faint opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all"
            />
          </h2>
          <p className="text-muted leading-relaxed line-clamp-2 max-w-2xl">{post.excerpt}</p>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
              {post.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-subtle"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:block relative w-32 h-24 rounded-md overflow-hidden border border-line flex-shrink-0">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="128px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
    </article>
  )
}
