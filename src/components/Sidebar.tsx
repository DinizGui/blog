import Link from 'next/link'
import Image from 'next/image'
import { Github, FileText, Folder } from 'lucide-react'
import { listCategories, listAllTags, listPosts } from '@/lib/posts'

const author = {
  name: 'Guilherme Diniz',
  role: 'Dev junior',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=devjunior&backgroundColor=b6e3f4',
  bio: 'Documento aqui o que aprendo no dia a dia: stack, decisões e bugs.',
  github: 'DinizGui',
}

export async function Sidebar() {
  const [categories, tags, posts] = await Promise.all([
    listCategories(),
    listAllTags(),
    listPosts(),
  ])

  return (
    <aside className="lg:sticky lg:top-20 lg:self-start space-y-9 lg:pt-2 animate-fade-in-up delay-200">
      <section className="card-surface p-5">
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={author.avatar}
            alt={author.name}
            width={44}
            height={44}
            unoptimized
            className="rounded-full bg-card-solid border border-line"
          />
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground leading-tight truncate">{author.name}</p>
            <p className="text-xs text-subtle">{author.role}</p>
          </div>
        </div>
        <p className="text-sm text-muted leading-relaxed mb-4">{author.bio}</p>
        <div className="flex items-center justify-between pt-3 border-t border-line text-xs">
          <a
            href={`https://github.com/${author.github}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-subtle hover:text-foreground transition-colors"
          >
            <Github size={12} /> @{author.github}
          </a>
          <span className="inline-flex items-center gap-1 text-faint font-mono">
            <FileText size={11} /> {posts.length}
          </span>
        </div>
      </section>

      {categories.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Folder size={12} className="text-subtle" />
            <h3 className="eyebrow">Categorias</h3>
          </div>
          <ul className="space-y-1.5">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link
                  href={`/articles?category=${encodeURIComponent(cat.name)}`}
                  className="flex items-center justify-between text-sm text-muted hover:text-foreground transition-colors group"
                >
                  <span className="group-hover:translate-x-0.5 transition-transform">{cat.name}</span>
                  <span className="text-xs text-faint font-mono">{cat.count.toString().padStart(2, '0')}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tags.length > 0 && (
        <section>
          <h3 className="eyebrow mb-3">Tags</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/articles?tag=${encodeURIComponent(tag)}`}
                className="text-xs text-subtle hover:text-foreground transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </section>
      )}
    </aside>
  )
}
