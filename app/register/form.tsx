'use client'

import { useActionState, useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { signUpAction, type AuthState } from '@/actions/auth'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      className="btn btn-primary auth-submit"
      disabled={pending}
    >
      {pending ? <span className="btn-spinner" /> : 'Create account'}
    </button>
  )
}

function Toast({
  message,
  type,
}: {
  message: string
  type: 'success' | 'error'
}) {
  return (
    <div className={`toast toast--${type}`} role="alert">
      {message}
    </div>
  )
}

const Form = () => {
  const [state, action] = useActionState<AuthState, FormData>(
    signUpAction,
    null
  )
  // tracks which state has been dismissed so the toast hides after the timer
  const [dismissedState, setDismissedState] = useState<AuthState>(null)
  const router = useRouter()

  // derive toast directly from state — no setState in effect body
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toast =
    state && state !== dismissedState
      ? state.success
        ? { message: 'Account created! Redirecting…', type: 'success' as const }
        : state.error
          ? { message: state.error, type: 'error' as const }
          : null
      : null

  // redirect after success
  useEffect(() => {
    if (!state?.success) return
    const timer = setTimeout(() => router.push('/courses'), 1500)
    return () => clearTimeout(timer)
  }, [state, router])

  // auto-dismiss: setState inside a timeout callback, not synchronously
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setDismissedState(state), 4000)
    return () => clearTimeout(timer)
  }, [state, toast])

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} />}

      <form action={action} className="auth-form">
        <div className="auth-form-row">
          <div className="field">
            <label htmlFor="firstName" className="field-label">
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="input"
              placeholder="Jane"
              autoComplete="given-name"
            />
          </div>

          <div className="field">
            <label htmlFor="lastName" className="field-label">
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="input"
              placeholder="Doe"
              autoComplete="family-name"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="email" className="field-label">
            Email address
          </label>
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
          <label htmlFor="country" className="field-label">
            Country
          </label>
          <input
            id="country"
            name="country"
            type="text"
            className="input"
            placeholder="United States"
            autoComplete="country-name"
          />
        </div>

        <div className="field">
          <label htmlFor="skillLevel" className="field-label">
            Skill level
          </label>
          <select id="skillLevel" name="skillLevel" className="select">
            <option value="">Select your level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="password" className="field-label">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="input"
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
        </div>

        <div className="field">
          <label htmlFor="confirmPassword" className="field-label">
            Confirm password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="input"
            placeholder="Repeat your password"
            autoComplete="new-password"
          />
        </div>

        <SubmitButton />
      </form>
    </>
  )
}

export default Form
