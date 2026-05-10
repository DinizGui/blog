'use client'

import { useActionState, useRef, useState, useTransition } from 'react'
import { useFormStatus } from 'react-dom'
import { ImagePlus, Loader2, Save, X } from 'lucide-react'
import { CATEGORY_OPTIONS } from '@/lib/utils'
import type { Post } from '@/types'
import type { FormState } from '@/app/painel/actions'
import { uploadCoverImageAction } from '@/app/painel/upload-actions'

interface Props {
  action: (state: FormState, formData: FormData) => Promise<FormState>
  initial?: Post
  submitLabel?: string
}

export function PostForm({ action, initial, submitLabel = 'Publicar' }: Props) {
  const [state, formAction] = useActionState<FormState, FormData>(action, null)
  const [content, setContent] = useState(initial?.content ?? '')
  const [coverUrl, setCoverUrl] = useState(initial?.coverImage ?? '')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, startUpload] = useTransition()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const minutes = Math.max(1, Math.round(wordCount / 200))

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError(null)
    const fd = new FormData()
    fd.append('file', file)
    startUpload(async () => {
      const res = await uploadCoverImageAction(fd)
      if (res.ok) {
        setCoverUrl(res.url)
      } else {
        setUploadError(res.error)
      }
      if (fileInputRef.current) fileInputRef.current.value = ''
    })
  }

  function clearCover() {
    setCoverUrl('')
    setUploadError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <form action={formAction} className="grid lg:grid-cols-[1fr_280px] gap-8">
      <div className="space-y-5">
        <div>
          <label htmlFor="title" className="label">Título</label>
          <input
            id="title"
            name="title"
            required
            maxLength={220}
            defaultValue={initial?.title}
            placeholder="Como eu aprendi sobre Server Actions"
            className="input-field text-lg font-medium"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="label">Resumo (opcional)</label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            maxLength={400}
            defaultValue={initial?.excerpt}
            placeholder="Frase curta que aparece no preview e nos cards."
            className="input-field resize-none"
          />
        </div>

        <div>
          <div className="flex items-end justify-between mb-1.5">
            <label htmlFor="content" className="label !mb-0">Conteúdo (Markdown)</label>
            <span className="text-xs text-subtle font-mono">
              {wordCount} palavras · {minutes} min
            </span>
          </div>
          <textarea
            id="content"
            name="content"
            required
            rows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`## Subtítulo\n\nTexto normal com **negrito** e \`código\`.\n\n\`\`\`ts\nconst x = 1\n\`\`\`\n\n- item 1\n- item 2`}
            className="input-field font-mono text-sm leading-6"
            style={{ fontFamily: 'var(--font-mono)' }}
          />
          <p className="mt-2 text-xs text-subtle">
            Suporta <code className="text-foreground">## headers</code>,{' '}
            <code className="text-foreground">**bold**</code>,{' '}
            <code className="text-foreground">`code`</code>, blocos{' '}
            <code className="text-foreground">```</code>, listas e citações <code className="text-foreground">&gt;</code>.
          </p>
        </div>

        {state && !state.ok && (
          <div className="text-sm alert-danger px-3 py-2 animate-fade-in">
            {state.error}
          </div>
        )}

        <SubmitBar label={submitLabel} />
      </div>

      <aside>
        <div className="card-surface p-5 space-y-5 sticky top-20">
          <div>
            <label htmlFor="category" className="label">Categoria</label>
            <select
              id="category"
              name="category"
              defaultValue={initial?.category ?? 'Aprendizado'}
              className="input-field appearance-none cursor-pointer"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="tags" className="label">Tags (separadas por vírgula)</label>
            <input
              id="tags"
              name="tags"
              defaultValue={initial?.tags.join(', ')}
              placeholder="react, hooks, aprendizado"
              className="input-field"
            />
          </div>

          <div>
            <label htmlFor="coverImage" className="label">Capa (opcional)</label>
            <input type="hidden" name="coverImage" value={coverUrl} />

            {coverUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-line group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={coverUrl} alt="Pré-visualização da capa" className="w-full h-32 object-cover" />
                <button
                  type="button"
                  onClick={clearCover}
                  className="absolute top-2 right-2 p-1 rounded-md bg-black/70 text-white hover:bg-black transition opacity-0 group-hover:opacity-100"
                  aria-label="Remover capa"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-line-strong hover:border-accent/60 bg-input/40 hover:bg-input/80 transition px-3 py-6 text-sm text-muted hover:text-foreground disabled:opacity-60 disabled:cursor-wait"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Enviando…
                  </>
                ) : (
                  <>
                    <ImagePlus size={14} /> Enviar imagem
                  </>
                )}
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />

            <input
              type="url"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="…ou cole uma URL"
              className="input-field mt-2"
            />

            {uploadError && (
              <p className="text-[11px] text-danger mt-1.5">{uploadError}</p>
            )}
            <p className="text-[11px] text-subtle mt-1.5">
              Vazio = capa automática pela categoria. Máx. 5MB.
            </p>
          </div>

          <div className="border-t border-line pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={initial?.featured}
                className="mt-0.5 w-4 h-4 rounded border-line-strong bg-input"
                style={{ accentColor: 'var(--accent)' }}
              />
              <div>
                <span className="block text-sm text-foreground font-medium">Marcar como destaque</span>
                <span className="text-xs text-subtle">Aparece no topo da home. Só um por vez.</span>
              </div>
            </label>
          </div>
        </div>
      </aside>
    </form>
  )
}

function SubmitBar({ label }: { label: string }) {
  const { pending } = useFormStatus()
  return (
    <div className="flex items-center gap-3 pt-2 border-t border-line">
      <button type="submit" disabled={pending} className="btn-primary mt-4">
        {pending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        {pending ? 'Salvando…' : label}
      </button>
    </div>
  )
}
