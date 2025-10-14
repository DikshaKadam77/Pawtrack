"use client"

import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Heart, Plus, BarChart3, QrCode, CreditCard, DollarSign, LogIn } from "lucide-react"

const Header = () => {
  const [activeLink, setActiveLink] = useState("home")
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    if (path === "/") {
      setActiveLink("home")
    } else if (path === "/login") {
      setActiveLink("login")
    } else if (path === "/report") {
      setActiveLink("report")
    } else if (path === "/dashboard") {
      setActiveLink("dashboard")
    } else if (path === "/scan") {
      setActiveLink("scan")
    } else if (path === "/pricing") {
      setActiveLink("pricing")
    } else {
      setActiveLink("")
    }
  }, [location.pathname])

  const navItems = [
    { id: "home", label: "Home", icon: Heart },
    { id: "report", label: "Report Animal", icon: Plus },
    { id: "dashboard", label: "NGO Dashboard", icon: BarChart3 },
    { id: "scan", label: "Scan QR", icon: QrCode },
  ]

  const handleNavClick = (itemId) => {
    setActiveLink(itemId)
    if (itemId === "home") {
      navigate("/")
    } else if (itemId === "report") {
      navigate("/report")
    } else if (itemId === "dashboard") {
      navigate("/dashboard")
    } else if (itemId === "scan") {
      navigate("/scan")
    } else if (itemId === "pricing") {
      navigate("/pricing")
    }
  }

  const handleLoginClick = () => {
    setActiveLink("login")
    navigate("/login")
  }

  return (
    <header className="header">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-2"
            onClick={() => handleNavClick("home")}
            style={{ cursor: "pointer" }}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-foreground">Paw Track</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-item ${activeLink === item.id ? "active" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/donate")} 
              className="btn btn-primary px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Donate
            </button>
            <button
              onClick={handleLoginClick}
              className={`btn btn-primary px-4 py-2 ${activeLink === "login" ? "active" : ""}`}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header