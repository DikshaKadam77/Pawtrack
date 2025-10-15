"use client";

import { useState, useEffect, useMemo } from "react";
import { Download, Filter, Copy, MapPin, Phone, Calendar } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const NGODashboard = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  const [cases, setCases] = useState([
    {
      id: "RPT-173678912345",
      date: "1/12/2025",
      animal: "dog",
      condition: "injured",
      urgency: "high",
      status: "pending",
      description: "Injured dog with visible limp, appears to be in pain",
      location: "Sector 19, Airoli, Navi Mumbai",
      reporter: "Vedant Shah",
      phone: "+91 9876543210",
    },
    {
      id: "RPT-173678912346",
      date: "2/12/2025",
      animal: "cat",
      condition: "stray",
      urgency: "medium",
      status: "in-progress",
      description: "Stray cat found near construction site, seems hungry",
      location: "Sector 10, Thane",
      reporter: "Ananya Mehta",
      phone: "+91 9123456780",
    },
    {
      id: "RPT-173678912347",
      date: "3/12/2025",
      animal: "parrot",
      condition: "injured wing",
      urgency: "low",
      status: "treated",
      description: "Parrot with a slightly injured wing, being treated",
      location: "Sector 5, Navi Mumbai",
      reporter: "Rohit Patil",
      phone: "+91 9988776655",
    },
  ]);

  // Filtered cases based on selected filters
  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const statusMatch = statusFilter === "all" || c.status === statusFilter;
      const urgencyMatch = urgencyFilter === "all" || c.urgency === urgencyFilter;
      return statusMatch && urgencyMatch;
    });
  }, [cases, statusFilter, urgencyFilter]);

  // Stats computed dynamically from filtered cases
  const stats = useMemo(() => ({
    total: filteredCases.length,
    pending: filteredCases.filter((c) => c.status === "pending").length,
    inProgress: filteredCases.filter((c) => c.status === "in-progress").length,
    treated: filteredCases.filter((c) => c.status === "treated").length,
  }), [filteredCases]);

  const handleCopyQRLink = (caseId) => {
    const link = `${window.location.origin}/case/${caseId}`;
    navigator.clipboard.writeText(link);
    alert("QR link copied!");
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "high": return "urgency-high";
      case "medium": return "urgency-medium";
      case "low": return "urgency-low";
      default: return "urgency-medium";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "status-pending";
      case "in-progress": return "status-progress";
      case "treated": return "status-treated";
      default: return "status-pending";
    }
  };

  useEffect(() => {
    // Animate dashboard & case cards
    const cards = document.querySelectorAll(".dashboard-card, .case-card");
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.add("animate-slide-up");
    });
  }, []);

  return (
    <div className="ngo-dashboard">
      <Header />

      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Header Section */}
          <div className="dashboard-header">
            <div className="dashboard-title-section">
              <h1 className="dashboard-title"> Dashboard</h1>
              <p className="dashboard-subtitle">Manage and track animal rescue cases</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="dashboard-card stat-card">
              <div className="stat-number total">{stats.total}</div>
              <div className="stat-label">Total Cases</div>
            </div>
            <div className="dashboard-card stat-card">
              <div className="stat-number pending">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="dashboard-card stat-card">
              <div className="stat-number progress">{stats.inProgress}</div>
              <div className="stat-label">In Progress</div>
            </div>
            <div className="dashboard-card stat-card">
              <div className="stat-number treated">{stats.treated}</div>
              <div className="stat-label">Treated</div>
            </div>
          </div>

          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-header">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </div>
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">Status</label>
                <select
                  className="filter-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="treated">Treated</option>
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Urgency</label>
                <select
                  className="filter-select"
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                >
                  <option value="all">All Urgency Levels</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Cases Section */}
          <div className="cases-section">
            <h2 className="cases-title">Active Cases ({stats.total})</h2>
            <div className="cases-list">
              {filteredCases.map((caseItem) => (
                <div key={caseItem.id} className="case-card">
                  <div className="case-header">
                    <div className="case-id-section">
                      <div className="case-status-indicator"></div>
                      <span className="case-id">{caseItem.id}</span>
                      <span className={`urgency-badge ${getUrgencyColor(caseItem.urgency)}`}>
                        {caseItem.urgency}
                      </span>
                    </div>
                    <div className="case-actions">
                      <div className="case-date">
                        <Calendar className="w-4 h-4" />
                        {caseItem.date}
                      </div>
                      <button
                        className="qr-link-btn"
                        onClick={() => handleCopyQRLink(caseItem.id)}
                      >
                        <Copy className="w-4 h-4" />
                        Copy QR Link
                      </button>
                    </div>
                  </div>

                  <div className="case-content">
                    <div className="case-info">
                      <div className="animal-info">
                        <h3 className="animal-title">Animal: {caseItem.animal}</h3>
                        <p className="animal-condition">Condition: {caseItem.condition}</p>
                      </div>

                      <p className="case-description">{caseItem.description}</p>

                      <div className="case-details">
                        <div className="detail-item">
                          <MapPin className="w-4 h-4" />
                          <span>{caseItem.location}</span>
                        </div>
                        <div className="detail-item">
                          <Phone className="w-4 h-4" />
                          <span>
                            {caseItem.reporter} • {caseItem.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NGODashboard;
