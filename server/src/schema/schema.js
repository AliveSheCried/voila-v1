import { gql } from "apollo-server";
import { MerchantAccount } from "./MerchantAccounts/index.js";
import { BankAccount } from "./BankAccount/index.js";
import { AuthToken } from "./AuthToken/index.js";

const typeDefs = gql`
  ${MerchantAccount.types}
  ${BankAccount.types}
  ${AuthToken.types}

  type Query {
    ${MerchantAccount.queries}
    ${BankAccount.queries}
  }

  type Mutation {
    ${AuthToken.mutations}
  }
`;

export default typeDefs;
