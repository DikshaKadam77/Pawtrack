"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Heart,
  Plus,
  BarChart3,
  QrCode,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    logout();
    navigate("/");
  };

  // Helper to handle active link styling
  const linkClass = (path) =>
    `nav-item flex items-center gap-1 text-[15px] font-medium transition ${
      activeLink === path
        ? "text-purple-700 font-semibold"
        : "text-gray-700 hover:text-purple-700"
    }`;

  return (
    <header className="header bg-white shadow-md">
      <div className="container header-container flex justify-between items-center py-2 px-4">
        {/* LEFT SECTION: Logo */}
        <div className="header-left flex items-center gap-2">
          <div className="w-17 h-16 flex items-center justify-center">
            <img
              src="/logo.png"
              className="object-contain w-full h-full"
              alt="Logo"
            />
          </div>
          <span className="text-lg font-bold text-foreground">Paw Track</span>
        </div>

        {/* CENTER SECTION: Navigation Links */}
        <nav className="header-center flex items-center gap-4">
          {/* Home: Visible to all */}
          <Link to="/" className={linkClass("/")}>
            <Heart className="w-4 h-4" />
            <span>Home</span>
          </Link>

          {/* Report Animal: Guests & Citizens */}
          {(!isLoggedIn || user?.role === "Citizen") && (
            <Link to="/report" className={linkClass("/report")}>
              <Plus className="w-4 h-4" />
              <span>Report Animal</span>
            </Link>
          )}

          {/* Dashboard: NGOs & Volunteers */}
          {isLoggedIn &&
            (user?.role === "NGO/Organization" || user?.role === "Volunteer") && (
              <Link to="/dashboard" className={linkClass("/dashboard")}>
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            )}

          {/* Scan QR: Visible to all */}
          <Link to="/scan" className={linkClass("/scan")}>
            <QrCode className="w-4 h-4" />
            <span>Scan QR</span>
          </Link>

          {/* Donate: Citizens ONLY */}
          {isLoggedIn && user?.role === "Citizen" && (
            <Link to="/donate" className={linkClass("/donate")}>
              <span>Donate</span>
            </Link>
          )}
        </nav>

        {/* RIGHT SECTION: Action Buttons */}
        <div className="header-right flex items-center gap-3">
          {/* Donate Button: Guests ONLY */}
          {!isLoggedIn && (
            <Link to="/donate" className="btn btn-accent">
              ₹ Donate
            </Link>
          )}

          {/* Login / Logout Toggle */}
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <span className="font-medium text-foreground hidden sm:flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Hi, {user?.firstName || "User"}
              </span>
              <button onClick={handleLogout} className="btn btn-outline flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
