import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

const PaymentSelection = ({
  selectedPayment,
  handlePaymentChange,
  handleBackClick,
}) => {
  return (
    <div className="payment-selection">
      <h2 className="form-title">Select Payment Method</h2>
      <label
        className={`payment-option ${
          selectedPayment === "bank" ? "selected" : ""
        }`}
      >
        <input
          type="radio"
          name="payment"
          value="bank"
          checked={selectedPayment === "bank"}
          onChange={() => handlePaymentChange("bank")}
        />
        <span className="payment-label">Pay by bank app</span>
        <span className="payment-description">
          Make a direct payment securely from your bank app - no card needed
        </span>
      </label>
      <label
        className={`payment-option ${
          selectedPayment === "apple" ? "selected" : ""
        }`}
      >
        <input
          type="radio"
          name="payment"
          value="apple"
          checked={selectedPayment === "apple"}
          onChange={() => handlePaymentChange("apple")}
        />
        <span className="payment-label">Apple Pay</span>
      </label>
      <label
        className={`payment-option ${
          selectedPayment === "card" ? "selected" : ""
        }`}
      >
        <input
          type="radio"
          name="payment"
          value="card"
          checked={selectedPayment === "card"}
          onChange={() => handlePaymentChange("card")}
        />
        <span className="payment-label">Credit/Debit card</span>
      </label>
      <div className="button-group">
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
        <button
          className="next-button"
          onClick={() => alert("Payment processing...")}
        >
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

PaymentSelection.propTypes = {
  selectedPayment: PropTypes.string,
  handlePaymentChange: PropTypes.func,
  handleBackClick: PropTypes.func,
};

export default PaymentSelection;
