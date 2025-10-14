
import { Camera, QrCode, ArrowRight, MapPin, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const liveFeedCards = [
    { icon: MapPin, title: "Injured Dog Spotted", subtitle: "Near Karjat Station" },
    { icon: Shield, title: "NGO Dispatched", subtitle: "Animal Angels Team" },
    { icon: Heart, title: "Animal Rescued", subtitle: "Receiving Care" },
  ];

  return (
    <section className="hero-section">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content (No changes) */}
          <div className="animate-on-scroll hero-text-content space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Saving Lives, One <span className="gradient-text">QR Code</span> at a Time
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                Paw Track connects citizens, NGOs, and volunteers in Karjat to rescue and track stray animals efficiently. Join our mission to create a safer world for our four-legged friends.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/report-animal" className="btn btn-primary btn-lg group btn-glow">
                <Camera className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Report an Animal
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/scan" className="btn btn-outline btn-lg">
                <QrCode className="w-5 h-5 mr-2" />
                Scan QR Code
              </Link>
            </div>
          </div>

          {/* --- NEW & UNIQUE RIGHT COLUMN --- */}
          <div className="animate-on-scroll hero-image-wrapper">
            <div className="orbital-container">
              {/* Central Glowing Icon */}
              <div className="central-icon">
                <MapPin className="w-8 h-8" />
              </div>

              {/* Decorative Background Orbits */}
              <div className="orbit-path orbit-path-1"></div>
              <div className="orbit-path orbit-path-2"></div>

              {/* The Orbiting Cards */}
              {liveFeedCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div key={index} className={`feed-card card-${index + 1}`}>
                    <div className="feed-card-icon">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{card.title}</p>
                      <p className="text-sm text-muted-foreground">{card.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;