import { MerchantAccount } from "./MerchantAccounts/index.js";
import { AuthToken } from "./AuthToken/index.js";

const resolvers = {
  Query: {
    ...MerchantAccount.resolvers.queries,
  },

  Mutation: {
    ...AuthToken.resolvers.mutations,
  },
};

export default resolvers;
