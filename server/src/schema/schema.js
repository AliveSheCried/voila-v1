import { gql } from "apollo-server";
import { MerchantAccountPayout } from "./MerchantAccountPayout/index.js";
import { MerchantAccount } from "./MerchantAccounts/index.js";
import { BankAccount } from "./BankAccount/index.js";
import { AuthToken } from "./AuthToken/index.js";

const typeDefs = gql`
  ${MerchantAccountPayout.types}
  ${MerchantAccount.types}
  ${BankAccount.types}
  ${AuthToken.types}

  type Query {
    ${MerchantAccountPayout.queries}
    ${MerchantAccount.queries}
    ${BankAccount.queries}
  }

  type Mutation {
    ${MerchantAccountPayout.mutations}
    ${AuthToken.mutations}
  }
`;

export default typeDefs;
