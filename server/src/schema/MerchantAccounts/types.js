const types = `
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
`;

export default types;
