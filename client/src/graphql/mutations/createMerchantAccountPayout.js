import { gql } from "@apollo/client";

export const CREATE_MERCHANT_ACCOUNT_PAYOUT = gql`
  mutation createPayoutExternalAccount(
    $merchantAccountId: String!
    $amountInMinor: Int!
    $currency: String!
    $type: String!
    $reference: String!
    $accountHolderName: String!
    $accountIdentifier: ExternalAccountInput!
  ) {
    createPayoutExternalAccount(
      merchant_account_id: $merchantAccountId
      amount_in_minor: $amountInMinor
      currency: $currency
      type: $type
      reference: $reference
      account_holder_name: $accountHolderName
      account_identifier: $accountIdentifier
    ) {
      id #Querying the 'id' field of the 'PayoutId' type
    }
  }
`;
