import CoursesCatalogClient from './courses-catalog-client'
import { getAllCourses, getCourseCategories } from '@/lib/data'

const Courses = () => {
  const courses = getAllCourses()
  const categories = getCourseCategories()

  return (
    <section className="pad-section">
      <div className="container">
        <div className="stack">
          <div className="section-head">
            <span className="eyebrow">Catalog</span>
            <h2 className="title-page">All Courses</h2>
            <p className="text-muted max-prose">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus quod itaque temporibus accusamus ut vero a dolor eaque
              eius officia!
            </p>
          </div>

          <CoursesCatalogClient courses={courses} categories={categories} />
        </div>
      </div>
    </section>
  )
}

export default Courses
