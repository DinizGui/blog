import Image from 'next/image'

const author = {
  name: 'Guilherme Diniz',
  avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=devjunior&backgroundColor=b6e3f4',
}

export function Hero() {
  return (
    <section className="pt-12 sm:pt-16 pb-12 border-b border-zinc-800 animate-fade-in-up">
      <div className="flex items-start gap-4 mb-4">
        <Image
          src={author.avatar}
          alt={author.name}
          width={48}
          height={48}
          className="rounded-full bg-zinc-900 border border-zinc-800"
        />
        <div>
          <p className="eyebrow mb-1">Diário de bordo</p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Dev Junior
          </h1>
        </div>
      </div>
      <p className="text-lg text-zinc-300 leading-relaxed max-w-3xl">
        Notas técnicas e aprendizados de um desenvolvedor júnior em formação.
        Escrevo aqui sobre o que estudo, decisões de arquitetura e os bugs que
        demoraram a cair a ficha. Stack: React, Next.js, TypeScript, Node.
      </p>
    </section>
  )
}
