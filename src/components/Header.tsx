import { getSession } from '@/lib/auth'
import { HeaderNav } from '@/components/HeaderNav'

export async function Header() {
  const session = await getSession()
  return <HeaderNav user={session} />
}
