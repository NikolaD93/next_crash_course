'use client'

import Link from 'next/link'
import { useState } from 'react'
import { instructors, Course } from '@/lib/data'

function instructorNameForCourse(course: Course): string {
  return (
    instructors.find((i) => i.slug === course.instructorSlug)?.name ??
    'Unknown instructor'
  )
}

const CoursesCatalogClient = ({
  courses,
  levels,
  categories,
}: {
  courses: Course[]
  levels: string[]
  categories: string[]
}) => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [level, setLevel] = useState('all')

  const isFiltered = search !== '' || category !== 'all' || level !== 'all'

  const resetFilters = () => {
    setSearch('')
    setCategory('all')
    setLevel('all')
  }

  const filtered = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase())
    const matchesCategory = category === 'all' || course.category === category
    const matchesLevel = level === 'all' || course.level === level
    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="stack-md">
      <div className="panel">
        <div className="grid-filters">
          <div className="field">
            <label htmlFor="course-search" className="field-label">
              Search by title
            </label>
            <input
              id="course-search"
              type="text"
              className="input"
              placeholder="e.g. Next.js"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="course-category" className="field-label">
              Category
            </label>
            <select
              id="course-category"
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              {categories.map((c, idx) => (
                <option key={idx} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="course-level" className="field-label">
              Level
            </label>
            <select
              id="course-level"
              className="input"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="all">All</option>
              {levels.map((l, idx) => (
                <option key={idx} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>
        {isFiltered && (
          <button type="button" className="btn-link" onClick={resetFilters}>
            Reset filters
          </button>
        )}
      </div>

      <div className="grid-cards">
        {filtered.map((course) => (
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
              <span className="">By {instructorNameForCourse(course)}</span>
              <span className="card-footer-cta">View course</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CoursesCatalogClient
