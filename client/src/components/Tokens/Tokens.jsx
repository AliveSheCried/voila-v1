import { useGenerateToken } from "../../hooks/useGenerateToken";
import Token from "./Token";

const Tokens = () => {
  const { handleCreateToken, loading } = useGenerateToken();

  return (
    <div>
      <Token
        name="data"
        loading={loading}
        onCreateToken={() => handleCreateToken("data", "data")}
      />

      <Token
        name="payment"
        loading={loading}
        onCreateToken={() => handleCreateToken("payments", "merchantData")}
      />
    </div>
  );
};

export default Tokens;

/*   
Previously working code before refactoring to use providers and contexts:

import { useMutation } from "@apollo/client";
import { useContext, useEffect } from "react";
import {
  DataTokenContext,
  PaymentTokenContext,
} from "../../contexts/TokenContext";

import { GENERATE_ACCESS_TOKEN } from "../../graphql/mutations/generatePaymentAccessToken";

import Token from "./Token";

const Tokens = () => {
  const [generateToken, { loading, data }] = useMutation(GENERATE_ACCESS_TOKEN);
  const { token: dataToken, setToken: setDataToken } =
    useContext(DataTokenContext);
  const { token: paymentToken, setToken: setPaymentToken } =
    useContext(PaymentTokenContext);

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
      //console.log("data", data);
      const { access_token, expires_in, scope } = data.generateAccessToken;
      //console.log("scope", scope);
      const expiresInNumber = Number(expires_in); // Make sure it's a number
      if (!isNaN(expiresInNumber)) {
        const expiryTimestamp = Date.now() + expiresInNumber * 1000;
        const newToken = {
          name: scope,
          type: "Bearer",
          expiry: Number(expiryTimestamp),
          state: "active",
          accessToken: access_token,
        };

        // console.log("access_token", access_token);

        // Determine which context to update
        if (scope === "payments") {
          setPaymentToken(newToken);
        } else if (scope === "data") {
          setDataToken(newToken);
        }
      } else {
        console.error("expires_in is not a number", expires_in);
      }
    }
  }, [data, setPaymentToken, setDataToken]);

  return (
    <div>
      <DataTokenContext.Provider
        value={{ token: dataToken, setToken: setDataToken }}
      >
        <Token
          name="data"
          loading={loading}
          // expiry={data?.generateAccessToken.expires_in}
          onCreateToken={() => handleCreateToken("data")}
        />
      </DataTokenContext.Provider>
      <PaymentTokenContext.Provider
        value={{ token: paymentToken, setToken: setPaymentToken }}
      >
        <Token
          name="payment"
          loading={loading}
          //    expiry={Number(tokenData?.expiry || 0)} //{data?.generateAccessToken.expires_in}
          onCreateToken={() => handleCreateToken("payment")}
        />
      </PaymentTokenContext.Provider>
    </div>
  );
};

export default Tokens;




*/
