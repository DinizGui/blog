import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Clock, ArrowLeft, Github } from 'lucide-react'
import { getPostBySlug, listPosts } from '@/lib/posts'
import { Sidebar } from '@/components/Sidebar'
import { MarkdownContent } from '@/components/MarkdownContent'

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Post não encontrado' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.coverImage] },
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

  const dateFormatted = format(new Date(post.publishedAt), "d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  })

  return (
    <div className="container-wide pt-10 pb-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-subtle hover:text-foreground transition-colors mb-10 group animate-fade-in"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
        Voltar
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
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
        </article>

        <Sidebar />
      </div>
    </div>
  )
}
