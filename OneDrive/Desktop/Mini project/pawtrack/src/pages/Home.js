import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Camera,
  QrCode,
  ArrowRight,
  MapPin,
  Shield,
  Heart,
  Users,
} from "lucide-react";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

// --- Section Components ---

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
              <Link to="/report" className="btn btn-primary btn-lg group btn-glow">
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
          <div className="animate-on-scroll hero-image-wrapper">
            <div className="orbital-container">
              <div className="central-icon"><MapPin className="w-8 h-8" /></div>
              <div className="orbit-path orbit-path-1"></div>
              <div className="orbit-path orbit-path-2"></div>
              {liveFeedCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div key={index} className={`feed-card card-${index + 1}`}>
                    <div className="feed-card-icon"><Icon className="w-5 h-5" /></div>
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

const Problem = () => (
  <section className="problem-section animate-on-scroll">
    <div className="container">
      <div className="problem-content">
        <div className="problem-text">
          <h2 className="problem-title">The Problem We're Solving</h2>
          <ul className="problem-list">
            <li className="problem-item"><span className="bullet-point"></span>Citizens find injured animals but don't know if they've already been treated</li>
            <li className="problem-item"><span className="bullet-point"></span>NGOs waste resources on duplicate treatments due to poor coordination</li>
            <li className="problem-item"><span className="bullet-point"></span>No unified platform for reporting and tracking animal rescue efforts</li>
          </ul>
        </div>
        <div className="problem-image"><img src="Photo2.jpg" alt="Injured dog lying on pavement" className="problem-img" /></div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => {
    const features = [
        { icon: Camera, title: "Easy Reporting", description: "Snap a photo and report stray animals in seconds. Our AI helps identify urgent cases automatically." },
        { icon: MapPin, title: "Centralized Tracking", description: "All reports are tracked in one place, making it easy for NGOs and volunteers to coordinate rescue efforts." },
        { icon: Users, title: "Community Network", description: "Connect with local NGOs, volunteers, and fellow animal lovers to create a stronger rescue network." },
        { icon: Heart, title: "Real Impact", description: "Track the animals you've helped rescue and see the real difference you're making in their lives." },
    ];
    return (
        <section className="py-20 lg:py-32 bg-background">
            <div className="container">
                <div className="text-center mb-16 animate-on-scroll">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">How It Works</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">Our platform makes animal rescue simple, efficient, and impactful through technology and community collaboration.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={feature.title} className="animate-on-scroll group" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="feature-card">
                                    <div className="feature-icon"><Icon className="w-8 h-8 text-primary" /></div>
                                    <h3 className="text-xl font-bold text-card-foreground mb-4">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let startTime;
                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    setCount(Math.floor((1 - Math.pow(1 - progress, 4)) * end));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                observer.unobserve(ref.current);
            }
        }, { threshold: 0.5 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end, duration]);
    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const ImpactStats = () => {
    const stats = [
        { number: 500, label: "Animals Rescued", suffix: "+" },
        { number: 50, label: "Partner NGOs", suffix: "+" },
        { number: 1000, label: "Active Volunteers", suffix: "+" },
        { number: 25, label: "Cities Covered", suffix: "" },
    ];
    return (
        <section className="stats-section">
            <div className="stats-pattern"></div>
            <div className="container relative">
                <div className="text-center mb-16 animate-on-scroll"><h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">Making a Real Impact</h2></div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={stat.label} className="animate-on-scroll group" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="stat-card">
                                <div className="stat-number"><AnimatedCounter end={stat.number} suffix={stat.suffix} /></div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const JoinMission = () => (
  <section className="join-mission animate-on-scroll">
    <div className="container">
      <h2 className="join-mission-title">Join Our Mission</h2>
      <p className="join-mission-subtitle">Whether you're a concerned citizen, NGO, or volunteer, you can make a difference in animal welfare</p>
      <div className="join-mission-buttons">
        <Link to="/report" className="btn btn-primary btn-lg group btn-glow">
          <Camera className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
          Report an Animal
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/login" className="btn btn-secondary">Join as NGO/Volunteer</Link>
      </div>
    </div>
  </section>
);

// --- Main Home Component ---

const Home = () => {
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".animate-on-scroll");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <ImpactStats />
        <JoinMission />
      </main>
      <Footer />
    </div>
  );
};

export default Home;