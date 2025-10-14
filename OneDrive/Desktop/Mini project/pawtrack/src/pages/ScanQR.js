"use client"

import { useState } from "react"
import {
  QrCode,
  Camera,
  Search,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  Heart,
  CheckCircle,
  Plus,
  X,
} from "lucide-react"
import Header from "../Components/Header"
import Footer from "../Components/Footer"

const ScanQR = () => {
  const [qrInput, setQrInput] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanningProgress, setScanningProgress] = useState(false)
  const [treatmentRecord, setTreatmentRecord] = useState(null)
  const [showHealthyModal, setShowHealthyModal] = useState(false)
  const [showFollowUpForm, setShowFollowUpForm] = useState(false)
  const [showHealthStatus, setShowHealthStatus] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState("")
  const [popupType, setPopupType] = useState("success") // success, warning, error
  const [followUpData, setFollowUpData] = useState({
    condition: "",
    urgency: "Medium Priority",
    description: "",
    name: "",
    phone: "",
  })

  const sampleQRCodes = ["QR-RPT-173678912345-1736890000"]

  const mockTreatmentData = {
    id: "QR-RPT-173678912345-1736890000",
    animalType: "dog",
    originalCondition: "injured",
    location: "123 Main Street, Downtown",
    treatmentDate: "1/13/2025",
    treatedBy: "Dr. Smith - City Animal Rescue",
    status: "Fully Recovered",
    markedHealthy: "27/9/2025",
    treatmentNotes: "Treated for leg injury. Bandaged and given pain medication. Follow-up recommended in 1 week.",
    isHealthy: true,
  }

  const showNotification = (message, type = "success") => {
    setPopupMessage(message)
    setPopupType(type)
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
    }, 4000)
  }

  const handleSearch = () => {
    if (!qrInput.trim()) return

    console.log("[v0] Searching for QR code:", qrInput)

    // Simulate loading
    setScanningProgress(true)
    setTimeout(() => {
      setScanningProgress(false)
      setTreatmentRecord(mockTreatmentData)
    }, 1500)
  }

  const handleCameraScan = () => {
    setIsScanning(true)
    setScanningProgress(true)

    setTimeout(() => {
      setIsScanning(false)
      setScanningProgress(false)
      setQrInput(sampleQRCodes[0])
      setTreatmentRecord(mockTreatmentData)
    }, 3000)
  }

  const handleSampleQRClick = (qrCode) => {
    setQrInput(qrCode)
    setScanningProgress(true)
    setTimeout(() => {
      setScanningProgress(false)
      setTreatmentRecord(mockTreatmentData)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  const handleMarkHealthy = () => {
    setShowHealthyModal(false)
    setShowHealthStatus(true)
    setTreatmentRecord({
      ...treatmentRecord,
      status: "Fully Recovered",
      markedHealthy: new Date().toLocaleDateString(),
      isHealthy: true,
    })
    showNotification("Animal has been successfully marked as healthy!", "success")
  }

  const handleFollowUpSubmit = (e) => {
    e.preventDefault()
    console.log("[v0] Follow-up report submitted:", followUpData)
    setShowFollowUpForm(false)
    setShowHealthStatus(true)

    const urgencyLevel = followUpData.urgency
    let message = "Follow-up report submitted successfully."
    let type = "warning"

    if (urgencyLevel === "Emergency") {
      message = "Emergency follow-up report submitted! Immediate attention required."
      type = "error"
    } else if (urgencyLevel === "High Priority") {
      message = "High priority follow-up report submitted. Urgent care needed."
      type = "error"
    } else if (urgencyLevel === "Medium Priority") {
      message = "Follow-up report submitted. Animal requires additional monitoring."
      type = "warning"
    } else {
      message = "Follow-up report submitted. Routine check recommended."
      type = "warning"
    }

    showNotification(message, type)

    // Reset form
    setFollowUpData({
      condition: "",
      urgency: "Medium Priority",
      description: "",
      name: "",
      phone: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="scanqr-hero animate-fade-in-up">
            <div className="scanqr-hero-icon">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h1 className="scanqr-title">Animal QR Scanner</h1>
            <p className="scanqr-subtitle">
              Instantly access treatment history and provide follow-up care by scanning QR codes
            </p>
          </div>

          <div className="scanqr-banner animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="scanqr-banner-title">
              <QrCode className="w-6 h-6" />
              <span>Scan Animal QR Code</span>
            </div>
            <p className="scanqr-banner-text">
              Scan or enter the QR code from an animal's tracking band to access their complete care history
            </p>
          </div>

          <div className="scanqr-search-card animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="mb-6">
              <div className="scanqr-search-label">
                <Search className="w-5 h-5 text-purple-600" />
                <span>Enter QR Code or Animal ID</span>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={qrInput}
                  onChange={(e) => setQrInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="QR-RPT-1234567890 or scan QR code"
                  className="scanqr-search-input"
                />
                <button
                  onClick={handleSearch}
                  disabled={!qrInput.trim() || scanningProgress}
                  className="scanqr-search-button"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>

            <div className="scanqr-camera-area">
              {scanningProgress && (
                <div className="scanqr-scanning-overlay">
                  <div className="text-center">
                    <div className="scanqr-scanning-spinner"></div>
                    <p className="text-purple-700 font-medium">Scanning in progress...</p>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <img
                  src="/person-using-qr-code-scanner-with-animal-rescue-co.jpg"
                  alt="QR Code Scanning Demo"
                  className="scanqr-camera-image"
                />
              </div>

              <button
                onClick={handleCameraScan}
                disabled={isScanning || scanningProgress}
                className="scanqr-camera-button"
              >
                <Camera className="w-5 h-5" />
                {isScanning ? "Scanning..." : "Use Camera to Scan"}
              </button>
            </div>
          </div>

          <div className="scanqr-demo animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="scanqr-demo-title">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>Demo Mode: Try these sample QR codes</span>
            </div>

            <div className="space-y-3">
              {sampleQRCodes.map((qrCode, index) => (
                <div key={index} onClick={() => handleSampleQRClick(qrCode)} className="scanqr-demo-code">
                  <code>{qrCode}</code>
                </div>
              ))}
            </div>
          </div>

          {treatmentRecord && (
            <div className="animate-fade-in-up">
              <div className="scanqr-record-header">
                <div className="scanqr-record-header-content">
                  <div className="scanqr-record-title">
                    <CheckCircle className="w-6 h-6" />
                    <span>Animal Treatment Record</span>
                  </div>
                  <div className="scanqr-record-badges">
                    <div className="scanqr-record-badge">{treatmentRecord.id}</div>
                    {treatmentRecord.isHealthy && (
                      <div className="scanqr-healthy-badge">
                        <Heart className="w-4 h-4" />
                        <span>Healthy</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="scanqr-record-content">
                <div className="scanqr-record-grid">
                  {/* Animal Details */}
                  <div className="space-y-6">
                    <div className="scanqr-section-title">
                      <div className="scanqr-section-dot scanqr-purple-dot"></div>
                      <h3 className="scanqr-purple-title">Animal Details</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Type:</p>
                        <p className="text-lg text-foreground">{treatmentRecord.animalType}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Original condition:</p>
                        <p className="text-lg text-foreground">{treatmentRecord.originalCondition}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-purple-500" />
                      <span>{treatmentRecord.location}</span>
                    </div>
                  </div>

                  {/* Treatment History */}
                  <div className="space-y-6">
                    <div className="scanqr-section-title">
                      <div className="scanqr-section-dot scanqr-green-dot"></div>
                      <h3 className="scanqr-green-title">Treatment History</h3>
                    </div>

                    <div className="scanqr-info-card scanqr-green-card">
                      <div className="scanqr-info-item">
                        <Calendar className="w-4 h-4 text-green-600" />
                        <span className="scanqr-green-text">Treated: {treatmentRecord.treatmentDate}</span>
                      </div>

                      <div className="scanqr-info-item">
                        <User className="w-4 h-4 text-green-600" />
                        <span className="scanqr-green-text">By: {treatmentRecord.treatedBy}</span>
                      </div>
                    </div>

                    {/* Health Status */}
                    {showHealthStatus && (
                      <div className="scanqr-info-card scanqr-green-card">
                        <div className="scanqr-section-title" style={{ marginBottom: "0.75rem" }}>
                          <Heart className="w-5 h-5 text-green-600" />
                          <h4 className="font-semibold text-green-700">Health Status</h4>
                        </div>

                        <div className="space-y-2">
                          <div className="scanqr-info-item">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="scanqr-green-text">Status: {treatmentRecord.status}</span>
                          </div>

                          <div className="scanqr-info-item">
                            <Calendar className="w-4 h-4 text-green-600" />
                            <span className="scanqr-green-text">Marked Healthy: {treatmentRecord.markedHealthy}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Treatment Notes */}
                <div className="mb-8">
                  <div className="scanqr-section-title">
                    <div className="scanqr-section-dot scanqr-blue-dot"></div>
                    <h3 className="scanqr-blue-title">Treatment Notes</h3>
                  </div>

                  <div className="scanqr-info-card scanqr-blue-card">
                    <p className="text-blue-800">{treatmentRecord.treatmentNotes}</p>
                  </div>
                </div>

                <div className="scanqr-actions">
                  <button
                    onClick={() => setShowFollowUpForm(true)}
                    className="scanqr-action-button scanqr-orange-button"
                  >
                    <Plus className="w-4 h-4" />
                    Report Follow-up Issue
                  </button>

                  <button
                    onClick={() => setShowHealthyModal(true)}
                    className="scanqr-action-button scanqr-green-outline-button"
                  >
                    <Heart className="w-4 h-4" />
                    Mark as Healthy
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {showPopup && (
        <div className={`scanqr-popup animate-fade-in-up scanqr-popup-${popupType}`}>
          <div className="scanqr-popup-content">
            {popupType === "success" && <CheckCircle className="w-5 h-5" />}
            {popupType === "warning" && <AlertTriangle className="w-5 h-5" />}
            {popupType === "error" && <AlertTriangle className="w-5 h-5" />}
            <span>{popupMessage}</span>
          </div>
          <button onClick={() => setShowPopup(false)} className="scanqr-popup-close">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {showHealthyModal && (
        <div className="scanqr-modal-overlay">
          <div className="scanqr-modal animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="scanqr-modal-icon">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="scanqr-modal-title">Mark Animal as Healthy?</h3>
              <p className="scanqr-modal-text">
                This will update the animal's status to indicate it has fully recovered and is in good health.
              </p>
            </div>

            <div className="scanqr-modal-info">
              <p>
                <span className="font-medium">Animal ID:</span> {treatmentRecord?.id}
              </p>
              <p>
                <span className="font-medium">Type:</span> {treatmentRecord?.animalType}
              </p>
              <p>
                <span className="font-medium">Location:</span> {treatmentRecord?.location}
              </p>
            </div>

            <div className="scanqr-modal-actions">
              <button onClick={handleMarkHealthy} className="scanqr-modal-button scanqr-green-button">
                Yes, Mark as Healthy
              </button>
              <button onClick={() => setShowHealthyModal(false)} className="scanqr-modal-button scanqr-gray-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showFollowUpForm && (
        <div className="scanqr-modal-overlay">
          <div className="scanqr-form-modal animate-fade-in-up">
            {/* Form Header */}
            <div className="scanqr-form-header">
              <div className="scanqr-form-header-content">
                <div className="scanqr-form-title">
                  <AlertTriangle className="w-6 h-6" />
                  <span>Report Follow-up Issue</span>
                </div>
                <button onClick={() => setShowFollowUpForm(false)} className="scanqr-close-button">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="scanqr-form-subtitle">
                Use this form if the animal needs additional care or if you notice new problems
              </p>
            </div>

            {/* Form Content */}
            <form onSubmit={handleFollowUpSubmit} className="scanqr-form-content">
              <div className="scanqr-form-grid">
                <div>
                  <div className="scanqr-form-label">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span>Current Condition</span>
                  </div>
                  <input
                    type="text"
                    value={followUpData.condition}
                    onChange={(e) => setFollowUpData({ ...followUpData, condition: e.target.value })}
                    placeholder="e.g., limping, appears sick, new injury"
                    className="scanqr-form-input"
                    required
                  />
                </div>

                <div>
                  <div className="scanqr-form-label">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span>Urgency Level</span>
                  </div>
                  <select
                    value={followUpData.urgency}
                    onChange={(e) => setFollowUpData({ ...followUpData, urgency: e.target.value })}
                    className="scanqr-form-select"
                  >
                    <option>Low Priority</option>
                    <option>Medium Priority</option>
                    <option>High Priority</option>
                    <option>Emergency</option>
                  </select>
                </div>
              </div>

              <div className="scanqr-form-group">
                <label className="scanqr-form-label">Detailed Description</label>
                <textarea
                  value={followUpData.description}
                  onChange={(e) => setFollowUpData({ ...followUpData, description: e.target.value })}
                  placeholder="Describe the current condition and any immediate concerns..."
                  className="scanqr-form-textarea"
                  required
                />
              </div>

              <div className="scanqr-form-grid">
                <div>
                  <div className="scanqr-form-label">
                    <User className="w-4 h-4 text-purple-500" />
                    <span>Your Name (Optional)</span>
                  </div>
                  <input
                    type="text"
                    value={followUpData.name}
                    onChange={(e) => setFollowUpData({ ...followUpData, name: e.target.value })}
                    placeholder="Your name"
                    className="scanqr-form-input"
                  />
                </div>

                <div>
                  <label className="scanqr-form-label">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={followUpData.phone}
                    onChange={(e) => setFollowUpData({ ...followUpData, phone: e.target.value })}
                    placeholder="Your phone number"
                    className="scanqr-form-input"
                  />
                </div>
              </div>

              <div className="scanqr-form-actions">
                <button type="submit" className="scanqr-submit-button">
                  Submit Follow-up Report
                </button>
                <button type="button" onClick={() => setShowFollowUpForm(false)} className="scanqr-cancel-button">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ScanQR
