import { gql, useMutation } from "@apollo/client";
import { useContext, useEffect } from "react";
import { TokenContext } from "../contexts/TokenContext";

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

const useGenerateDataAPIToken = () => {
  const { setToken } = useContext(TokenContext);
  const [generatePaymentToken, { loading, error, data }] = useMutation(
    GENERATE_ACCESS_TOKEN
  );

  //Sequence of conditional checks to be reviewed to ensure consistent with behaviour of mutation

  useEffect(() => {
    console.log("Effect ran due to change in:", { loading, error, data });
    if (loading) {
      setToken((prev) => ({
        ...prev,
        tokenData: {
          ...prev.tokenData,
          name: "payments",
          state: "loading",
        },
      }));
      console.log("loading");
    } else if (error) {
      setToken((prev) => ({
        ...prev,
        tokenData: {
          ...prev.tokenData,
          state: "error",
        },
      }));
      console.log("error");
    } else if (data) {
      setToken((prev) => ({
        ...prev,
        tokenData: {
          ...prev.tokenData,
          type: data.generateAccessToken.token_type,
          expiry: data.generateAccessToken.expires_in,
          state: "success",
          accessToken: data.generateAccessToken.access_token,
        },
      }));
      console.log("success");
    }
  }, [loading, error, data, setToken]);

  return { generatePaymentToken, loading, error, data };
};

export default useGenerateDataAPIToken;
