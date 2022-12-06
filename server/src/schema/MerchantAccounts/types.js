const types = `
  ###Union
  union MerchantAccountTransactions = Payout | MerchantAccountPayment | ExternalPayment

  ###Interfaces
  interface Transaction {
    type: String!
    id: ID!
    currency: String!
    amount_in_minor: Float!
    status: String!
  }

  ###Types
  "Merchant bank account data structure at TrueLayer"
  type MerchantAccount {
    id: ID!
    currency: String!
    account_identifiers: [AccountIdentifier]
    available_balance: String
    current_balance: String
    account_holder_name: String
  }

  "Payout type; consists of Transaction interface + fields specific to Payouts"
  type Payout implements Transaction {
    #Fields from Transaction
    type: String!
    id: ID!
    currency: String!
    amount_in_minor: Float!
    status: String!

    #Fields specific to Payouts
    created_at: String!
    executed_at: String!
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
    amount_in_minor: Float!
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
    amount_in_minor: Float!
    status: String!

    #Fields specific to External payment
    settled_at: String!
    remitter: Remitter!
  }


  ###SubTypes

  "Different bank account types - part of the Merchant account data structure"
  type AccountIdentifier {
    type: String!
    sort_code: String
    account_number: String
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

`;

export default types;
