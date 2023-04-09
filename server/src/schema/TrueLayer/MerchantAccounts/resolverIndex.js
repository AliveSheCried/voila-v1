import merchantAccount from "./resolverMerchantAccount.js";
import merchantAccounts from "./resolverMerchantAccounts.js";
import merchantAccountTransactions from "./resolverMerchantAccountTransactions.js";

const queries = {
  ...merchantAccount,
  ...merchantAccounts,
  ...merchantAccountTransactions,
};

export const resolvers = { queries };
