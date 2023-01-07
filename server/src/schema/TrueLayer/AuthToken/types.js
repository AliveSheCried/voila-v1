const types = `
### Types
"Access token received from Truelayer"
type AccessToken {
  access_token: ID!
  expires_in: String!
  token_type: String!
  scope: String!
  refresh_token: String
}
`;

export default types;
