import Link from 'next/link'
import Form from './form'

const Login = () => {
  return (
    <section className="auth-section">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue learning</p>
        </div>

        <Form />

        <p className="auth-footer-text">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="link-brand">
            Create one free
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Login
