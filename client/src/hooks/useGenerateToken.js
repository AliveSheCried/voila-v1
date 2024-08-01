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
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  let secondaryRef = useRef();

  const handleCreateToken = useCallback(
    (type, secondaryScope, hasAuthCode = false, userId = "") => {
      secondaryRef.current = secondaryScope;

      //if there is no auth code, redirect to the TrueLayer auth link
      if (!hasAuthCode && type === "data") {
        const authWindow = window.open("/loading.html", "_blank"); // Open a new window with a loading page

        const fetchAuthLink = async (userId) => {
          try {
            const response = await fetch(`${apiBaseUrl}/redirect-to-auth`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ userId }),
            });
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            //const data = await response.json();
            const text = await response.text();
            const data = JSON.parse(text); // Manually parse to catch any non-JSON responses

            if (data.authLink) {
              authWindow.location.href = data.authLink;
            } else {
              console.error("Auth link not found");
              authWindow.close();
            }
          } catch (error) {
            console.error("Error fetching auth link:", error);
            authWindow.close();
          }
        };

        fetchAuthLink(userId);

        return;
      } else {
        //if there is an auth code, decrypt it then generate the token
        console.log("user:", userId);
        console.log("auth code exists:", hasAuthCode);
      }

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
