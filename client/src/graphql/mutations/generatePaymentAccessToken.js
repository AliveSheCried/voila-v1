import { gql } from "@apollo/client";

export const GENERATE_ACCESS_TOKEN = gql`
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
