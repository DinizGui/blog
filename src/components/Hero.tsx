import Image from 'next/image'

const author = {
  name: 'Guilherme Diniz',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=devjunior&backgroundColor=b6e3f4',
}

export function Hero() {
  return (
    <section className="pt-12 sm:pt-20 pb-12 border-b border-line animate-fade-in-up">
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

      <div className="flex items-center gap-3">
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
    </section>
  )
}
