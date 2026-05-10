'use server'

import { randomUUID } from 'crypto'
import { requireAdmin } from '@/lib/auth'
import { getBucket } from '@/lib/firebase'

const MAX_BYTES = 5 * 1024 * 1024
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'])

export type UploadResult = { ok: true; url: string } | { ok: false; error: string }

export async function uploadCoverImageAction(formData: FormData): Promise<UploadResult> {
  try {
    await requireAdmin()
  } catch {
    return { ok: false, error: 'Acesso restrito ao administrador' }
  }

  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: 'Arquivo ausente' }
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: 'Arquivo maior que 5MB' }
  }
  if (!ALLOWED.has(file.type)) {
    return { ok: false, error: 'Formato não suportado (use JPG, PNG, WebP, AVIF ou GIF)' }
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || file.type.split('/')[1] || 'bin'
  const objectName = `covers/${randomUUID()}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  try {
    const bucket = getBucket()
    const blob = bucket.file(objectName)
    await blob.save(buffer, {
      contentType: file.type,
      resumable: false,
      metadata: { cacheControl: 'public, max-age=31536000, immutable' },
    })
    await blob.makePublic()
    return { ok: true, url: `https://storage.googleapis.com/${bucket.name}/${objectName}` }
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Falha ao enviar arquivo'
    return { ok: false, error: msg }
  }
}
