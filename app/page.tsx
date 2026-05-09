import Link from 'next/link'
import { getAllCourses, getAllInstructors, getCourseCategories } from '@/lib/data'

const FEATURES = [
  {
    title: 'Project-based learning',
    body: 'Every course ends with a real project you can add to your portfolio.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Expert instructors',
    body: 'Learn from practitioners who build things professionally every day.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Learn at your pace',
    body: 'No deadlines, no pressure. Access course material whenever it suits you.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

const CATEGORY_ABBR: Record<string, string> = {
  'Web Development': 'WD',
  'Design': 'DS',
  'Data': 'DA',
  'Mobile': 'MB',
  'DevOps': 'DO',
}

export default function Home() {
  const courses = getAllCourses()
  const instructors = getAllInstructors()
  const categories = getCourseCategories()

  const categoryCounts = categories.map((cat) => ({
    name: cat,
    count: courses.filter((c) => c.category === cat).length,
    abbr: CATEGORY_ABBR[cat] ?? cat.slice(0, 2).toUpperCase(),
  }))

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-blobs" aria-hidden="true">
          <span className="hero-blob hero-blob--1" />
          <span className="hero-blob hero-blob--2" />
          <span className="hero-blob hero-blob--3" />
        </div>
        <div className="container pad-hero">
          <div className="hero-inner">
            <span className="hero-pill">Learn. Build. Ship</span>
            <h1 className="hero-title">
              Practical courses for modern web development
            </h1>
            <p className="hero-lede">
              Hands-on courses taught by practitioners. Build real projects,
              learn at your pace, and ship code you&apos;re proud of.
            </p>
            <div className="hero-actions">
              <Link href="/courses" className="btn btn-primary">
                Browse Courses
              </Link>
              <Link href="/register" className="btn btn-ghost">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="container stats-inner">
          <div className="stat-item">
            <span className="stat-value">{courses.length}</span>
            <span className="stat-label">Courses</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item">
            <span className="stat-value">{instructors.length}</span>
            <span className="stat-label">Expert Instructors</span>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item">
            <span className="stat-value">{categories.length}</span>
            <span className="stat-label">Topic Areas</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="features-section pad-section">
        <div className="container">
          <div className="section-head section-head--center">
            <span className="eyebrow">Why LearnHub</span>
            <h2 className="title-page">Everything you need to level up</h2>
          </div>
          <div className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section pad-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Browse by topic</span>
            <h2 className="title-page">Find your area of interest</h2>
          </div>
          <div className="categories-grid">
            {categoryCounts.map((cat) => (
              <Link
                key={cat.name}
                href={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="category-card"
              >
                <span className="category-abbr">{cat.abbr}</span>
                <span className="category-name">{cat.name}</span>
                <span className="category-count">
                  {cat.count} {cat.count === 1 ? 'course' : 'courses'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-inner">
            <div className="cta-text">
              <h2 className="cta-title">Ready to start learning?</h2>
              <p className="cta-body">
                Join thousands of developers building real skills with LearnHub.
              </p>
            </div>
            <div className="cta-actions">
              <Link href="/register" className="btn btn-inverse">
                Create free account
              </Link>
              <Link href="/courses" className="btn btn-outline-white">
                Explore courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
