import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/TokenContext";

const GENERATE_ACCESS_TOKEN = gql`
  mutation GenerateAccessToken(
    $grantType: String!
    $scope: String
    $redirectUri: String
    $code: String
  ) {
    generateAccessToken(
      grant_type: $grantType
      scope: $scope
      redirect_uri: $redirectUri
      code: $code
    ) {
      access_token
      expires_in
      scope
      token_type
    }
  }
`;

const Token = ({ name = "data" }) => {
  const { setToken } = useContext(TokenContext);
  const [timeLeft, setTimeLeft] = useState(null);
  const [generateToken, { loading, data }] = useMutation(GENERATE_ACCESS_TOKEN);

  useEffect(() => {
    let timer;

    // Update the countdown every second if timeLeft is set
    if (timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timer) {
      clearInterval(timer);
    }

    // Cleanup function
    return () => clearInterval(timer);
  }, [timeLeft]); // Dependency array

  const handleCreateToken = () => {
    generateToken({
      variables: {
        grantType: "client_credentials", // Replace with actual value
        scope: "payments", // Replace as needed
        redirectUri: "", // Replace as needed
        code: "", // Replace as needed
      },
    });
  };

  useEffect(() => {
    if (data) {
      const { access_token, expires_in } = data.generateAccessToken;
      setToken({
        tokenData: {
          name: name,
          type: "Bearer",
          expiry: expires_in,
          state: "active",
          accessToken: access_token,
        },
      });
      // Start the countdown timer
      setTimeLeft(expires_in);
    }
  }, [data, name]); // Rem

  return (
    <div className="token__container">
      <div className="token__title">
        <span className="material-symbols-outlined token__icon">token</span>
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
          onClick={handleCreateToken}
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
};

export default Token;
