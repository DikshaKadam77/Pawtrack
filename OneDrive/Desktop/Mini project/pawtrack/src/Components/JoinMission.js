import { Camera, QrCode, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
const JoinMission = () => {
  return (
    <section className="join-mission animate-on-scroll">
      <div className="container">
        <h2 className="join-mission-title">Join Our Mission</h2>
        <p className="join-mission-subtitle">
          Whether you're a concerned citizen, NGO, or volunteer, you can make a difference in animal welfare
        </p>
        <div className="join-mission-buttons">
                     <Link to="/report" className="btn btn-primary btn-lg group btn-glow">
                <Camera className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Report an Animal
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="btn btn-secondary">
                Join as NGO/Volunteer
              </Link>
        </div>
      </div>
    </section>
  )
}

export default JoinMission