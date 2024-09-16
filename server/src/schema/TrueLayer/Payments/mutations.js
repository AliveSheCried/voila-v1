export const mutations = `
  ## End user payment
  createUserPayment(
  amount_in_minor: Float!
  currency: String!
  merchant_account_id: String!
  user_id: String!
  user_name: String!
  user_email: String!
  user_phone: String!
  user_date_of_birth: String!
  user_address_line1: String!
  user_city: String!
  user_state: String!
  user_zip: String!
  user_country_code: String!
): CreatePaymentResponse

`;
