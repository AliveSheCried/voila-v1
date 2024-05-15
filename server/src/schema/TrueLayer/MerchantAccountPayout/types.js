const types = `
###Input types
"Input type for creating an External Account payout; can be either sort code + account number or IBAN"

input ExternalAccountInput {
  type: AccountIdentifierType!
  "UK Sort code - 6 digits; pattern: ^[0-9]{6}$"
  sort_code: String
  "UK Account number - 8 digits; pattern: ^[0-9]{8}$"
  account_number: String
  "IBAN string - Valid International Bank Account Number (no spaces). Consists of a 2 letter country code, followed by 2 check digits, and then by up to 30 alphanumeric characters (also known as the BBAN). pattern: ^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$"
  iban: String
}

  "Payout detail returned when querying using ID"  
    type Payout {
      id: ID!
      merchant_account_id: ID!
      amount_in_minor: Int!
      currency: String!
      beneficiary: Beneficiary!
      scheme_id: String
      status: String!
      created_at: String!
      authorized_at: String
      executed_at: String
      failed_at: String
      failure_reason: String
  }

  "ID returned from Payout API when creating Payout; used to get payout detail"
  type PayoutId {
      id: ID!
    }
`;

export default types;
