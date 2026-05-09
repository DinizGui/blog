import 'server-only'
import { prisma } from '@/lib/prisma'
import type { Post } from '@/types'

function toPost(row: Awaited<ReturnType<typeof prisma.post.findFirstOrThrow>>): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    coverImage: row.coverImage,
    readTime: row.readTime,
    featured: row.featured,
    publishedAt: row.publishedAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    author: {
      name: row.authorName,
      avatar: row.authorAvatar,
      bio: row.authorBio,
    },
  }
}

export async function listPosts(): Promise<Post[]> {
  const rows = await prisma.post.findMany({
    orderBy: { publishedAt: 'desc' },
  })
  return rows.map(toPost)
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const row = await prisma.post.findUnique({ where: { slug } })
  return row ? toPost(row) : null
}

export async function getPostById(id: string): Promise<Post | null> {
  const row = await prisma.post.findUnique({ where: { id } })
  return row ? toPost(row) : null
}

export async function getFeatured(): Promise<Post | null> {
  const row =
    (await prisma.post.findFirst({
      where: { featured: true },
      orderBy: { publishedAt: 'desc' },
    })) ??
    (await prisma.post.findFirst({ orderBy: { publishedAt: 'desc' } }))
  return row ? toPost(row) : null
}

export async function listCategories(): Promise<{ name: string; count: number }[]> {
  const rows = await prisma.post.groupBy({
    by: ['category'],
    _count: { _all: true },
  })
  return rows
    .map((r) => ({ name: r.category, count: r._count._all }))
    .sort((a, b) => b.count - a.count)
}

export async function listAllTags(): Promise<string[]> {
  const rows = await prisma.post.findMany({ select: { tags: true } })
  const set = new Set<string>()
  for (const r of rows) {
    const tags = Array.isArray(r.tags) ? (r.tags as string[]) : []
    tags.forEach((t) => set.add(t))
  }
  return Array.from(set).slice(0, 24)
}
