import { MerchantAccount } from "./MerchantAccounts/index.js";
import { BankAccount } from "./BankAccount/index.js";
import { AuthToken } from "./AuthToken/index.js";

const resolvers = {
  //interface __resolveType
  //this should be in the MerchantAccounts resolver but get an error - to be revisited
  MerchantAccount: {
    __resolveType(MerchantAccount) {
      if (MerchantAccount.items) {
        return "Merchant accounts";
      }
      return "Merchant account detail";
    },
  },

  Query: {
    ...MerchantAccount.resolvers.queries,
    ...BankAccount.resolvers.queries,
  },

  Mutation: {
    ...AuthToken.resolvers.mutations,
  },
};

export default resolvers;
