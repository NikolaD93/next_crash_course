'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { signInAction, type AuthState } from '@/actions/auth'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" className="btn btn-primary auth-submit" disabled={pending}>
      {pending ? <span className="btn-spinner" /> : 'Sign in'}
    </button>
  )
}

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`toast toast--${type}`} role="alert">
      {message}
    </div>
  )
}

const Form = () => {
  const [state, action] = useActionState<AuthState, FormData>(signInAction, null)
  const [dismissedState, setDismissedState] = useState<AuthState>(null)
  const router = useRouter()

  const toast =
    state && state !== dismissedState
      ? state.success
        ? { message: 'Signed in! Redirecting…', type: 'success' as const }
        : state.error
          ? { message: state.error, type: 'error' as const }
          : null
      : null

  useEffect(() => {
    if (!state?.success) return
    const timer = setTimeout(() => router.push('/courses'), 1500)
    return () => clearTimeout(timer)
  }, [state, router])

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setDismissedState(state), 4000)
    return () => clearTimeout(timer)
  }, [state, toast])

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <form action={action} className="auth-form">
        <div className="field">
          <label htmlFor="email" className="field-label">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            placeholder="jane@example.com"
            autoComplete="email"
          />
        </div>

        <div className="field">
          <label htmlFor="password" className="field-label">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className="input"
            placeholder="Your password"
            autoComplete="current-password"
          />
        </div>

        <SubmitButton />
      </form>
    </>
  )
}

export default Form
