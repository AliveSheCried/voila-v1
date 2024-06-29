import { useMutation } from "@apollo/client";
import { useCallback, useEffect, useRef } from "react";
import { GENERATE_ACCESS_TOKEN } from "../graphql/mutations/generatePaymentAccessToken";
import { useDataToken } from "../providers/DataTokenProvider";
import { useMerchantAccountDataToken } from "../providers/MerchantAccountDataTokenProvider";
import { usePaymentToken } from "../providers/PaymentTokenProvider";

export const useGenerateToken = () => {
  const [generateToken, { loading, data }] = useMutation(GENERATE_ACCESS_TOKEN);
  const { updateToken: updateDataToken } = useDataToken();
  const { updateToken: updateMerchantToken } = useMerchantAccountDataToken();
  const { updateToken: updatePaymentToken } = usePaymentToken();
  let secondaryRef = useRef();

  const handleCreateToken = useCallback(
    (type, secondaryScope) => {
      secondaryRef.current = secondaryScope;
      generateToken({
        variables: {
          grantType: "client_credentials",
          scope: type,
          redirectUri: "",
          code: "",
        },
      });
    },
    [generateToken]
  );

  useEffect(() => {
    if (data) {
      const { access_token, expires_in, scope } = data.generateAccessToken;
      const expiresInNumber = Number(expires_in);

      if (!isNaN(expiresInNumber)) {
        const expiryTimestamp = Date.now() + expiresInNumber * 1000;
        const newToken = {
          name: scope,
          type: "Bearer",
          expiry: expiryTimestamp,
          state: "active",
          accessToken: access_token,
        };

        if (scope === "payments") {
          if (secondaryRef.current === "merchantData") {
            updateMerchantToken(newToken, expiresInNumber);
          } else if (secondaryRef.current === "payment") {
            updatePaymentToken(newToken, expiresInNumber);
          }
        } else if (scope === "data") {
          updateDataToken(newToken, expiresInNumber);
        }
      } else {
        console.error("expires_in is not a number", expires_in);
      }
    }
  }, [data, updateMerchantToken, updateDataToken, updatePaymentToken]);

  return { handleCreateToken, loading };
};
