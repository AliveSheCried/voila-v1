import React, { useState } from "react";

const Start = () => {
  const [stage, setStage] = useState(false);

  const className = stage ? "start__2" : "start__1";
  const text = stage
    ? `now, create an out-going payment <<`
    : `to start, create a payment token >>`;

  return <div className={className}>{text}</div>;
};

export default Start;
