import Link from 'next/link'
import Image from 'next/image'
import { Github } from 'lucide-react'
import { listCategories, listAllTags } from '@/lib/posts'

const author = {
  name: 'Guilherme Diniz',
  role: 'Dev junior',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=devjunior&backgroundColor=b6e3f4',
  bio: 'Documento aqui o que aprendo no dia a dia: stack, decisões e bugs.',
  github: 'DinizGui',
}

export async function Sidebar() {
  const [categories, tags] = await Promise.all([listCategories(), listAllTags()])

  return (
    <aside className="space-y-9 lg:pt-2 animate-fade-in-up delay-200">
      <section>
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={author.avatar}
            alt={author.name}
            width={40}
            height={40}
            className="rounded-full bg-zinc-900 border border-zinc-800"
          />
          <div>
            <p className="text-sm font-medium text-zinc-100 leading-tight">{author.name}</p>
            <p className="text-xs text-zinc-500">{author.role}</p>
          </div>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed mb-3">{author.bio}</p>
        <a
          href={`https://github.com/${author.github}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 transition-colors"
        >
          <Github size={12} /> github.com/{author.github}
        </a>
      </section>

      {categories.length > 0 && (
        <section>
          <h3 className="eyebrow mb-3">Categorias</h3>
          <ul className="space-y-1.5">
            {categories.map((cat) => (
              <li key={cat.name}>
                <Link
                  href={`/articles?category=${encodeURIComponent(cat.name)}`}
                  className="flex items-center justify-between text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-zinc-600 font-mono">{cat.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tags.length > 0 && (
        <section>
          <h3 className="eyebrow mb-3">Tags</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/articles?tag=${encodeURIComponent(tag)}`}
                className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="pt-1 border-t border-zinc-800">
        <h3 className="eyebrow mb-3 mt-3">Newsletter</h3>
        <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
          Receba os novos posts no e-mail.
        </p>
        <form className="space-y-2">
          <input type="email" required placeholder="seu@email.com" className="input-field" />
          <button type="submit" className="btn-primary w-full justify-center text-xs">
            Inscrever-se
          </button>
        </form>
      </section>
    </aside>
  )
}
