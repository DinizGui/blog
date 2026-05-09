import { Fragment } from 'react'

interface Props {
  content: string
}

function inlineFormat(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
}

export function MarkdownContent({ content }: Props) {
  const blocks = content.trim().split(/\n\n+/)

  return (
    <div className="prose-blog">
      {blocks.map((block, i) => {
        if (block.startsWith('## ')) {
          return <h2 key={i}>{block.slice(3)}</h2>
        }
        if (block.startsWith('### ')) {
          return <h3 key={i}>{block.slice(4)}</h3>
        }
        if (block.startsWith('```')) {
          const lines = block.split('\n')
          const lastFence = lines.lastIndexOf('```')
          const code = lines.slice(1, lastFence === -1 ? undefined : lastFence).join('\n')
          return (
            <pre key={i}>
              <code>{code}</code>
            </pre>
          )
        }
        if (block.startsWith('> ')) {
          return (
            <blockquote key={i}>
              {block
                .split('\n')
                .map((l) => l.replace(/^>\s?/, ''))
                .join(' ')}
            </blockquote>
          )
        }
        if (block.match(/^- /m)) {
          const items = block
            .split('\n')
            .filter((l) => l.startsWith('- '))
            .map((l) => l.slice(2))
          return (
            <ul key={i}>
              {items.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
              ))}
            </ul>
          )
        }
        if (block.match(/^\d+\. /m)) {
          const items = block
            .split('\n')
            .filter((l) => /^\d+\. /.test(l))
            .map((l) => l.replace(/^\d+\.\s*/, ''))
          return (
            <ol key={i}>
              {items.map((item, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
              ))}
            </ol>
          )
        }
        const html = block
          .split('\n')
          .map((l) => inlineFormat(l))
          .join('<br />')
        return <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
      })}
      <Fragment />
    </div>
  )
}
