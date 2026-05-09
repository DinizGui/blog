import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seed = [
  {
    title: 'Meu primeiro deploy deu errado e eu aprendi muito',
    slug: 'primeiro-deploy-errado',
    excerpt:
      'Subi minha primeira API em produção e quebrou em 3 minutos. Aqui o que eu fiz errado e o que aprendi pra próxima.',
    content: `
Subi minha primeira API em produção essa semana e foi um caos lindo. Em 3 minutos já tinha 500 nos logs.

## O que aconteceu

Esqueci de configurar a \`DATABASE_URL\` em produção. O banco local funcionava, então o deploy "passou", mas qualquer request estourava.

\`\`\`ts
// errado: sem fallback, sem validação
const db = new Pool({ connectionString: process.env.DATABASE_URL })
\`\`\`

## O que faria diferente

- Validar env vars no boot com Zod
- Healthcheck endpoint que testa o banco
- Smoke test depois do deploy

> Erro burro? Sim. Aprendi mais do que em uma semana de tutorial.
    `.trim(),
    category: 'Aprendizado',
    tags: ['deploy', 'devops', 'erro', 'aprendizado'],
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&q=80',
    readTime: 4,
    featured: true,
  },
  {
    title: 'Por que useEffect dispara duas vezes (e tá tudo bem)',
    slug: 'useeffect-dispara-duas-vezes',
    excerpt:
      'Em dev mode com Strict Mode, o React monta e desmonta os componentes pra você notar bugs. Não é bug, é feature.',
    content: `
Eu jurava que tinha um bug horrível: meu \`useEffect\` rodava duas vezes em dev. Liguei o devtools, fui ver — era o **StrictMode**.

## O que o StrictMode faz

Em dev, ele intencionalmente monta, desmonta e remonta o componente pra detectar effects que não fazem cleanup direito.

\`\`\`tsx
useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000)
  return () => clearInterval(id) // SEM ISSO vaza
}, [])
\`\`\`

## Conclusão

Se seu effect quebra com remount, ele já tava quebrado — só não tinha aparecido em prod ainda.
    `.trim(),
    category: 'React',
    tags: ['react', 'hooks', 'strict-mode'],
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=80',
    readTime: 3,
  },
  {
    title: 'Tailwind v4: deletando meu config e amando',
    slug: 'tailwind-v4-sem-config',
    excerpt:
      'Migrei pro Tailwind v4 e o tailwind.config.js foi pro lixo. Tudo agora vive no CSS via @theme. Conta a real.',
    content: `
A v4 do Tailwind chegou e mudou as regras. Sem config JS, configuração via CSS, motor em Rust.

## O novo @theme

\`\`\`css
@import "tailwindcss";

@theme {
  --color-brand: #7c3aed;
  --font-display: "Sora", sans-serif;
}
\`\`\`

Pronto. Sem \`tailwind.config.js\`. Sem \`content: []\`. Sem nada.

## Build mais rápido

No projeto que migrei, o build caiu de 3.2s pra 0.4s. **5x mais rápido**, igual prometido.
    `.trim(),
    category: 'CSS',
    tags: ['tailwind', 'css', 'frontend'],
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=1200&q=80',
    readTime: 4,
  },
  {
    title: 'Server Actions no Next 15: chega de API route boilerplate',
    slug: 'server-actions-next-15',
    excerpt:
      'Toda vez que eu ia criar um form, era /api/coisa, fetch, useState, loading… Server Actions resolveram tudo isso de uma vez.',
    content: `
Antes:

\`\`\`ts
// app/api/posts/route.ts
export async function POST(req: Request) {
  const body = await req.json()
  await db.post.create({ data: body })
  return Response.json({ ok: true })
}
\`\`\`

E no client: fetch + JSON + erro + loading state.

## Agora

\`\`\`ts
// actions.ts
'use server'
export async function createPost(formData: FormData) {
  await db.post.create({ data: { title: formData.get('title') as string }})
  revalidatePath('/painel')
}

// component
<form action={createPost}>...</form>
\`\`\`

Acabou. Sem fetch, sem JSON, sem rota. Um arquivo a menos por feature.
    `.trim(),
    category: 'Next.js',
    tags: ['nextjs', 'server-actions', 'react'],
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80',
    readTime: 5,
  },
]

async function main() {
  console.log('🌱 Seedando posts...')
  for (const post of seed) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    })
    console.log(`  ✓ ${post.slug}`)
  }
  console.log('✅ Seed completo.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
