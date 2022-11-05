const { gql } = require("apollo-server");

const typeDefs = gql`
  #Placeholder empty query
  type Query {
    _dummy: String
  }

  # Mutation type to get access_token
  type Mutation {
    generateAccessToken(
      client_id: String!
      client_secret: String!
      scope: String!
      grant_type: String!
    ): AccessToken
  }

  "Access token received from Truelayer"
  type AccessToken {
    access_token: ID!
    expires_in: String!
    token_type: String!
    scope: String!
  }
`;

module.exports = typeDefs;
