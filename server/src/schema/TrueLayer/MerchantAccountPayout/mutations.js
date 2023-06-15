export const mutations = `
createPayoutExternalAccount(
  "Internal merchant account issuing payment"
  merchant_account_id: String!
  "Payment amount"
  amount_in_minor: Int!
  "Currency"
  currency: String!

  #Beneficiary data
  "Type payment - hardcoded to 'external_account'"
  type: String!
  "Payment reference"
  reference: String!
  "Account holder; currently most basic - will require more detail for other payment types e.g. SEPA"
  account_holder_name: String!
  "Account identifier - either sort code or IBAN"
  account_identifier: ExternalAccountInput!
  
): PayoutId
`;
