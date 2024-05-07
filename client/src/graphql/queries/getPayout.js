import { gql } from "@apollo/client";

export const GET_PAYOUT_DETAIL = gql`
  query GetPayoutDetail($id: ID!) {
    payoutDetail(id: $id) {
      id
      merchant_account_id
      pay_amount_in_minor
      currency
      beneficiary {
        type
        account_holder_name
        reference
        account_identifiers {
          type
          sort_code
          account_number
          iban
        }
      }
      scheme_id
      status
      created_at
      authorized_at
      executed_at
      failed_at
      failure_reason
    }
  }
`;
