export interface Author {
  name: string
  avatar: string
  bio: string
}

export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage: string
  readTime: number
  featured: boolean
  publishedAt: string
  updatedAt: string
  author: Author
}
