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

  

  type CreatePaymentResponse {
    id: String!
    status: String!
    resource_token: String!
    user_id: String!
  }  
`;

export default types;
