const types = `
 type Payment {
    id: String!
    amount: Float!
    currency: String!
    status: String
    created_at: String
    payment_method: PaymentMethod
  }

  type PaymentMethod {
    type: String!
    provider_id: String!
    scheme_id: String
  }

  input CreatePaymentInput {
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
  }

  type CreatePaymentResponse {
    id: String!
    status: String!
    resource_token: String!
    user_id: String!
  }  
`;

export default types;
