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
      <section className="grid sm:grid-cols-[auto_1fr] gap-7 items-start mb-14 pb-12 border-b border-zinc-800 animate-fade-in-up">
        <Image
          src={author.avatar}
          alt={author.name}
          width={104}
          height={104}
          className="rounded-full bg-zinc-900 border border-zinc-800"
        />
        <div>
          <p className="eyebrow mb-3">Quem escreve</p>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
            {author.name}
          </h1>
          <p className="text-zinc-400 mb-5">Desenvolvedor júnior · Full-stack em formação</p>
          <p className="text-zinc-300 leading-relaxed mb-6 max-w-2xl">{author.bio}</p>
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
        <h2 className="text-xl font-semibold text-white tracking-tight mb-6">Stack</h2>
        <div className="space-y-4">
          {skills.map((s, i) => (
            <div key={s.label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-zinc-200">{s.label}</span>
                <span className="text-xs text-zinc-500 font-mono">{s.level}%</span>
              </div>
              <div className="w-full bg-zinc-900 rounded-full h-1 overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-zinc-300 animate-skill"
                  style={{
                    width: `${s.level}%`,
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
          <h2 className="text-xl font-semibold text-white tracking-tight">Posts recentes</h2>
          <Link
            href="/articles"
            className="text-sm text-zinc-400 hover:text-white transition-colors"
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
