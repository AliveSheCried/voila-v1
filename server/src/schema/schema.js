const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    "Return list of merchant accounts"
    merchantAccounts: [MerchantAccounts]!

    "Return individual merchant account"
    merchantAccountDetail(id: ID!): MerchantAccountDetail!
  }

  ###Interfaces
  interface MerchantAccount {
    id: ID!
    currency: String!
    account_identifiers: [AccountIdentifier]
    available_balance: String!
    current_balance: String!
    account_holder_name: String
  }

  ###Types
  #Type - AllMerchantAccounts
  "Merchant bank account data structure at TrueLayer"
  type MerchantAccounts implements MerchantAccount {
    id: ID!
    currency: String!
    account_identifiers: [AccountIdentifier]
    available_balance: String!
    current_balance: String!
    account_holder_name: String
  }

  #Type MerchantAccountDetail
  type MerchantAccountDetail implements MerchantAccount {
    ##from interface
    id: ID!
    currency: String!
    account_identifiers: [AccountIdentifier]
    available_balance: String!
    current_balance: String!
    account_holder_name: String
  }

  "Different bank account types - part of the Merchant account data structure"
  type AccountIdentifier {
    type: String!
    sort_code: String
    account_number: String
    iban: String
  }

  ###Mutations
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
