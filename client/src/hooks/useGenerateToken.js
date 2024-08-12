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

  const handleTokenResponse = (tokenResponse, updateToken) => {
    if (tokenResponse) {
      const { access_token, expires_in, scope } = tokenResponse;
      const expiresInNumber = Number(expires_in);
      const expiryTimestamp = Date.now() + expiresInNumber * 1000;
      const newToken = {
        name: scope,
        type: "Bearer",
        expiry: expiryTimestamp,
        state: "active",
        accessToken: access_token,
      };

      updateToken(newToken, expiresInNumber);
    } else {
      console.error("Failed to retrieve data token");
    }
  };

  const isTokenExpired = (createdDateTime) => {
    const tokenAge = Date.now() - new Date(createdDateTime).getTime();
    const ninetyDaysInMilliseconds = 90 * 24 * 60 * 60 * 1000;
    return tokenAge > ninetyDaysInMilliseconds;
  };

  const handleCreateToken = useCallback(
    (type, secondaryScope, userId = "", authCode = false) => {
      secondaryRef.current = secondaryScope;

      //if there is an auth code, check if it's expired; if not, fetch the data token, else redirect to the TrueLayer auth link
      if (authCode && type === "data") {
        //if the token is not expired, decrypt the refresh token and fetch the data token
        if (!isTokenExpired(authCode.createdDateTime["$date"])) {
          const fetchDataToken = async (authCode) => {
            try {
              const response = await fetch(
                `${apiBaseUrl}/data/decrypt-auth-code`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ authCode }),
                }
              );
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }

              const data = await response.json();
              handleTokenResponse(data.tokenResponse, updateDataToken);
            } catch (error) {
              console.error("Error fetching data token:", error);
            }
          };

          fetchDataToken(authCode);
        } else {
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
        }
      } else if (!authCode && type === "data") {
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
      } else if (type === "payments") {
        generateToken({
          variables: {
            grantType: "client_credentials",
            scope: "payments",
            redirectUri: "",
            code: "",
          },
        });
      }
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

  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data === "authorizationComplete") {
        try {
          const response = await fetch(`${apiBaseUrl}/data/get-token`);
          const data = await response.json();
          handleTokenResponse(data.dataToken, updateDataToken);
        } catch (error) {
          console.error("Error retrieving data token:", error);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [updateDataToken]);

  return { handleCreateToken, loading };
};
