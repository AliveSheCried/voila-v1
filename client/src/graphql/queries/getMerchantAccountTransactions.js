import { gql } from "@apollo/client";

export const GET_MERCHANT_ACCOUNT_TRANSACTIONS = gql`
  query GetMerchantAccountTransactions(
    $merchantAccountId: ID!
    $fromDate: String!
    $toDate: String!
  ) {
    merchantAccountTransactions(
      id: $merchantAccountId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      ... on Payout {
        type
        id
        currency
        amount_in_minor
        status
        created_at
        executed_at
        beneficiary {
          account_holder_name
          reference
          account_identifiers {
            type
            sort_code
            account_number
            iban
          }
        }
      }
      ... on ExternalPayment {
        type
        id
        currency
        amount_in_minor
        status
        settled_at
        remitter {
          account_holder_name
          account_identifiers {
            type
            sort_code
            account_number
          }
          account_identifiers {
            type
            sort_code
            account_number
            iban
          }
          reference
        }
      }
      ... on MerchantAccountPayment {
        type
        id
        currency
        amount_in_minor
        status
        settled_at
        payment_source {
          account_holder_name
          account_identifiers {
            type
            sort_code
            account_number
          }
          account_identifiers {
            type
            sort_code
            account_number
            iban
          }
        }
      }
    }
  }
`;
