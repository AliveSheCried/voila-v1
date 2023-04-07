import queries from "./queries.js";
import merchantAccount from "./resolverMerchantAccount.js";
import merchantAccounts from "./resolverMerchantAccounts.js";
import merchantAccountTransactions from "./resolverMerchantAccountTransactions.js";
import types from "./types.js";

const resolvers = {
  ...merchantAccount,
  ...merchantAccounts,
  ...merchantAccountTransactions,
};

export const MerchantAccount = { queries, resolvers, types };
