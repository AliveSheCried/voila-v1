import { gql } from "apollo-server";
import { MerchantAccount } from "./MerchantAccounts/index.js";
import { AuthToken } from "./AuthToken/index.js";

const typeDefs = gql`
  ${MerchantAccount.types}
  ${AuthToken.types}

  type Query {
    ${MerchantAccount.queries}
  }

  type Mutation {
    ${AuthToken.mutations}
  }
`;

export default typeDefs;
