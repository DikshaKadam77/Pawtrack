// src/Components/PaymentSuccess.jsx
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="payment-success-container">
      <CheckCircle className="w-20 h-20 text-green-500 mb-4" />
      <h2 className="text-3xl font-bold text-foreground mb-2">Thank You for Your Donation!</h2>
      <p className="text-muted-foreground mb-6">
        Your generosity helps us save lives. You will receive a receipt for your contribution via email shortly.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default PaymentSuccess;