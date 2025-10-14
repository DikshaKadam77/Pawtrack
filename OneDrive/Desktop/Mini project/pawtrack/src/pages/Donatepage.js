// src/pages/DonatePage.js
import { useState, useMemo, useEffect, useRef } from "react"; // 👈 Make sure useRef is imported
import { Heart, DollarSign, Zap, Star, ShieldCheck, FileText, Users, Target, Activity } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PaymentSuccess from "../Components/PaymentSuccess";

// Helper function to load the Razorpay script
const loadRazorpayScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const DonatePage = () => {
  const [donationType, setDonationType] = useState("one-time");
  const [activeSelection, setActiveSelection] = useState(500);
  const [customAmount, setCustomAmount] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("idle"); // 👈 FIXED: This line was missing
  
  const statsRef = useRef(null); // 👈 FIXED: This line was missing

  const donationAmounts = [
    { amount: 250, icon: Heart, description: "Feeds 5 animals", impactText: "₹250 helps provide a full day of nutritious meals for 5 stray animals." },
    { amount: 500, icon: DollarSign, description: "Medical checkup", impactText: "₹500 allows us to conduct a basic medical checkup and provide first-aid for 3-4 animals." },
    { amount: 1000, icon: Zap, description: "Emergency treatment", impactText: "₹1000 can fund emergency life-saving treatment for a severely injured animal." },
    { amount: 2500, icon: ShieldCheck, description: "Sponsor a rescue", impactText: "₹2500 helps sponsor a complete rescue operation, including transport, treatment, and QR tracking." },
  ];

  const impactText = useMemo(() => {
    if (activeSelection === 'custom') {
      const amount = Number(customAmount) || 0;
      if (amount > 0) return `₹${amount} is a generous contribution that will directly fund our rescue operations.`;
      return "Your custom donation makes a huge difference.";
    }
    const selected = donationAmounts.find(d => d.amount === activeSelection);
    return selected ? selected.impactText : "Select an amount to see your impact.";
  }, [activeSelection, customAmount, donationAmounts]);

  const displayAmount = useMemo(() => {
    return activeSelection === 'custom' ? (Number(customAmount) || 0) : activeSelection;
  }, [activeSelection, customAmount]);

  useEffect(() => {
    const animateValue = (element, start, end, duration) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        if (element) {
          element.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString() + "+";
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            element.innerHTML = end.toLocaleString() + "+";
          }
        }
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const rescuedStatEl = document.getElementById("rescued-stat");
        const ngoStatEl = document.getElementById("ngo-stat");
        if (rescuedStatEl) animateValue(rescuedStatEl, 0, 2500, 2000);
        if (ngoStatEl) animateValue(ngoStatEl, 0, 50, 2000);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if(statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const handlePayment = async () => {
    setPaymentStatus("processing");
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      setPaymentStatus("idle");
      return;
    }
    
    const orderDetails = {
        amount: displayAmount * 100,
        id: "order_test_id_from_backend", // Dummy ID
        currency: "INR",
    };

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // IMPORTANT: Replace with your Key ID
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      name: "Paw Track Foundation",
      description: `Donation for Animal Welfare`,
      image: "/logo.png",
      order_id: orderDetails.id,
      handler: function (response) {
        console.log(response);
        setPaymentStatus("success");
      },
      prefill: {
        name: "Valued Supporter",
        email: "supporter@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Donation from Paw Track Website",
      },
      theme: {
        color: "#8b5cf6",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
        alert(response.error.description);
        setPaymentStatus("idle");
    });
    paymentObject.open();
  };

  if (paymentStatus === "success") {
    return (
      <div className="bg-background">
        <Header />
        <main className="donate-page-section">
          <PaymentSuccess />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background">
      <Header />
      <main>
        <section className="donate-page-section">
          <div className="container">
            {/* Top Section */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-sm font-bold text-primary uppercase mb-2">Make A Difference Today</h3>
                <h1 className="text-5xl font-bold text-foreground leading-tight text-balance mb-4 gradient-headline">
                  Every Donation Saves Lives
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Your contribution directly funds rescue operations, medical treatments, and our innovative QR tracking system that prevents duplicate treatments and ensures every animal gets the care they need.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-foreground"><ShieldCheck className="w-5 h-5 text-primary" /> 100% Secure Donations</div>
                  <div className="flex items-center gap-2 text-foreground"><FileText className="w-5 h-5 text-primary" /> Tax Deductible</div>
                </div>
              </div>
              <div className="mascot-container">
                <div className="bg-circle-1"></div>
                <div className="bg-circle-2"></div>
                <div className="floating-heart">
                  <Heart fill="currentColor" />
                </div>
                <img src="https://i.imgur.com/s6l2aJc.png" alt="Friendly dog mascot" className="mascot-dog" />
                <img src="https://i.imgur.com/aT8A033.png" alt="Cute cat mascot" className="mascot-cat" />
              </div>
            </div>

            {/* Donation Card */}
            <div className="donation-card">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground">Choose Your Impact</h2>
                <p className="text-muted-foreground">Select a donation amount to see the direct impact on animal lives.</p>
              </div>
              <div className="max-w-3xl mx-auto">
                <h3 className="font-semibold mb-2">Donation Type</h3>
                <div className="donation-type-toggle slider-toggle" data-type={donationType}>
                  <button onClick={() => setDonationType('one-time')} className={donationType === 'one-time' ? 'active' : ''}>One-time</button>
                  <button onClick={() => setDonationType('monthly')} className={donationType === 'monthly' ? 'active' : ''}>Monthly <span className="badge">More Impact</span></button>
                </div>

                <h3 className="font-semibold mt-6 mb-2">Donation Amount</h3>
                <div className="amount-grid">
                  {donationAmounts.map(({ amount, icon: Icon, description }) => (
                    <button key={amount} onClick={() => { setActiveSelection(amount); setCustomAmount(''); }} className={`amount-option ${activeSelection === amount ? 'active' : ''}`}>
                      <Icon className="w-6 h-6 mb-1" />
                      <span className="amount-value">₹{amount}</span>
                      <span className="amount-desc">{description}</span>
                    </button>
                  ))}
                  <div className={`amount-option custom-option ${activeSelection === 'custom' ? 'active' : ''}`}>
                    <Star className="w-6 h-6 mb-1" />
                    <span className="amount-value">Custom</span>
                    <input
                      type="number"
                      placeholder="Amount"
                      className="custom-amount-input"
                      value={customAmount}
                      onFocus={() => setActiveSelection('custom')}
                      onChange={(e) => setCustomAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="impact-box">
                  <h4 className="font-semibold">Your Impact</h4>
                  <p key={impactText} className="impact-text-animate">{impactText}</p>
                </div>
                <button 
                  className="donate-now-btn"
                  onClick={handlePayment}
                  disabled={paymentStatus === "processing"}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {paymentStatus === "processing" 
                    ? "Processing..." 
                    : `Donate ₹${displayAmount} Now`}
                </button>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Payments are securely processed by Razorpay.
                </p>
              </div>
            </div>

            {/* Our Impact Together - Stats Section */}
            <div className="text-center mt-20" ref={statsRef}>
              <h2 className="text-3xl font-bold text-foreground">Our Impact Together</h2>
              <p className="text-muted-foreground mt-2 mb-8">See how donations are making a real difference.</p>
              <div className="stats-grid">
                <div className="stat-item"><Heart className="w-8 h-8 text-primary"/> <span id="rescued-stat" className="stat-number">0+</span> <span className="stat-label">Animals Rescued</span></div>
                <div className="stat-item"><Users className="w-8 h-8 text-primary"/> <span id="ngo-stat" className="stat-number">0+</span> <span className="stat-label">Partner NGOs</span></div>
                <div className="stat-item"><Target className="w-8 h-8 text-primary"/> <span className="stat-number">98%</span> <span className="stat-label">Success Rate</span></div>
                <div className="stat-item"><Activity className="w-8 h-8 text-primary"/> <span className="stat-number">24/7</span> <span className="stat-label">Emergency Response</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DonatePage;