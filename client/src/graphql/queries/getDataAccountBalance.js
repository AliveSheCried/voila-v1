import { gql } from "@apollo/client";

export const GET_DATA_ACCOUNT_BALANCE = gql`
  query GetBankAccountBalance($id: ID!) {
    bankAccountBalance(id: $id) {
      ... on InitialStatus {
        status
        message
      }
      ... on BankAccountBalance {
        currency
        available
        current
        overdraft
        update_timestamp
      }
    }
  }
`;
