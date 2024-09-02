import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDataToken } from "../../providers/DataTokenProvider";
import { useMerchantAccountDataToken } from "../../providers/MerchantAccountDataTokenProvider";

const Token = ({ name, loading, onCreateToken }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const { token: dataToken } = useDataToken();
  const { token: merchantAccountDataToken } = useMerchantAccountDataToken();

  const token = name === "data" ? dataToken : merchantAccountDataToken;

  // Function to calculate and set the time left
  const calculateTimeLeft = () => {
    const expiryTimestamp = Number(token.expiry);
    const currentTime = Date.now();

    const timeRemaining = Math.max(
      Math.floor((expiryTimestamp - currentTime) / 1000),
      0
    );

    setTimeLeft(timeRemaining);
  };

  useEffect(() => {
    calculateTimeLeft(); // Call it immediately to set initial value
    const timer = setInterval(calculateTimeLeft, 1000); // Set up the interval

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [token.expiry]);

  return (
    <div className="token__container">
      <div className="token__title">
        <span
          className={`material-symbols-outlined token__icon ${
            name === "payment"
              ? "token__icon--payment"
              : name === "data"
              ? "token__icon--data"
              : ""
          }`}
        >
          token
        </span>
        {name} token
      </div>
      <div className="token__text">
        {loading
          ? "Generating..."
          : (name === timeLeft) !== null && token.accessToken
          ? `Time remaining: ${timeLeft}s`
          : "No active token"}
      </div>
      <div className="token__button">
        <button
          className={`btn ${
            loading || timeLeft > 0
              ? "btn--secondary-inactive"
              : "btn--secondary"
          }`}
          onClick={onCreateToken}
          disabled={loading || timeLeft > 0}
        >
          Create
        </button>
      </div>
    </div>
  );
};

Token.propTypes = {
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  onCreateToken: PropTypes.func.isRequired,
};

export default Token;
