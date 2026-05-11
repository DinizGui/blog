import Image from 'next/image'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const author = {
  name: 'Guilherme Diniz',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=devjunior&backgroundColor=b6e3f4',
}

interface HeroProps {
  postCount: number
  lastUpdate: Date | null
  categories: number
}

export function Hero({ postCount, lastUpdate, categories }: HeroProps) {
  const lastUpdateFmt = lastUpdate
    ? format(lastUpdate, "d 'de' MMM',' yyyy", { locale: ptBR })
    : '—'

  return (
    <section className="pt-12 sm:pt-20 pb-12 border-b border-line animate-fade-in-up">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex w-2 h-2 rounded-full bg-accent animate-glow" aria-hidden />
            <p className="eyebrow !text-accent">Diário de bordo</p>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold text-foreground tracking-tight leading-[1.05] mb-5 max-w-3xl">
            Aprendendo em público,{' '}
            <span className="text-subtle">um post de cada vez.</span>
          </h1>

          <p className="text-lg text-muted leading-relaxed max-w-2xl mb-7">
            Notas técnicas, decisões de arquitetura e os bugs que demoraram a cair a ficha.
            Stack: React, Next.js, TypeScript, Node.
          </p>

          <div className="flex items-center gap-3 mb-8">
            <Image
              src={author.avatar}
              alt={author.name}
              width={36}
              height={36}
              unoptimized
              className="rounded-full bg-card-solid border border-line"
            />
            <div className="text-sm">
              <p className="text-foreground font-medium leading-tight">{author.name}</p>
              <p className="text-subtle text-xs mt-0.5">Dev junior · escreve sobre o que estuda</p>
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-px bg-line border border-line rounded-lg overflow-hidden max-w-xl">
            <div className="bg-surface px-4 py-3">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-faint mb-1">Posts</dt>
              <dd className="text-foreground font-semibold font-mono text-lg leading-none">
                {postCount.toString().padStart(2, '0')}
              </dd>
            </div>
            <div className="bg-surface px-4 py-3">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-faint mb-1">Categorias</dt>
              <dd className="text-foreground font-semibold font-mono text-lg leading-none">
                {categories.toString().padStart(2, '0')}
              </dd>
            </div>
            <div className="bg-surface px-4 py-3">
              <dt className="text-[10px] uppercase tracking-[0.18em] text-faint mb-1">Atualizado</dt>
              <dd className="text-foreground font-medium text-sm leading-none mt-1.5">
                {lastUpdateFmt}
              </dd>
            </div>
          </dl>
        </div>

        <div className="hidden lg:block">
          <HeroSnippet />
        </div>
      </div>
    </section>
  )
}

function HeroSnippet() {
  return (
    <div
      className="rounded-xl border overflow-hidden font-mono text-[12.5px] leading-6 select-none"
      style={{
        background: 'var(--codeblock-bg)',
        borderColor: 'var(--codeblock-border)',
        color: 'var(--codeblock-fg)',
        boxShadow: 'var(--shadow-card)',
      }}
      aria-hidden
    >
      <div
        className="flex items-center gap-1.5 px-4 py-2.5 border-b"
        style={{ borderColor: 'var(--codeblock-border)' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 text-[11px] opacity-60">~/dev-junior</span>
      </div>
      <div className="px-5 py-4">
        <div>
          <span className="text-pink-300/90">const</span>{' '}
          <span className="text-cyan-300/90">autor</span> = {'{'}
        </div>
        <div className="pl-4">
          nome: <span className="text-amber-200/90">{`'Gui'`}</span>,
        </div>
        <div className="pl-4">
          stack: [
          <span className="text-amber-200/90">{`'React'`}</span>,{' '}
          <span className="text-amber-200/90">{`'Next'`}</span>,{' '}
          <span className="text-amber-200/90">{`'TS'`}</span>],
        </div>
        <div className="pl-4">
          estado: <span className="text-amber-200/90">{`'aprendendo'`}</span>,
        </div>
        <div>{'}'}</div>
        <div className="text-zinc-500 mt-2">{`// commit -m 'aprende, anota, posta'`}</div>
      </div>
    </div>
  )
}
