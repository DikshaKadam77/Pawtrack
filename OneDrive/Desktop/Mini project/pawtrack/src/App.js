"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import Header from "./Components/Header"
import Hero from "./Components/Hero"
import Problem from "./Components/Problem"
import HowItWorks from "./Components/HowItWorks"
import ImpactStats from "./Components/ImpactStats"
import JoinMission from "./Components/JoinMission"
import Footer from "./Components/Footer"
import LoginPage from "./pages/login"
import ReportAnimal from "./pages/ReportAnimal"
import NGODashboard from "./pages/NGODashboard"
import DonatePage from "./pages/Donatepage"
import "./pages/login.css"
import "./pages/ReportAnimal.css"
import ScanQR from "./pages/ScanQR"
import "./pages/donatepage.css"
import "./styles.css"

// Home page component
const HomePage = () => {
  useEffect(() => {
    // Add scroll-triggered animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll(".animate-on-scroll")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

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
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/report" element={<ReportAnimal />} />
        <Route path="/dashboard" element={<NGODashboard />} />
        <Route path="/scan" element={<ScanQR />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
