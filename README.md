# Dev Junior

Blog pessoal de um dev junior — Next.js 15 (App Router) + Tailwind v4 + Prisma + MySQL.

## Setup

1. Cria `.env`:
   ```
   DATABASE_URL="mysql://user:senha@host:3306/devjunior"
   ```

2. Instala e migra o banco:
   ```bash
   npm install
   npx prisma migrate dev --name init
   npm run db:seed
   ```

3. Roda:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — dev server
- `npm run build` — build de produção (gera Prisma client + Next build)
- `npm run db:seed` — popula o banco com posts iniciais
- `npm run prisma:studio` — abre o Prisma Studio

## Estrutura

- `src/app/` — App Router (rotas)
- `src/app/painel/` — CRUD de posts (Server Actions)
- `src/components/` — Header, Footer, PostCard, Sidebar, PostForm, etc.
- `src/lib/posts.ts` — queries do Prisma
- `prisma/schema.prisma` — schema MySQL
