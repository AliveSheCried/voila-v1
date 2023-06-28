import { merchantAccount } from "./resolverMerchantAccount.js";
import { merchantAccounts } from "./resolverMerchantAccounts.js";
import { merchantAccountTransactions } from "./resolverMerchantAccountTransactions.js";

const queries = {
  merchantAccounts: merchantAccounts,
  merchantAccount: merchantAccount,
  merchantAccountTransactions: merchantAccountTransactions,
};

export const resolvers = { queries };
