import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="container-blog py-32">
      <div className="text-center max-w-lg mx-auto">
        <p className="text-7xl font-extrabold text-foreground mb-4 tracking-tight">404</p>
        <h1 className="text-2xl font-bold text-foreground mb-3 tracking-tight">
          Página não encontrada
        </h1>
        <p className="text-muted mb-8">
          A URL não bate com nenhum post nem rota do blog.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          <Home size={15} /> Voltar pro início
        </Link>
      </div>
    </div>
  )
}
