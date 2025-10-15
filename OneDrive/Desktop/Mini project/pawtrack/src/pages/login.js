 "use client"

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { Heart, Eye, EyeOff, Mail, Lock, User, Building, Loader2, MapPin } from "lucide-react"; 
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const userTypes = [
    { id: "citizen", icon: User, title: "Citizen", description: "Report and track animals in need" },
    { id: "volunteer", icon: Heart, title: "Volunteer", description: "Help rescue and care for animals" },
    { id: "ngo", icon: Building, title: "NGO/Organization", description: "Manage rescue operations and teams" },
  ];

  const [selectedRole, setSelectedRole] = useState(userTypes[0].id);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    organizationName: "",
    address: "", 
    rememberMe: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      let userData = {};
      
      if (activeTab === 'signin') {
        if (formData.email.toLowerCase().includes('ngo') || formData.email.toLowerCase().includes('volunteer')) {
          userData = { firstName: 'Rescue Team', role: 'NGO/Organization' };
        } else {
          userData = { firstName: 'Diya', role: 'Citizen' };
        }
        toast.success(`Welcome back, ${userData.firstName}!`);
      } else { 
        const roleInfo = userTypes.find(type => type.id === selectedRole);
        const roleTitle = roleInfo ? roleInfo.title : 'Citizen';

        userData = {
          firstName: roleTitle === 'NGO/Organization' ? formData.organizationName : formData.firstName,
          role: roleTitle,
        };
        toast.success(`Welcome to Paw Track, ${userData.firstName}!`);
      }

      login(userData);
      setIsLoading(false);
      navigate((userData.role === 'NGO/Organization' || userData.role === 'Volunteer') ? '/dashboard' : '/'); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-login-background">
      <Header />
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
        <div className="login-container">
          <div className="login-header">
            <div className="login-logo"><Heart className="w-8 h-8 text-white" fill="currentColor" /></div>
            <h1 className="login-title">Welcome to Paw Track</h1>
            <p className="login-subtitle">Join our community of animal heroes</p>
          </div>
          <div className="login-tabs">
            <button className={`login-tab ${activeTab === "signin" ? "active" : ""}`} onClick={() => setActiveTab("signin")}>Sign In</button>
            <button className={`login-tab ${activeTab === "signup" ? "active" : ""}`} onClick={() => setActiveTab("signup")}>Sign Up</button>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            {activeTab === "signup" && (
              <>
                <div className="form-group">
                  <label className="form-label">I am a:</label>
                  <div className="space-y-3">
                    {userTypes.map((type) => (
                      <button key={type.id} type="button" onClick={() => setSelectedRole(type.id)} className={`role-option ${selectedRole === type.id ? "selected" : ""}`}>
                        <type.icon className="w-5 h-5" />
                        <div className="flex-1 text-left">
                          <div className="font-medium">{type.title}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </div>
                        {selectedRole === type.id && <span className="text-xs font-medium text-primary">Selected</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {(selectedRole === 'citizen' || selectedRole === 'volunteer') && (
                  <div className="grid grid-cols-2 gap-4 form-group">
                    <div>
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <div className="input-wrapper"><User className="input-icon" /><input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Diya" className="form-input" required /></div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <div className="input-wrapper"><User className="input-icon" /><input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Sharma" className="form-input" required /></div>
                    </div>
                  </div>
                )}
                {selectedRole === 'ngo' && (
                  <div className="form-group">
                    <label htmlFor="organizationName" className="form-label">Organization Name</label>
                    <div className="input-wrapper"><Building className="input-icon" /><input type="text" id="organizationName" name="organizationName" value={formData.organizationName} onChange={handleInputChange} placeholder="e.g., Animal Angels" className="form-input" required /></div>
                  </div>
                )}
                
                {(selectedRole === 'volunteer' || selectedRole === 'ngo') && (
                  <div className="form-group">
                    <label htmlFor="address" className="form-label">Location / Address</label>
                    <div className="input-wrapper"><MapPin className="input-icon" /><input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="e.g., Karjat, Maharashtra" className="form-input" required /></div>
                  </div>
                )}
              </>
            )}
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-wrapper"><Mail className="input-icon" /><input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" className="form-input" required /></div>
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" /><input type={showPassword ? "text" : "password"} id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="form-input" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
              </div>
            </div>

            {activeTab === "signin" && (
              <div className="form-options">
                <label className="checkbox-wrapper"><input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} className="checkbox-input" /><span className="checkbox-label">Remember me</span></label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
            )}
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</> : (activeTab === "signin" ? "Sign In" : "Sign Up")}
            </button>
          </form>
          <div className="support-link">
            <span>Need help? </span><a href="#" className="contact-support">Contact Support</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
