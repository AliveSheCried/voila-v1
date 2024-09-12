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
    amount: Float!
    currency: String!
    provider_id: String!
    scheme_id: String
    redirect_uri: String!
  }

  type CreatePaymentResponse {
    payment_id: String!
    status: String!
    redirect_uri: String!
  }
  


  
`;

export default types;

// schema/TrueLayer/Payments/types.js
// const { gql } = require('apollo-server-express');

// const typeDefs = gql`
//   type Payment {
//     id: String!
//     amount: Float!
//     currency: String!
//     status: String
//     created_at: String
//     payment_method: PaymentMethod
//   }

//   type PaymentMethod {
//     type: String!
//     provider_id: String!
//     scheme_id: String
//   }

//   input CreatePaymentInput {
//     amount: Float!
//     currency: String!
//     provider_id: String!
//     scheme_id: String
//     redirect_uri: String!
//   }

//   type CreatePaymentResponse {
//     payment_id: String!
//     status: String!
//     redirect_uri: String!
//   }

//   type Query {
//     getPayment(paymentId: String!): Payment
//   }

//   type Mutation {
//     createPayment(input: CreatePaymentInput!): CreatePaymentResponse
//   }
// `;

// module.exports = typeDefs;
