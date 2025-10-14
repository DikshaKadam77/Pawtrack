
import { Camera, MapPin, Users, Heart } from "lucide-react"

const features = [
  {
    icon: Camera,
    title: "Easy Reporting",
    description: "Snap a photo and report stray animals in seconds. Our AI helps identify urgent cases automatically.",
  },
  {
    icon: MapPin,
    title: "Centralized Tracking",
    description:
      "All reports are tracked in one place, making it easy for NGOs and volunteers to coordinate rescue efforts.",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Connect with local NGOs, volunteers, and fellow animal lovers to create a stronger rescue network.",
  },
  {
    icon: Heart,
    title: "Real Impact",
    description: "Track the animals you've helped rescue and see the real difference you're making in their lives.",
  },
]

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Our platform makes animal rescue simple, efficient, and impactful through technology and community
            collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="animate-on-scroll group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="feature-card">
                  <div className="feature-icon">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks