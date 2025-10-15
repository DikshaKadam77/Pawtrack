"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, ChevronDown, Upload, User, Phone, Info, Camera, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import "./ReportAnimal.css"

const ReportAnimal = () => {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    location: "",
    animalType: "",
    condition: "",
    urgencyLevel: "",
    description: "",
    photo: null,
    yourName: "",
    phoneNumber: "",
  })

  const [errors, setErrors] = useState({})
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // 'idle', 'submitting', 'success', 'error'
  const [dragActive, setDragActive] = useState(false)

  const animalTypes = ["Dog", "Cat", "Bird", "Rabbit", "Horse", "Cow", "Goat", "Sheep", "Pig", "Wildlife", "Other"]
  const conditions = ["Injured", "Sick", "Malnourished", "Abandoned", "Lost", "Abused", "Trapped", "Dead", "Other"]
  const urgencyLevels = [
    { value: "critical", label: "Critical - Immediate attention needed" },
    { value: "high", label: "High - Urgent care required" },
    { value: "medium", label: "Medium - Needs attention soon" },
    { value: "low", label: "Low - Non-urgent situation" },
  ]

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, photo: file }))
      if (errors.photo) setErrors((prev) => ({ ...prev, photo: "" }))
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileUpload(e.dataTransfer.files[0])
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.location.trim()) newErrors.location = "Location is required"
    if (!formData.animalType) newErrors.animalType = "Animal type is required"
    if (!formData.condition) newErrors.condition = "Animal condition is required"
    if (!formData.urgencyLevel) newErrors.urgencyLevel = "Urgency level is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"

    // --- CHANGED START: Add validation for Name and Phone Number ---
    if (!formData.yourName.trim()) newErrors.yourName = "Your name is required"

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit Indian phone number"
    }
    // --- CHANGED END ---

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      const firstError = document.querySelector(".error-field")
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    setSubmissionStatus("submitting")
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    
    try {
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Error submitting report:", error)
      alert(`Failed to submit report: ${error.message}`)
      setSubmissionStatus("idle");
    }
  }
  
  const resetForm = () => {
    setFormData({
      location: "", animalType: "", condition: "", urgencyLevel: "",
      description: "", photo: null, yourName: "", phoneNumber: "",
    });
    setErrors({});
    setSubmissionStatus("idle");
  }

  return (
    <div className="min-h-screen bg-login-background">
      <Header />
      <main className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-accent-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Report an Animal in Need</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Please provide as much detail as possible to help volunteers locate and assist the animal
            </p>
          </div>

          <div className="report-form-container">
            {submissionStatus === 'success' ? (
              <div className="success-message-container animate-success">
                <CheckCircle className="success-icon" />
                <h2 className="success-title">Report Submitted!</h2>
                <p className="success-text">
                  Thank you for helping an animal in need. We have received your report and are notifying nearby NGOs and volunteers immediately.
                </p>
                <div className="success-buttons">
                    <button onClick={() => navigate("/")} className="success-button-secondary">Go to Homepage</button>
                    <button onClick={resetForm} className="success-button-primary">Report Another Animal</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="animate-scale-in">
                {/* All other form groups remain the same */}
                {/* ... (Location, Animal Type, etc.) ... */}
                <div className="form-group">
                  <label className="form-label required">Location</label>
                  <div className="input-wrapper">
                    <MapPin className="input-icon" />
                    <input type="text" className={`form-input ${errors.location ? "error-field" : ""}`} placeholder="Enter address or coordinates" value={formData.location} onChange={(e) => handleInputChange("location", e.target.value)} />
                    <button type="button" className="location-button" onClick={() => { if (navigator.geolocation) { navigator.geolocation.getCurrentPosition((position) => { const { latitude, longitude } = position.coords; handleInputChange("location", `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`); }); } }}>
                      <MapPin className="w-4 h-4" />
                    </button>
                  </div>
                  {errors.location && <p className="error-message">{errors.location}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label required">Animal Type</label>
                  <div className="select-wrapper">
                    <select className={`form-select ${errors.animalType ? "error-field" : ""}`} value={formData.animalType} onChange={(e) => handleInputChange("animalType", e.target.value)}>
                      <option value="">Select animal type</option>
                      {animalTypes.map((type) => (<option key={type} value={type}>{type}</option>))}
                    </select>
                    <ChevronDown className="select-icon" />
                  </div>
                  {errors.animalType && <p className="error-message">{errors.animalType}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label required">Animal Condition</label>
                  <div className="select-wrapper">
                    <select className={`form-select ${errors.condition ? "error-field" : ""}`} value={formData.condition} onChange={(e) => handleInputChange("condition", e.target.value)}>
                      <option value="">Select condition</option>
                      {conditions.map((condition) => (<option key={condition} value={condition}>{condition}</option>))}
                    </select>
                    <ChevronDown className="select-icon" />
                  </div>
                  {errors.condition && <p className="error-message">{errors.condition}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label required">Urgency Level</label>
                  <div className="select-wrapper">
                    <select className={`form-select ${errors.urgencyLevel ? "error-field" : ""}`} value={formData.urgencyLevel} onChange={(e) => handleInputChange("urgencyLevel", e.target.value)}>
                      <option value="">Select urgency</option>
                      {urgencyLevels.map((level) => (<option key={level.value} value={level.value}>{level.label}</option>))}
                    </select>
                    <ChevronDown className="select-icon" />
                  </div>
                  {errors.urgencyLevel && <p className="error-message">{errors.urgencyLevel}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label required">Description</label>
                  <textarea className={`form-textarea ${errors.description ? "error-field" : ""}`} rows="4" placeholder="Describe the animal's condition, behavior, and any other relevant details..." value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} />
                  {errors.description && <p className="error-message">{errors.description}</p>}
                </div>

                <div className="form-group">
                  <label className="form-label">Photo (Recommended)</label>
                  <div className={`photo-upload-area ${dragActive ? "drag-active" : ""} ${formData.photo ? "has-file" : ""}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()}>
                    <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e.target.files[0])} />
                    {formData.photo ? (
                      <div className="uploaded-file">
                        <Camera className="w-8 h-8 text-primary mb-2" />
                        <p className="text-sm font-medium text-foreground">{formData.photo.name}</p>
                        <p className="text-xs text-muted-foreground">Click to change photo</p>
                      </div>
                    ) : (
                      <div className="upload-placeholder">
                        <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                        <p className="text-muted-foreground">Click to upload or drag & drop</p>
                        <p className="text-xs text-muted-foreground mt-1">A photo helps us respond faster</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- CHANGED START: Updated Contact Info section --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label required">Your Name</label>
                    <div className="input-wrapper">
                      <User className="input-icon" />
                      <input
                        type="text"
                        className={`form-input ${errors.yourName ? "error-field" : ""}`}
                        placeholder="Enter your name"
                        value={formData.yourName}
                        onChange={(e) => handleInputChange("yourName", e.target.value)}
                      />
                    </div>
                     {errors.yourName && <p className="error-message">{errors.yourName}</p>}
                  </div>
                  <div className="form-group">
                    <label className="form-label required">Phone Number</label>
                    <div className="input-wrapper">
                      <Phone className="input-icon" />
                      <input
                        type="tel"
                        className={`form-input ${errors.phoneNumber ? "error-field" : ""}`}
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      />
                    </div>
                    {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                  </div>
                </div>
                {/* --- CHANGED END --- */}
                
                <div className="privacy-notice">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p>Your contact information will only be shared with verified NGOs and volunteers working on this case. We respect your privacy.</p>
                </div>

                <button type="submit" disabled={submissionStatus === 'submitting'} className="submit-button">
                  {submissionStatus === 'submitting' ? (<Loader2 className="w-5 h-5 mr-2 animate-spin" />) : (<Camera className="w-5 h-5 mr-2" />)}
                  {submissionStatus === 'submitting' ? "Submitting Report..." : "Submit Report"}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ReportAnimal