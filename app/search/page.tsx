import type { Course } from '@/lib/data'
import { headers } from 'next/headers'
import Link from 'next/link'

async function fetchCoursesFromApi(
  q: string
): Promise<{ count: number; courses: Course[] } | null> {
  const headersList = await headers()
  const host = headersList.get('host') ?? 'localhost:3000'
  const protocol = headersList.get('x-forwarded-proto') ?? 'http'
  const url = `${protocol}://${host}/api/courses?q=${encodeURIComponent(q)}`

  const res = await fetch(url, { cache: 'no-store' })

  if (!res.ok) return null
  return res.json()
}

const Search = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) => {
  const sp = await searchParams
  const trimmed = sp.q?.trim()

  if (!trimmed) {
    return (
      <section className="pad-section">
        <div className="container">
          <p className="text-muted">Enter a search term to find courses.</p>
        </div>
      </section>
    )
  }

  const data = await fetchCoursesFromApi(trimmed)

  if (!data) {
    return (
      <section className="pad-section">
        <div className="container">
          <p className="text-muted">Something went wrong. Please try again.</p>
        </div>
      </section>
    )
  }

  const { count, courses } = data

  return (
    <section className="pad-section">
      <div className="container">
        <div className="stack">
          <div className="section-head">
            <h2 className="title-page">Results for &ldquo;{trimmed}&rdquo;</h2>
            <p className="text-muted">
              {count} {count === 1 ? 'course' : 'courses'} found
            </p>
          </div>

          {count === 0 ? (
            <p className="text-muted">No courses matched your search.</p>
          ) : (
            <div className="grid-cards">
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="card-link"
                >
                  <div className="badge-row">
                    <span className="badge badge--brand">{course.category}</span>
                    <span className="badge">{course.level}</span>
                  </div>

                  <h3 className="card-link-title">{course.title}</h3>
                  <p className="card-link-body">{course.shortDescription}</p>

                  <dl className="card-meta">
                    <div>
                      <dt>Lessons</dt>
                      <dd>{course.lessonsCount}</dd>
                    </div>
                    <div>
                      <dt>Duration</dt>
                      <dd>{course.duration}</dd>
                    </div>
                  </dl>

                  <div className="card-footer">
                    <span className="card-footer-cta">View course</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Search
