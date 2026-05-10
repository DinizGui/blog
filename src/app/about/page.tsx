import Image from 'next/image'
import Link from 'next/link'
import { Github, Mail } from 'lucide-react'
import { PostCard } from '@/components/PostCard'
import { listPosts } from '@/lib/posts'

const author = {
  name: 'Guilherme Diniz',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=devjunior&backgroundColor=b6e3f4',
  bio: 'Desenvolvedor júnior em formação. Documento aqui aprendizados, decisões técnicas e bugs que demoraram a cair a ficha — para mim e para quem está começando comigo.',
}

const skills = [
  { label: 'React / Next.js', level: 70 },
  { label: 'TypeScript', level: 65 },
  { label: 'Node.js', level: 55 },
  { label: 'PostgreSQL / MySQL', level: 50 },
  { label: 'Docker / Deploy', level: 35 },
]

export const metadata = {
  title: 'Sobre',
  description: 'Sobre Guilherme Diniz, autor do Dev Junior.',
}

export default async function AboutPage() {
  const recent = (await listPosts()).slice(0, 3)

  return (
    <div className="container-blog pt-12 pb-12">
      <section className="grid sm:grid-cols-[auto_1fr] gap-7 items-start mb-14 pb-12 border-b border-line animate-fade-in-up">
        <Image
          src={author.avatar}
          alt={author.name}
          width={104}
          height={104}
          unoptimized
          className="rounded-full bg-card-solid border border-line"
        />
        <div>
          <p className="eyebrow mb-3">Quem escreve</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-foreground tracking-tight mb-2">
            {author.name}
          </h1>
          <p className="text-muted mb-5">Desenvolvedor júnior · Full-stack em formação</p>
          <p className="text-foreground/90 leading-relaxed mb-6 max-w-2xl">{author.bio}</p>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://github.com/DinizGui"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <Github size={14} />
              GitHub
            </a>
            <a href="mailto:guicdiniz.gui@gmail.com" className="btn-ghost">
              <Mail size={14} />
              E-mail
            </a>
          </div>
        </div>
      </section>

      <section className="mb-14 animate-fade-in-up delay-100">
        <h2 className="text-xl font-semibold text-foreground tracking-tight mb-6">Stack</h2>
        <div className="space-y-4">
          {skills.map((s, i) => (
            <div key={s.label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-foreground">{s.label}</span>
                <span className="text-xs text-subtle font-mono">{s.level}%</span>
              </div>
              <div className="w-full bg-input rounded-full h-1 overflow-hidden border border-line">
                <div
                  className="h-full animate-skill"
                  style={{
                    width: `${s.level}%`,
                    background: 'var(--accent)',
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="animate-fade-in-up delay-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground tracking-tight">Posts recentes</h2>
          <Link
            href="/articles"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-5">
          {recent.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
