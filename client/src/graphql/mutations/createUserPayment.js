import { gql } from "@apollo/client";

// GraphQL mutation for creating a payment
export const CREATE_USER_PAYMENT = gql`
  mutation createUserPayment(
    $amountInMinor: Float!
    $currency: String!
    $merchantAccountId: String!
    $userId: String!
    $userName: String!
    $userEmail: String!
    $userPhone: String!
    $userDateOfBirth: String!
    $userAddressLine1: String!
    $userCity: String!
    $userState: String!
    $userZip: String!
    $userCountryCode: String!
  ) {
    createUserPayment(
      amount_in_minor: $amountInMinor
      currency: $currency
      merchant_account_id: $merchantAccountId
      user_id: $userId
      user_name: $userName
      user_email: $userEmail
      user_phone: $userPhone
      user_date_of_birth: $userDateOfBirth
      user_address_line1: $userAddressLine1
      user_city: $userCity
      user_state: $userState
      user_zip: $userZip
      user_country_code: $userCountryCode
    ) {
      id
      status
      resource_token
      user {
        id
      }
    }
  }
`;
