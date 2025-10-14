const Problem = () => {
  return (
    <section className="problem-section animate-on-scroll">
      <div className="container">
        <div className="problem-content">
          <div className="problem-text">
            <h2 className="problem-title">The Problem We're Solving</h2>
            <ul className="problem-list">
              <li className="problem-item">
                <span className="bullet-point"></span>
                Citizens find injured animals but don't know if they've already been treated
              </li>
              <li className="problem-item">
                <span className="bullet-point"></span>
                NGOs waste resources on duplicate treatments due to poor coordination
              </li>
              <li className="problem-item">
                <span className="bullet-point"></span>
                No unified platform for reporting and tracking animal rescue efforts
              </li>
            </ul>
          </div>
          <div className="problem-image">
            <img
              src="Photo2.jpg"
              alt="Injured dog lying on pavement"
              className="problem-img"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problem
