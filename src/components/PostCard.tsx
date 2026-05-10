import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Post } from '@/types'
import { cn } from '@/lib/utils'

interface PostCardProps {
  post: Post
  featured?: boolean
  index?: number
}

export function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  const dateFormatted = format(new Date(post.publishedAt), "d 'de' MMM',' yyyy", { locale: ptBR })
  const delayClass =
    index === 0 ? '' : index === 1 ? 'delay-100' : index === 2 ? 'delay-200' : 'delay-300'

  if (featured) {
    return (
      <article
        className={cn(
          'group grid md:grid-cols-[1.1fr_1fr] gap-0 border border-line rounded-xl overflow-hidden bg-card hover:border-line-strong transition-colors animate-fade-in-up',
          delayClass,
        )}
      >
        <Link href={`/post/${post.slug}`} className="relative block h-64 md:h-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div
            className="absolute inset-0 md:block hidden"
            style={{
              background:
                'linear-gradient(to right, transparent 60%, var(--bg) 100%)',
            }}
          />
        </Link>
        <div className="p-7 md:p-9 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-subtle">
              <span className="eyebrow">{post.category}</span>
              <span>·</span>
              <time>{dateFormatted}</time>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock size={11} /> {post.readTime} min
              </span>
            </div>
            <Link href={`/post/${post.slug}`}>
              <h2 className="text-2xl md:text-[28px] font-semibold text-foreground leading-tight tracking-tight group-hover:text-accent transition-colors">
                {post.title}
              </h2>
            </Link>
            <p className="text-muted leading-relaxed line-clamp-3">{post.excerpt}</p>
          </div>
          <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={28}
                height={28}
                unoptimized
                className="rounded-full bg-card-solid border border-line"
              />
              <span className="text-sm text-muted">{post.author.name}</span>
            </div>
            <Link
              href={`/post/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Ler artigo
              <ArrowRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article
      className={cn(
        'group flex flex-col border border-line rounded-xl overflow-hidden bg-card hover:border-line-strong transition-colors animate-fade-in-up',
        delayClass,
      )}
    >
      <Link href={`/post/${post.slug}`} className="relative block h-44 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, var(--bg) 0%, transparent 50%)',
          }}
        />
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-subtle mb-3">
          <span className="eyebrow">{post.category}</span>
          <span>·</span>
          <time>{dateFormatted}</time>
        </div>
        <Link href={`/post/${post.slug}`} className="flex-1">
          <h2 className="font-semibold text-foreground text-[17px] leading-snug tracking-tight group-hover:text-accent transition-colors mb-2">
            {post.title}
          </h2>
          <p className="text-muted text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
        </Link>
        <div className="mt-4 pt-4 border-t border-line flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={22}
              height={22}
              unoptimized
              className="rounded-full bg-card-solid border border-line"
            />
            <span className="text-xs text-muted">{post.author.name}</span>
          </div>
          <span className="flex items-center gap-1 text-xs text-subtle">
            <Clock size={11} />
            {post.readTime} min
          </span>
        </div>
      </div>
    </article>
  )
}
