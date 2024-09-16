import { gql } from "apollo-server";
import { AuthToken } from "./TrueLayer/AuthToken/index.js";
import { BankAccount } from "./TrueLayer/BankAccount/index.js";
import { MerchantAccountPayout } from "./TrueLayer/MerchantAccountPayout/index.js";
import { MerchantAccount } from "./TrueLayer/MerchantAccounts/index.js";
import { UserPayment } from "./TrueLayer/Payments/index.js";

const typeDefs = gql`
  ${MerchantAccountPayout.types}
  ${MerchantAccount.types}
  ${BankAccount.types}
  ${AuthToken.types}
  ${UserPayment.types}

  type Query {
    ${MerchantAccountPayout.queries}
    ${MerchantAccount.queries}
    ${BankAccount.queries}
    ${UserPayment.queries}
  }

  type Mutation {
    ${MerchantAccountPayout.mutations}
    ${AuthToken.mutations}
    ${UserPayment.mutations}
  }
`;

export default typeDefs;
