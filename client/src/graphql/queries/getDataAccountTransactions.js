import { gql } from "@apollo/client";

export const GET_DATA_ACCOUNT_TRANSACTIONS = gql`
  query GetBankAccountTransactions(
    $id: ID!
    $fromDate: String
    $toDate: String
  ) {
    bankAccountTransactions(id: $id, fromDate: $fromDate, toDate: $toDate) {
      ... on InitialStatus {
        status
        message
      }
      ... on BankAccountTransactions {
        transactions {
          timestamp
          description
          transaction_type
          transaction_category
          transaction_classification
          amount
          currency
          transaction_id
          provider_transaction_id
          normalised_provider_transaction_id
          running_balance {
            currency
            amount
          }
          meta {
            provider_transaction_category
            provider_account_id
            provider_mandate_identification
            provider_standing_order_id
          }
        }
      }
    }
  }
`;
