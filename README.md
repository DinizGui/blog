# Dev Junior

> Blog pessoal de um desenvolvedor júnior em formação — notas técnicas, decisões de arquitetura e os bugs que demoraram a cair a ficha.

🔗 **Em produção:** [blog-ten-liard.vercel.app](https://blog-ten-liard.vercel.app)
📦 **Repositório:** [github.com/DinizGui/blog](https://github.com/DinizGui/blog)

Stack: **Next.js 15** (App Router) · **React 19** · **TypeScript** · **Tailwind v4** · **Prisma** · **MySQL** · **Firebase Storage**.

---

## Features

- **Blog editorial** — Hero com stats, grid magazine, lista com numeração de edição, página de post com TOC, breadcrumb, barra de progresso de leitura, posts relacionados e navegação anterior/próximo.
- **Tema claro/escuro** — toggle persistido em `localStorage`, sem flash de tema errado (script inline no `<head>`).
- **Autenticação** — cadastro/login com JWT (`jose`), senhas em `bcryptjs`, sessão via cookie HTTP-only, middleware de proteção em `/painel`.
- **Painel admin** — CRUD de posts via Server Actions, upload de capas direto pra Firebase Storage, com fallback para imagens do Unsplash por categoria.
- **SEO** — `metadata` por rota, Open Graph, Twitter Card, `canonical`, `robots`.
- **ISR** — `revalidate: 60` nas rotas públicas.
- **Acessibilidade** — focus-visible, `prefers-reduced-motion`, contraste cuidado nos dois temas.

## Stack

| Camada      | Tecnologia                                 |
| ----------- | ------------------------------------------ |
| Framework   | Next.js 15.5 (App Router, Server Actions)  |
| UI          | React 19 + Tailwind CSS v4                 |
| Ícones      | lucide-react                                |
| Tipos       | TypeScript 5.7                             |
| DB          | MySQL (Railway) via Prisma 6               |
| Auth        | `jose` (JWT) + `bcryptjs` + cookie         |
| Storage     | Firebase Admin SDK (capas)                 |
| Datas       | date-fns (locale pt-BR)                    |
| Validação   | zod                                        |
| Hosting     | Vercel                                     |

## Setup local

**Requisitos:** Node 20+, MySQL acessível (local, Railway, PlanetScale, etc.), conta Firebase (opcional, só pro upload de capas).

```bash
# 1. clone e instala
git clone https://github.com/DinizGui/blog.git
cd blog
npm install

# 2. copia o .env de exemplo e preenche
cp .env.example .env

# 3. aplica as migrations e popula com posts de exemplo
npx prisma migrate dev
npm run db:seed

# 4. roda em http://localhost:3000
npm run dev
```

## Variáveis de ambiente

```env
# Banco
DATABASE_URL="mysql://USER:PASS@HOST:PORT/DATABASE"

# Auth (32+ bytes aleatórios)
# Gere com: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
AUTH_SECRET="..."

# E-mails (vírgula separada) que viram admin ao cadastrar/logar
ADMIN_EMAILS="seu@email.com"

# URL pública do site — usada para OG/canonical
NEXT_PUBLIC_SITE_URL="https://seu-blog.vercel.app"

# Firebase Storage (necessário só se for usar upload de capas no painel)
FIREBASE_PROJECT_ID="..."
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-...@....iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET="seu-bucket.firebasestorage.app"
```

## Scripts

| Comando                 | O que faz                                                     |
| ----------------------- | ------------------------------------------------------------- |
| `npm run dev`           | Dev server em `http://localhost:3000`                         |
| `npm run build`         | `prisma generate` + `prisma migrate deploy` + `next build`    |
| `npm start`             | Sobe a build de produção                                      |
| `npm run lint`          | Lint do Next                                                  |
| `npm run db:seed`       | Popula o banco com posts iniciais (`prisma/seed.ts`)          |
| `npm run prisma:migrate`| `prisma migrate dev` — cria/aplica migrations em dev          |
| `npm run prisma:studio` | Abre o Prisma Studio                                          |

## Estrutura

```
src/
├── app/
│   ├── about/             # /about — bio + stack + trajetória
│   ├── articles/          # /articles — arquivo com filtro por categoria/tag
│   ├── login/             # /login — formulário de entrada
│   ├── register/          # /register — cadastro
│   ├── painel/            # /painel — CRUD (Server Actions, restrito a admin)
│   │   ├── [id]/
│   │   ├── novo/
│   │   ├── actions.ts
│   │   └── upload-actions.ts
│   ├── post/[slug]/       # página individual do post
│   ├── error.tsx          # boundary global (mostra digest pra debug)
│   ├── globals.css        # tokens (light/dark) + componentes utilitários
│   └── layout.tsx
├── components/            # Header, Footer, Hero, PostCard, PostListItem,
│                          # Sidebar, PostTOC, ScrollProgress, ThemeToggle, etc.
├── lib/
│   ├── auth.ts            # sessão JWT + cookies
│   ├── firebase.ts        # admin SDK p/ upload de capas
│   ├── posts.ts           # queries do Prisma (server-only)
│   ├── prisma.ts          # client singleton
│   ├── seo.ts             # SITE config + helpers de URL
│   └── utils.ts           # cn, slugify, readingTime
├── middleware.ts          # protege /painel
└── types/index.ts         # tipos Post, Author
prisma/
├── schema.prisma          # models User + Post
├── migrations/
└── seed.ts
```

## Deploy

O blog está hospedado na Vercel. Para subir uma cópia:

1. Faz fork do repo.
2. Conecta à Vercel e aponta para o fork.
3. Configura **todas** as variáveis de ambiente listadas acima nos *Environment Variables* da Vercel.
4. O `build` da Vercel já roda `prisma migrate deploy` (definido no `package.json`), então as migrations são aplicadas no banco apontado por `DATABASE_URL`.
5. No primeiro deploy, rode o seed manualmente uma vez (`npm run db:seed`) contra o banco de produção, ou crie posts pelo painel.

> Cadastre-se com um dos e-mails listados em `ADMIN_EMAILS` pra ganhar acesso ao `/painel`.

## Licença

[MIT](./LICENSE) © Guilherme Diniz
