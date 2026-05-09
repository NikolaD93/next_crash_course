import Link from 'next/link'
import Form from './form'

const Register = () => {
  return (
    <section className="auth-section">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Start learning today — free forever</p>
        </div>

        <Form />

        <p className="auth-footer-text">
          Already have an account?{' '}
          <Link href="/login" className="link-brand">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  )
}

export default Register
