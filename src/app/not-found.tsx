import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-blog py-32">
      <div className="text-center max-w-lg mx-auto">
        <p
          className="text-7xl font-extrabold text-gradient mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          404
        </p>
        <h1
          className="text-2xl font-bold text-white mb-3"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Página não encontrada
        </h1>
        <p className="text-slate-400 mb-8">
          A URL não bate com nenhum post nem rota do blog.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          <Home size={15} /> Voltar pro início
        </Link>
      </div>
    </div>
  )
}
