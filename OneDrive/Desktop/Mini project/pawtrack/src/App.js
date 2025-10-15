"use client"

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// 1. Import the Toaster component from the library
import { Toaster } from "react-hot-toast";

// Page Imports
import Home from "./pages/Home";
import LoginPage from "./pages/login";
import ReportAnimal from "./pages/ReportAnimal";
import NGODashboard from "./pages/NGODashboard";
import DonatePage from "./pages/Donatepage";
import ScanQR from "./pages/ScanQR";


// CSS Imports
import "./Components/Header.css";
import "./pages/login.css";
import "./pages/ReportAnimal.css";
import "./pages/donatepage.css";
import "./styles.css";
function App() {
  return (
    <AuthProvider>
      {/* 2. Add the Toaster component HERE. It's self-closing and sits above the Router. */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          duration: 3000, // The message will stay for 3 seconds
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/report" element={<ReportAnimal />} />
          <Route path="/dashboard" element={<NGODashboard />} />
          <Route path="/scan" element={<ScanQR />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;