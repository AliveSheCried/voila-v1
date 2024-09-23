import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Redirect = () => {
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");

    if (paymentId) {
      // You can send the paymentId to your server to confirm the payment status
      console.log("Payment ID:", paymentId);
    }
  }, [location]);

  return (
    <div>
      <h1>Payment Processing</h1>
      <p>We are processing your payment. Payment ID: {paymentId}</p>
    </div>
  );
};

export default Redirect;
