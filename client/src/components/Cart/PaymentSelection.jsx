import { useMutation } from "@apollo/client";
import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import { CREATE_USER_PAYMENT } from "../../graphql/mutations/createUserPayment";
import { useMerchantAccountDataToken } from "../../providers/MerchantAccountDataTokenProvider";

const PaymentSelection = ({
  selectedPayment,
  handlePaymentChange,
  handleBackClick,
  user,
  total,
  userDetails,
}) => {
  const [createUserPayment] = useMutation(CREATE_USER_PAYMENT);
  const { token } = useMerchantAccountDataToken();
  const body = {
    amountInMinor: total * 100, // Convert total to minor currency unit
    currency: "GBP", // Hardcoded currency for now
    merchantAccountId: "e1eff241-77d7-490d-aef4-d2701d68f90a", // Replace with actual merchant account ID
    userId: "a4315dfd-40b5-4b38-8289-1a0c22532c17", // Hardcoded user ID for now; no UUID generated for user
    userName: userDetails.name,
    userEmail: user.user_id,
    userPhone: userDetails.phone,
    userDateOfBirth: userDetails.date_of_birth,
    userAddressLine1: userDetails.address.address_line1,
    userCity: userDetails.address.city,
    userState: userDetails.address.state,
    userZip: userDetails.address.zip,
    userCountryCode: userDetails.address.country_code,
  };

  const handleSubmit = async () => {
    try {
      const response = await createUserPayment({
        variables: body,
        context: {
          headers: {
            authorization: `${token.accessToken}`,
          },
        },
      });

      console.log("Response for HPP URL", response);
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
  user: PropTypes.object,
  total: PropTypes.number,
  userDetails: PropTypes.object,
};

export default PaymentSelection;
