import PropTypes from "prop-types";
import { useState } from "react";

const Token = ({ tokenName }) => {
  const [timeLeft, setTimeLeft] = useState(3600);
  let colorClass;
  if (timeLeft <= 360) {
    colorClass = "bg-red";
  } else if (timeLeft <= 1080) {
    colorClass = "bg-amber";
  } else {
    colorClass = "bg-green";
  }
  return (
    <div className={`token__card text-xxs ${colorClass}`}>
      <span className="text-bold">{tokenName}</span>
      <br />
      {timeLeft}
    </div>
  );
};

Token.propTypes = {
  tokenName: PropTypes.string.isRequired,
};

export default Token;
