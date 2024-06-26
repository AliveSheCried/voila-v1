const types = `
  ###Union
  union MerchantAccountTransactions = Payout | MerchantAccountPayment | ExternalPayment

  ###Interfaces
  interface Transaction {
    type: String!
    id: ID!
    currency: String!
    amount_in_minor: Int!
    status: String!
  }

  ###Types
  "Merchant bank account data structure at TrueLayer"
  type MerchantAccount {
    id: ID!
    currency: String!
    account_identifiers: [AccountIdentifier]
    available_balance_in_minor: String
    current_balance_in_minor: String
    account_holder_name: String
    transactions(fromDate: String, toDate: String): [MerchantAccountTransactions]
  }

  "Payout type; consists of Transaction interface + fields specific to Payouts"
  type Payout implements Transaction {
    #Fields from Transaction
    type: String!
    id: ID!
    currency: String!
    amount_in_minor: Int!
    status: String!

    #Fields specific to Payouts
    created_at: String!
    executed_at: String
    beneficiary: Beneficiary!
    context_code: String!
    payout_id: ID!
  }

  "Merchant account payment type; consists of Transaction interface + fields specific to merchant account payments"
  type MerchantAccountPayment implements Transaction {
    #Fields from Transaction
    type: String!
    id: ID!
    currency: String!
    amount_in_minor: Int!
    status: String!

    #Fields specific to merchant account payment type
    settled_at: String!
    payment_source: PaymentSource!
    payment_id: ID!
  }

  #Type - External_payment - merchant account transaction type
  "External payment payment type; consists of Transaction interface + foelds specific to External payment payment type"
  type ExternalPayment implements Transaction {
    #Fields from Transaction
    type: String!
    id: ID!
    currency: String!
    amount_in_minor: Int!
    status: String!

    #Fields specific to External payment
    settled_at: String!
    remitter: Remitter!
  }

  ###SubTypes

  "Different bank account types - part of the Merchant account data structure"
  type AccountIdentifier {
    type: AccountIdentifierType!
    sort_code: String
    account_number: String
    "IBAN string - Valid International Bank Account Number (no spaces). Consists of a 2 letter country code, followed by 2 check digits, and then by up to 30 alphanumeric characters (also known as the BBAN). pattern: ^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$"
    iban: String
  }

  "Beneficiary sub-type for Payout transaction type"
  type Beneficiary {
    type: String!
    account_holder_name: String!
    account_identifier: AccountIdentifier!
    account_identifiers: [AccountIdentifier!]
    reference: String
  }

  "PaymentSource sub-type for merchant account payment type"
  type PaymentSource {
    id: ID!
    account_holder_name: String!
    account_identifiers: [AccountIdentifier!]
    user_id: ID!
  }

  "Payer sub-type for external payment payment type"
  type Remitter {
    account_holder_name: String!
    account_identifier: AccountIdentifier!
    account_identifiers: [AccountIdentifier!]
    reference: String
  }

  ###Enums

"Account identifier type enum"
enum AccountIdentifierType {
  sort_code_account_number  
  iban
}


`;

export default types;
