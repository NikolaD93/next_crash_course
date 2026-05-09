'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOutAction } from '@/actions/auth'

export function NavAuth({ isLoggedIn }: { isLoggedIn: boolean }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/register'

  if (isLoggedIn) {
    return (
      <form action={signOutAction}>
        <button type="submit" className="btn btn-primary btn-sm nav-logout-btn">
          Logout
        </button>
      </form>
    )
  }

  if (isAuthPage) return null

  if (pathname === '/') {
    return <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
  }

  return (
    <>
      <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
      <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
    </>
  )
}
