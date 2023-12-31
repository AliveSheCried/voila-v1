import { gql } from "@apollo/client";

export const GET_MERCHANT_ACCOUNT_TRANSACTIONS = gql`
  query GetMerchantAccountTransactions(
    $merchantAccountId: ID!
    $fromDate: String
    $toDate: String
  ) {
    merchantAccountTransactions(
      id: $merchantAccountId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      type
      id
      currency
      amount_in_minor
      status
      created_at
      executed_at
      beneficiary {
        account_holder_name
        account_identifier {
          type
          sort_code
          account_number
          iban
        }
        reference
      }
    }
  }
`;
