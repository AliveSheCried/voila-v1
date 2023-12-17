import { gql } from "@apollo/client";

export const GET_MERCHANT_ACCOUNTS = gql`
  query GetMerchantAccounts {
    merchantAccounts {
      id
      currency
      account_identifiers {
        type
        sort_code
        account_number
        iban
      }
      available_balance_in_minor
      current_balance_in_minor
      account_holder_name
    }
  }
`;
