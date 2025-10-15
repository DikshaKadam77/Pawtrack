// src/pages/DonatePage.js
import { useState, useMemo, useEffect, useRef } from "react";
import { Heart, DollarSign, Zap, Star, ShieldCheck, FileText, Users, Target, Activity } from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import PaymentSuccess from "../Components/PaymentSuccess";

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
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const statsRef = useRef(null);

  const donationAmounts = [
    { amount: 250, icon: Heart, description: "Feeds 5 animals" },
    { amount: 500, icon: DollarSign, description: "Medical checkup" },
    { amount: 1000, icon: Zap, description: "Emergency treatment" },
    { amount: 2500, icon: ShieldCheck, description: "Sponsor a rescue" },
  ];

  const impactText = useMemo(() => {
    if (activeSelection === 'custom') {
      const amount = Number(customAmount) || 0;
      if (amount > 0) return `₹${amount} is a generous contribution that will directly fund our rescue operations.`;
      return "Your custom donation makes a huge difference.";
    }
    const selected = donationAmounts.find(d => d.amount === activeSelection);
    return selected ? `₹${selected.amount} allows us to provide a ${selected.description.toLowerCase()}.` : "Select an amount to see your impact.";
  }, [activeSelection, customAmount, donationAmounts]);

  const displayAmount = useMemo(() => {
    return activeSelection === 'custom' ? (Number(customAmount) || 0) : activeSelection;
  }, [activeSelection, customAmount]);

  useEffect(() => { /* ... counter animation logic ... */ });

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
      id: `order_${Date.now()}`,
      currency: "INR",
    };

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID",
      amount: orderDetails.amount,
      currency: orderDetails.currency,
      name: "Paw Track Foundation",
      description: "Donation for Animal Welfare in Karjat",
      image: "/logo.png",
      order_id: orderDetails.id,
      handler: function (response) {
        console.log("Payment Successful", response);
        setPaymentStatus("success");
      },
      prefill: { name: "Valued Supporter", email: "supporter@example.com", contact: "9999999999" },
      theme: { color: "#8b5cf6" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      alert(response.error.description);
      setPaymentStatus("idle");
    });
    paymentObject.open();
  };

  // --- THIS IS THE CORRECTED STRUCTURE ---
  // If payment is successful, the component returns this JSX and stops.
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

  // If payment is not successful, the component continues and returns the main donation form below.
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
                  Your contribution creates a ripple of kindness, funding rescue operations in Karjat and ensuring every animal gets the care they need.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-foreground"><ShieldCheck className="w-5 h-5 text-primary" /> 100% Secure Donations</div>
                  <div className="flex items-center gap-2 text-foreground"><FileText className="w-5 h-5 text-primary" /> Tax Deductible</div>
                </div>
              </div>
              <div className="ripple-container">
                <div className="central-ripple-icon">
                  <Heart fill="currentColor" className="w-8 h-8" />
                </div>
                <div className="ripple ripple-1"></div>
                <div className="ripple ripple-2"></div>
                <div className="ripple ripple-3"></div>
              </div>
            </div>

            {/* Donation Card */}
            <div className="donation-card">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-foreground">Choose Your Impact</h2>
                <p className="text-muted-foreground">Select an amount to see the direct impact on animal lives.</p>
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
                    <button key={amount} onClick={() => setActiveSelection(amount)} className={`amount-option ${activeSelection === amount ? 'active' : ''}`}>
                      <Icon className="w-6 h-6 mb-1" />
                      <span className="amount-value">₹{amount}</span>
                      <span className="amount-desc">{description}</span>
                    </button>
                  ))}
                  <button onClick={() => setActiveSelection('custom')} className={`amount-option custom-option ${activeSelection === 'custom' ? 'active' : ''}`}>
                    <Star className="w-6 h-6 mb-1" />
                    <span className="amount-value">Custom</span>
                    <input type="number" placeholder="Amount" className="custom-amount-input" value={customAmount} onClick={(e) => e.stopPropagation()} onChange={(e) => setCustomAmount(e.target.value)} />
                  </button>
                </div>
                <div className="impact-box">
                  <h4 className="font-semibold">Your Impact</h4>
                  <p key={impactText} className="impact-text-animate">{impactText}</p>
                </div>
                <button className="donate-now-btn" onClick={handlePayment} disabled={paymentStatus === "processing"}>
                  <Heart className="w-5 h-5 mr-2" />
                  {paymentStatus === "processing" ? "Processing..." : `Donate ₹${displayAmount} Now`}
                </button>
                <p className="text-center text-xs text-muted-foreground mt-2">Payments are securely processed by Razorpay.</p>
              </div>
            </div>
            <div className="text-center mt-20" ref={statsRef}>
              {/* ... stats JSX ... */}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DonatePage;