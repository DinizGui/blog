'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { slugify, readingTime, pickCoverByCategory } from '@/lib/utils'

const PostSchema = z.object({
  title: z.string().min(3, 'Título precisa ter pelo menos 3 caracteres').max(220),
  excerpt: z.string().max(400).optional().default(''),
  content: z.string().min(20, 'Conteúdo precisa ter pelo menos 20 caracteres'),
  category: z.string().min(1).max(60),
  tags: z.string().optional().default(''),
  coverImage: z.string().url().optional().or(z.literal('')).default(''),
  featured: z.union([z.string(), z.boolean(), z.literal('on')]).optional(),
})

export type FormState =
  | { ok: true; slug: string }
  | { ok: false; error: string }
  | null

function parseTags(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 12)
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  let slug = base || 'post'
  let n = 1
  // tenta até 50x — bom o suficiente
  while (n < 50) {
    const existing = await prisma.post.findUnique({ where: { slug } })
    if (!existing || existing.id === ignoreId) return slug
    n++
    slug = `${base}-${n}`
  }
  return `${base}-${Date.now()}`
}

export async function createPostAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = PostSchema.safeParse({
    title: formData.get('title'),
    excerpt: formData.get('excerpt') ?? '',
    content: formData.get('content'),
    category: formData.get('category'),
    tags: formData.get('tags') ?? '',
    coverImage: formData.get('coverImage') ?? '',
    featured: formData.get('featured') ?? false,
  })

  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? 'Dados inválidos' }
  }

  const data = parsed.data
  const baseSlug = slugify(data.title)
  const slug = await uniqueSlug(baseSlug)
  const isFeatured = !!data.featured

  if (isFeatured) {
    await prisma.post.updateMany({ where: { featured: true }, data: { featured: false } })
  }

  await prisma.post.create({
    data: {
      title: data.title.trim(),
      slug,
      excerpt: data.excerpt.trim() || data.content.slice(0, 160).trim() + '…',
      content: data.content.trim(),
      category: data.category,
      tags: parseTags(data.tags),
      coverImage: data.coverImage || pickCoverByCategory(data.category, slug),
      readTime: readingTime(data.content),
      featured: isFeatured,
    },
  })

  revalidatePath('/')
  revalidatePath('/articles')
  revalidatePath('/painel')
  redirect(`/post/${slug}`)
}

export async function updatePostAction(
  id: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = PostSchema.safeParse({
    title: formData.get('title'),
    excerpt: formData.get('excerpt') ?? '',
    content: formData.get('content'),
    category: formData.get('category'),
    tags: formData.get('tags') ?? '',
    coverImage: formData.get('coverImage') ?? '',
    featured: formData.get('featured') ?? false,
  })

  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? 'Dados inválidos' }
  }

  const data = parsed.data
  const current = await prisma.post.findUnique({ where: { id } })
  if (!current) return { ok: false, error: 'Post não encontrado' }

  const newBase = slugify(data.title)
  const slug =
    newBase === current.slug.replace(/-\d+$/, '') || newBase === current.slug
      ? current.slug
      : await uniqueSlug(newBase, id)

  const isFeatured = !!data.featured
  if (isFeatured && !current.featured) {
    await prisma.post.updateMany({ where: { featured: true }, data: { featured: false } })
  }

  await prisma.post.update({
    where: { id },
    data: {
      title: data.title.trim(),
      slug,
      excerpt: data.excerpt.trim() || data.content.slice(0, 160).trim() + '…',
      content: data.content.trim(),
      category: data.category,
      tags: parseTags(data.tags),
      coverImage: data.coverImage || current.coverImage,
      readTime: readingTime(data.content),
      featured: isFeatured,
    },
  })

  revalidatePath('/')
  revalidatePath('/articles')
  revalidatePath('/painel')
  revalidatePath(`/post/${slug}`)
  redirect(`/post/${slug}`)
}

export async function deletePostAction(id: string): Promise<void> {
  await prisma.post.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/articles')
  revalidatePath('/painel')
}
