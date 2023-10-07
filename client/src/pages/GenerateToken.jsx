import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";

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

const GenerateToken = () => {
  const [generateToken, { loading, error, data }] = useMutation(
    GENERATE_ACCESS_TOKEN
  );

  useEffect(() => {
    generateToken({
      variables: {
        grantType: "client_credentials", // Replace with actual value
        scope: "payments", // Replace as needed
        redirectUri: "", // Replace as needed
        code: "", // Replace as needed
      },
    });
  }, [generateToken]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (data) {
    return (
      <section className="test text-xxs">
        <p>Token Generated Successfully</p>
        <p>Access Token: {data.generateAccessToken.access_token}</p>
      </section>
    );
  }

  return null;
};

export default GenerateToken;
