import { gql } from "@apollo/client";

export const GET_DATA_ACCOUNTS_DIRECT_DEBITS = gql`
  query GetBankAccountDirectDebits($id: ID!) {
    bankAccountDirectDebits(id: $id) {
      ... on InitialStatus {
        status
        message
      }
      ... on DirectDebits {
        directDebits {
          direct_debit_id
          timestamp
          name
          status
          previous_payment_amount
          currency
          meta {
            provider_transaction_category
            provider_account_id
            provider_mandate_identification
          }
        }
      }
    }
  }
`;
