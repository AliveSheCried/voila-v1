import { useMutation } from "@apollo/client";
import { useContext, useEffect } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import { GENERATE_ACCESS_TOKEN } from "../../graphql/mutations/generatePaymentAccessToken";

import Token from "./Token";

const Tokens = () => {
  const [generateToken, { loading, data }] = useMutation(GENERATE_ACCESS_TOKEN);
  const { tokenData, setToken } = useContext(TokenContext);

  const handleCreateToken = (type) => {
    if (type === "payment") {
      generateToken({
        variables: {
          grantType: "client_credentials",
          scope: "payments",
          redirectUri: "",
          code: "",
        },
      });
    }
  };

  useEffect(() => {
    if (data) {
      const { access_token, expires_in, scope } = data.generateAccessToken;
      const expiryTimestamp = Date.now() + expires_in * 1000; // Convert expires_in to milliseconds and add it to the current time
      console.log(expiryTimestamp, scope);
      setToken({
        tokenData: {
          name: scope,
          type: "Bearer",
          expiry: expiryTimestamp, //parseInt(expires_in, 10),
          state: "active",
          accessToken: access_token,
        },
      });
    }
  }, [data]);

  console.log(tokenData.expiry);

  return (
    <div>
      <Token
        name="data"
        loading={loading}
        // expiry={data?.generateAccessToken.expires_in}
        onCreateToken={() => handleCreateToken("data")}
      />
      <Token
        name="payment"
        loading={loading}
        expiry={tokenData.expiry} //{data?.generateAccessToken.expires_in}
        onCreateToken={() => handleCreateToken("payment")}
      />
    </div>
  );
};

export default Tokens;
