import { gql } from "apollo-server";
import { MerchantAccountPayout } from "./TrueLayer/MerchantAccountPayout/index.js";
import { MerchantAccount } from "./TrueLayer/MerchantAccounts/index.js";
import { BankAccount } from "./TrueLayer/BankAccount/index.js";
import { AuthToken } from "./TrueLayer/AuthToken/index.js";

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
