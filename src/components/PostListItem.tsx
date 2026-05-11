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
  total?: number
}

export function PostListItem({ post, index = 0, total }: Props) {
  const dateFormatted = format(new Date(post.publishedAt), "d 'de' MMM',' yyyy", { locale: ptBR })
  const delayClass = index < 6 ? `delay-${(index + 1) * 100}` : ''
  const editionNumber = total != null ? total - index : index + 1

  return (
    <article
      className={cn(
        'group relative py-8 border-b border-line last:border-0 animate-fade-in-up',
        delayClass,
      )}
    >
      <Link
        href={`/post/${post.slug}`}
        className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_1fr_auto] gap-x-5 sm:gap-x-7 items-start"
      >
        <div className="flex flex-col items-start gap-1 pt-1 min-w-[44px]">
          <span className="text-xs text-faint font-mono tabular-nums">
            #{editionNumber.toString().padStart(2, '0')}
          </span>
          <span className="hidden sm:block w-6 h-px bg-line-strong mt-1" aria-hidden />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-subtle mb-3">
            <time>{dateFormatted}</time>
            <span aria-hidden className="text-faint">·</span>
            <span className="eyebrow !text-accent">{post.category}</span>
            <span aria-hidden className="text-faint">·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} /> {post.readTime} min
            </span>
          </div>

          <h2 className="text-2xl sm:text-[28px] font-semibold text-foreground tracking-tight leading-[1.15] mb-2.5 group-hover:text-accent transition-colors">
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
                <span key={tag} className="text-xs text-subtle">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="hidden sm:block relative w-40 h-28 rounded-lg overflow-hidden border border-line flex-shrink-0">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="160px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              background: 'linear-gradient(135deg, transparent 50%, var(--accent-soft) 100%)',
            }}
          />
        </div>
      </Link>
    </article>
  )
}
