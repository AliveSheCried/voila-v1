import { gql } from "@apollo/client";

export const GET_DATA_ACCOUNTS = gql`
  query GetUserbankAccounts {
    getDataAccounts {
      ... on InitialStatus {
        status
        message
      }
      ... on BankAccounts {
        accounts {
          account_id
          account_type
          display_name
          currency
          account_number {
            iban
            swift_bic
            number
            sort_code
          }
          provider {
            display_name
            provider_id
            logo_uri
          }
        }
      }
    }
  }
`;
