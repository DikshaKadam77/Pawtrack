import { Camera, QrCode, ArrowRight } from "lucide-react"

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="animate-on-scroll space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Saving Lives, One <span className="gradient-text">QR Code</span> at a Time
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                Paw Track connects citizens, NGOs, and volunteers to rescue and track stray animals efficiently. Join
                our mission to create a safer world for our four-legged friends.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn btn-primary btn-lg group">
                <Camera className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Report an Animal
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn btn-outline btn-lg">
                <QrCode className="w-5 h-5 mr-2" />
                Scan QR Code
              </button>
            </div>
          </div>

          {/* Right Column - Hero Image */}
          <div className="animate-on-scroll lg:order-last">
            <div className="hero-image-container">
              <div className="hero-image-blur"></div>
              <img
                src="photo1.jpg"
                alt="Happy rescued golden retriever being cared for by volunteers"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero