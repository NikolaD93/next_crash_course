import { getCourseById } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const CourseDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const course = getCourseById(id)
  if (!course) notFound()

  return (
    <section className="pad-section">
      <div className="container">
        <Link href="/courses">Back to courses</Link>
      </div>

      <div className="course-layout">
        <h2>{course.title}</h2>
      </div>
    </section>
  )
}

export default CourseDetail
