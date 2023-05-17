import { AuthToken } from "./TrueLayer/AuthToken/index.js";
import { BankAccount } from "./TrueLayer/BankAccount/index.js";
import { MerchantAccountPayout } from "./TrueLayer/MerchantAccountPayout/index.js";
import { MerchantAccount } from "./TrueLayer/MerchantAccounts/index.js";

const resolvers = {
  ...MerchantAccount.resolvers,
  Query: {
    ...MerchantAccountPayout.resolvers.queries,
    ...MerchantAccount.resolvers.queries,
    ...BankAccount.resolvers.queries,
  },

  Mutation: {
    ...MerchantAccountPayout.resolvers.mutations,
    ...AuthToken.resolvers.mutations,
  },
};

export default resolvers;
