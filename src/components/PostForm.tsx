'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Loader2, Save } from 'lucide-react'
import { CATEGORY_OPTIONS } from '@/lib/utils'
import type { Post } from '@/types'
import type { FormState } from '@/app/painel/actions'

interface Props {
  action: (state: FormState, formData: FormData) => Promise<FormState>
  initial?: Post
  submitLabel?: string
}

export function PostForm({ action, initial, submitLabel = 'Publicar' }: Props) {
  const [state, formAction] = useActionState<FormState, FormData>(action, null)
  const [content, setContent] = useState(initial?.content ?? '')
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0
  const minutes = Math.max(1, Math.round(wordCount / 200))

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
            <span className="text-xs text-zinc-500 font-mono">
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
          <p className="mt-2 text-xs text-zinc-500">
            Suporta <code className="text-zinc-300">## headers</code>,{' '}
            <code className="text-zinc-300">**bold**</code>,{' '}
            <code className="text-zinc-300">`code`</code>, blocos{' '}
            <code className="text-zinc-300">```</code>, listas e citações <code className="text-zinc-300">&gt;</code>.
          </p>
        </div>

        {state && !state.ok && (
          <div className="text-sm text-red-300 border border-red-900/60 bg-red-950/40 rounded-md px-3 py-2 animate-fade-in">
            {state.error}
          </div>
        )}

        <SubmitBar label={submitLabel} />
      </div>

      <aside>
        <div className="border border-zinc-800 rounded-xl p-5 space-y-5 sticky top-20 bg-zinc-900/30">
          <div>
            <label htmlFor="category" className="label">Categoria</label>
            <select
              id="category"
              name="category"
              defaultValue={initial?.category ?? 'Aprendizado'}
              className="input-field appearance-none cursor-pointer"
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c} value={c} className="bg-zinc-950 text-white">
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
            <label htmlFor="coverImage" className="label">URL da capa (opcional)</label>
            <input
              id="coverImage"
              name="coverImage"
              type="url"
              defaultValue={initial?.coverImage}
              placeholder="https://images.unsplash.com/…"
              className="input-field"
            />
            <p className="text-[11px] text-zinc-500 mt-1.5">
              Vazio = capa automática pela categoria.
            </p>
          </div>

          <div className="border-t border-zinc-800 pt-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={initial?.featured}
                className="mt-0.5 w-4 h-4 rounded border-zinc-700 bg-zinc-950 accent-zinc-300"
              />
              <div>
                <span className="block text-sm text-zinc-200 font-medium">Marcar como destaque</span>
                <span className="text-xs text-zinc-500">Aparece no topo da home. Só um por vez.</span>
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
    <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
      <button type="submit" disabled={pending} className="btn-primary mt-4">
        {pending ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
        {pending ? 'Salvando…' : label}
      </button>
    </div>
  )
}
