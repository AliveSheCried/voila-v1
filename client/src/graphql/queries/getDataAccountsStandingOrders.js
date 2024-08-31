import { gql } from "@apollo/client";

export const GET_DATA_ACCOUNTS_STANDING_ORDERS = gql`
  query GetBankAccountStandingOrders($id: ID!) {
    bankAccountStandingOrders(id: $id) {
      ... on InitialStatus {
        status
        message
      }
      ... on StandingOrders {
        standingOrders {
          frequency
          status
          timestamp
          currency
          meta {
            provider_transaction_category
            provider_account_id
            provider_mandate_identification
            provider_standing_order_id
          }
          next_payment_date
          next_payment_amount
          first_payment_date
          first_payment_amount
          final_payment_date
          final_payment_amount
          reference
        }
      }
    }
  }
`;
