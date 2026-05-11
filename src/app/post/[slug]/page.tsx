import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, ChevronRight, Github, Home } from 'lucide-react'
import { getPostBySlug, listPosts } from '@/lib/posts'
import { MarkdownContent } from '@/components/MarkdownContent'
import { PostTOC } from '@/components/PostTOC'
import { ScrollProgress } from '@/components/ScrollProgress'
import { PostCard } from '@/components/PostCard'
import { SITE, absoluteUrl } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) {
    return { title: 'Post não encontrado', robots: { index: false, follow: false } }
  }

  const url = absoluteUrl(`/post/${post.slug}`)
  const image = post.coverImage
  const description = post.excerpt || post.content.slice(0, 160).trim()

  return {
    title: post.title,
    description,
    authors: [{ name: post.author.name }],
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      section: post.category,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      creator: SITE.twitterHandle,
      images: [image],
    },
  }
}

export async function generateStaticParams() {
  const posts = await listPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const allPosts = await listPosts()
  const currentIdx = allPosts.findIndex((p) => p.id === post.id)
  const prev = currentIdx > 0 ? allPosts[currentIdx - 1] : null
  const next = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null
  const related = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  const dateFormatted = format(new Date(post.publishedAt), "d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  })

  return (
    <>
      <ScrollProgress />
      <div className="container-wide pt-6 pb-10">
        <nav
          aria-label="breadcrumb"
          className="flex items-center gap-1.5 text-xs text-subtle mb-8 animate-fade-in flex-wrap"
        >
          <Link href="/" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
            <Home size={12} /> Início
          </Link>
          <ChevronRight size={12} className="text-faint" />
          <Link href="/articles" className="hover:text-foreground transition-colors">
            Artigos
          </Link>
          <ChevronRight size={12} className="text-faint" />
          <Link
            href={`/articles?category=${encodeURIComponent(post.category)}`}
            className="hover:text-foreground transition-colors"
          >
            {post.category}
          </Link>
          <ChevronRight size={12} className="text-faint" />
          <span className="text-foreground truncate max-w-[18ch] sm:max-w-none">{post.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12">
          <article className="animate-fade-in-up max-w-3xl">
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 text-xs text-subtle mb-6">
                <span className="eyebrow !text-accent">{post.category}</span>
                <span aria-hidden>·</span>
                <time>{dateFormatted}</time>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={11} /> {post.readTime} min de leitura
                </span>
              </div>

              <h1 className="text-3xl sm:text-[42px] font-semibold text-foreground leading-[1.1] mb-6 tracking-tight">
                {post.title}
              </h1>

              <p className="text-lg text-muted leading-relaxed mb-8">{post.excerpt}</p>

              <div className="flex items-center gap-3 pb-8 border-b border-line">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={36}
                  height={36}
                  unoptimized
                  className="rounded-full bg-card-solid border border-line"
                />
                <div>
                  <p className="text-sm font-medium text-foreground leading-none">{post.author.name}</p>
                  <p className="text-xs text-subtle mt-1">Autor</p>
                </div>
              </div>
            </header>

            <div className="relative w-full h-64 sm:h-96 mb-12 rounded-xl overflow-hidden border border-line">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
            </div>

            <MarkdownContent content={post.content} />

            {post.tags.length > 0 && (
              <div className="mt-14 pt-8 border-t border-line">
                <p className="eyebrow mb-3">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/articles?tag=${encodeURIComponent(tag)}`}
                      className="text-xs px-2.5 py-1 rounded-md border border-line text-muted hover:text-foreground hover:border-line-strong transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 card-surface p-6 flex gap-5">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={56}
                height={56}
                unoptimized
                className="rounded-full bg-card-solid border border-line flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-foreground mb-1">{post.author.name}</p>
                <p className="text-sm text-muted leading-relaxed mb-3">{post.author.bio}</p>
                <a
                  href="https://github.com/DinizGui"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent transition-colors"
                >
                  <Github size={13} />
                  github.com/DinizGui
                </a>
              </div>
            </div>

            {(prev || next) && (
              <nav
                className="mt-12 grid sm:grid-cols-2 gap-4"
                aria-label="Navegação entre posts"
              >
                {prev ? (
                  <Link
                    href={`/post/${prev.slug}`}
                    className="card-surface p-5 group hover:border-line-strong"
                  >
                    <p className="eyebrow mb-2">← Anterior</p>
                    <p className="text-foreground font-medium leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
                {next ? (
                  <Link
                    href={`/post/${next.slug}`}
                    className="card-surface p-5 group hover:border-line-strong sm:text-right"
                  >
                    <p className="eyebrow mb-2">Próximo →</p>
                    <p className="text-foreground font-medium leading-snug group-hover:text-accent transition-colors line-clamp-2">
                      {next.title}
                    </p>
                  </Link>
                ) : (
                  <span />
                )}
              </nav>
            )}

            {related.length > 0 && (
              <section className="mt-16">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="eyebrow">Relacionados em {post.category}</h2>
                  <Link
                    href={`/articles?category=${encodeURIComponent(post.category)}`}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    Ver tudo →
                  </Link>
                </div>
                <div className="grid sm:grid-cols-3 gap-5">
                  {related.map((r, i) => (
                    <PostCard key={r.id} post={r} index={i} />
                  ))}
                </div>
              </section>
            )}
          </article>

          <aside className="lg:sticky lg:top-20 lg:self-start space-y-8 animate-fade-in-up delay-200">
            <PostTOC content={post.content} />
          </aside>
        </div>
      </div>
    </>
  )
}
