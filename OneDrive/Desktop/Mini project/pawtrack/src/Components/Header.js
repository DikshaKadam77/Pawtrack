"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Heart, Plus, BarChart3, QrCode, DollarSign, LogIn, LogOut, User } from "lucide-react"
import { useAuth } from "../context/AuthContext";

// NEW: Import the toast function
import { toast } from "react-hot-toast";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const navItems = [
    { id: "/", label: "Home", icon: Heart },
    { id: "/report", label: "Report Animal", icon: Plus },
    { id: "/dashboard", label: "NGO Dashboard", icon: BarChart3 },
    { id: "/scan", label: "Scan QR", icon: QrCode },
  ];
  
  // --- CHANGED: handleLogout function now triggers a toast ---
  const handleLogout = () => {
    // 1. Show a success message
    toast.success('Logged out successfully!');
    
    // 2. Clear the global state
    logout(); 
    
    // 3. Redirect to the homepage
    navigate("/"); 
  };

  return (
    <header className="header">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Heart className="w-5 h-5 text-primary-foreground" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-foreground">Paw Track</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.id} to={item.id} className={`nav-item ${activeLink === item.id ? "active" : ""}`}>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/donate" className="btn btn-primary px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground">
              <DollarSign className="w-4 h-4 mr-2" />
              Donate
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                 <span className="font-medium text-foreground hidden sm:flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Hi, {user?.firstName || 'User'}
                </span>
                <button onClick={handleLogout} className="btn btn-outline px-4 py-2">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className={`btn btn-primary px-4 py-2 ${activeLink === "/login" ? "active" : ""}`}>
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;