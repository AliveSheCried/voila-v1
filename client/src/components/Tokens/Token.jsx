import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/TokenContext";

const Token = ({ name, loading, onCreateToken }) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const { tokenData } = useContext(TokenContext);

  // Function to calculate and set the time left
  const calculateTimeLeft = () => {
    const expiryTimestamp = Number(tokenData.expiry);
    const currentTime = Date.now();
    // console.log("Expiry timestamp:", expiryTimestamp);
    //console.log("Current time:", currentTime);

    const timeRemaining = Math.max(
      Math.floor((expiryTimestamp - currentTime) / 1000),
      0
    );
    // console.log("Time remaining:", timeRemaining);

    setTimeLeft(timeRemaining);
  };

  useEffect(() => {
    calculateTimeLeft(); // Call it immediately to set initial value
    const timer = setInterval(calculateTimeLeft, 1000); // Set up the interval

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, [tokenData.expiry]);

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
          : name === "payment" && timeLeft !== null && tokenData.accessToken
          ? `Time remaining: ${timeLeft}s`
          : "No active token"}
      </div>
      <div className="token__button">
        <button
          className="btn btn--secondary"
          onClick={onCreateToken}
          disabled={loading}
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
