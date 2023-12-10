import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Token = ({ name, loading, onCreateToken, expiry }) => {
  const [timeLeft, setTimeLeft] = useState(expiry);

  console.log(expiry);

  useEffect(() => {
    // Set the initial timeLeft value to the expiry time when the component mounts
    const timeRemaining = Math.max(Math.floor((expiry - Date.now()) / 1000), 0);
    console.log(timeRemaining);
    setTimeLeft(timeRemaining);
  }, [expiry]);

  useEffect(() => {
    let timer;

    // Update the countdown every second if timeLeft is set
    if (timeLeft && timeLeft > 0) {
      timer = setInterval(() => {
        const timeRemaining = Math.max(
          Math.floor((expiry - Date.now()) / 1000),
          0
        );
        setTimeLeft(timeRemaining);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeLeft, expiry]); // Dependency array

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
          : timeLeft
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
  expiry: PropTypes.number,
};

export default Token;
