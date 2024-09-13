import { useMutation } from "@apollo/client";
import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import { CREATE_PAYMENT } from "../../graphql/mutations/createUserPayment";
import { useUser } from "../../providers/UserProvider";

const PaymentSelection = ({
  selectedPayment,
  handlePaymentChange,
  handleBackClick,
}) => {
  const { user } = useUser();
  const [createPayment] = useMutation(CREATE_PAYMENT);

  const handleSubmit = async () => {
    try {
      await createPayment({
        variables: {
          amountInMinor: 1000, // Replace with actual amount
          currency: "USD", // Replace with actual currency
          merchantAccountId: "merchant_account_id", // Replace with actual merchant account ID
          userId: user._id,
          userName: user.user_id,
          userEmail: user.user_id,
          userPhone: "1234567890", // Replace with actual phone number
          userDateOfBirth: "1990-01-01", // Replace with actual date of birth
          userAddressLine1: "123 Main St", // Replace with actual address line 1
          userCity: "City", // Replace with actual city
          userState: "State", // Replace with actual state
          userZip: "12345", // Replace with actual ZIP code
          userCountryCode: "US", // Replace with actual country code
        },
      });
      alert("Payment submitted successfully!");
    } catch (error) {
      console.error("Error submitting payment:", error);
      alert("Failed to submit payment.");
    }
  };

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
        <button className="next-button" onClick={handleSubmit}>
          Submit <ArrowRight size={16} />
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
