import queries from "./queries.js";
import resolverMerchantAccount from "./resolverMerchantAccount.js";
import resolverMerchantAccounts from "./resolverMerchantAccounts.js";
import resolverMerchantAccountTransactions from "./resolverMerchantAccountTransactions.js";
import types from "./types.js";

const resolvers = {
  ...resolverMerchantAccount,
  ...resolverMerchantAccounts,
  ...resolverMerchantAccountTransactions,
};

export const MerchantAccount = { queries, resolvers, types };
