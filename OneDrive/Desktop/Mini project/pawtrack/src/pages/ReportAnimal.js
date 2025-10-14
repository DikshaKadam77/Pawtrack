"use client"

import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, ChevronDown, Upload, User, Phone, Info, Camera, AlertCircle } from "lucide-react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import "./ReportAnimal.css" // Adjust the path if necessary

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
  const [isSubmitting, setIsSubmitting] = useState(false)
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

    setIsSubmitting(true)

    try {
      const data = new FormData()
      data.append("location", formData.location)
      data.append("animalType", formData.animalType)
      data.append("condition", formData.condition)
      data.append("urgencyLevel", formData.urgencyLevel)
      data.append("description", formData.description)
      if (formData.photo) data.append("photo", formData.photo)
      if (formData.yourName) data.append("yourName", formData.yourName)
      if (formData.phoneNumber) data.append("phoneNumber", formData.phoneNumber)

      const response = await fetch("https://your-api-endpoint.com/report-animal", {
        method: "POST",
        body: data,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Something went wrong")
      }

      const result = await response.json()
      alert("Report submitted successfully! We'll notify nearby volunteers and NGOs.")
      navigate("/")
    } catch (error) {
      console.error("Error submitting report:", error)
      alert(`Failed to submit report: ${error.message}`)
    } finally {
      setIsSubmitting(false)
    }
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

          <div className="report-form-container animate-scale-in">
            <form onSubmit={handleSubmit} noValidate>
              {/* Location */}
              <div className="form-group">
                <label className="form-label required">Location</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" />
                  <input
                    type="text"
                    className={`form-input ${errors.location ? "error-field" : ""}`}
                    placeholder="Enter address or coordinates"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((position) => {
                          const { latitude, longitude } = position.coords
                          handleInputChange("location", `${latitude}, ${longitude}`)
                        })
                      }
                    }}
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                </div>
                {errors.location && <p className="error-message">{errors.location}</p>}
              </div>

              {/* Animal Type */}
              <div className="form-group">
                <label className="form-label required">Animal Type</label>
                <div className="select-wrapper">
                  <select
                    className={`form-select ${errors.animalType ? "error-field" : ""}`}
                    value={formData.animalType}
                    onChange={(e) => handleInputChange("animalType", e.target.value)}
                  >
                    <option value="">Select animal type</option>
                    {animalTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
                {errors.animalType && <p className="error-message">{errors.animalType}</p>}
              </div>

              {/* Animal Condition */}
              <div className="form-group">
                <label className="form-label required">Animal Condition</label>
                <div className="select-wrapper">
                  <select
                    className={`form-select ${errors.condition ? "error-field" : ""}`}
                    value={formData.condition}
                    onChange={(e) => handleInputChange("condition", e.target.value)}
                  >
                    <option value="">Select condition</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
                {errors.condition && <p className="error-message">{errors.condition}</p>}
              </div>

              {/* Urgency Level */}
              <div className="form-group">
                <label className="form-label required">Urgency Level</label>
                <div className="select-wrapper">
                  <select
                    className={`form-select ${errors.urgencyLevel ? "error-field" : ""}`}
                    value={formData.urgencyLevel}
                    onChange={(e) => handleInputChange("urgencyLevel", e.target.value)}
                  >
                    <option value="">Select urgency</option>
                    {urgencyLevels.map((level) => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="select-icon" />
                </div>
                {errors.urgencyLevel && <p className="error-message">{errors.urgencyLevel}</p>}
              </div>

              {/* Description */}
              <div className="form-group">
                <label className="form-label required">Description</label>
                <textarea
                  className={`form-textarea ${errors.description ? "error-field" : ""}`}
                  rows="4"
                  placeholder="Describe the animal's condition, behavior, and any other relevant details..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                />
                {errors.description && <p className="error-message">{errors.description}</p>}
              </div>

              {/* Photo Upload */}
              <div className="form-group">
                <label className="form-label">Photo (Recommended)</label>
                <div
                  className={`photo-upload-area ${dragActive ? "drag-active" : ""} ${formData.photo ? "has-file" : ""}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files[0])}
                  />
                  {formData.photo ? (
                    <div className="uploaded-file">
                      <Camera className="w-8 h-8 text-primary mb-2" />
                      <p className="text-sm font-medium text-foreground">{formData.photo.name}</p>
                      <p className="text-xs text-muted-foreground">Click to change photo</p>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">Click to upload a photo of the animal</p>
                      <p className="text-xs text-muted-foreground mt-1">or drag and drop</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Your Name (Optional)</label>
                  <div className="input-wrapper">
                    <User className="input-icon" />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your name"
                      value={formData.yourName}
                      onChange={(e) => handleInputChange("yourName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number (Optional)</label>
                  <div className="input-wrapper">
                    <Phone className="input-icon" />
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="Your phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="privacy-notice">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p>
                  Your contact information will only be shared with verified NGOs and volunteers working on this case.
                  We respect your privacy.
                </p>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={isSubmitting} className="submit-button">
                <Camera className="w-5 h-5 mr-2" />
                {isSubmitting ? "Submitting Report..." : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ReportAnimal
