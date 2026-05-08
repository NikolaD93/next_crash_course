import Link from 'next/link'

const Courses = () => {
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

          <div className="stack-md">
            <div className="grid-cards">
              <Link href="#" className="card-link">
                <div className="badge-row">
                  <span className="badge badge--brand">Web Development</span>
                  <span className="badge">Beginner</span>
                </div>

                <h3 className="card-link-title">HTML,CSS course</h3>
                <p className="card-link-body">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Delectus, similique?
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Courses
