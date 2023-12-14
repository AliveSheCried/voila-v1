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
      const expiresInNumber = Number(expires_in); // Make sure it's a number
      if (!isNaN(expiresInNumber)) {
        const expiryTimestamp = Date.now() + expiresInNumber * 1000;
        //  console.log("Tokens: useEffect", expiryTimestamp, scope);
        setToken({
          name: scope,
          type: "Bearer",
          expiry: Number(expiryTimestamp),
          state: "active",
          accessToken: access_token,
        });
      } else {
        console.error("expires_in is not a number", expires_in);
      }
    }
  }, [data]);

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
        //    expiry={Number(tokenData?.expiry || 0)} //{data?.generateAccessToken.expires_in}
        onCreateToken={() => handleCreateToken("payment")}
      />
    </div>
  );
};

export default Tokens;
