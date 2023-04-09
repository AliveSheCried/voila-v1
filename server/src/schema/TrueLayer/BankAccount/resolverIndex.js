import { bankAccountDataResolvers } from "./resolverBankAccountData.js";
import { bankAccountTransactionsResolvers } from "./resolverBankAccountTransactions.js";
import { bankAccountResolvers } from "./resolverBankAccounts.js";

const queries = {
  ...bankAccountResolvers,
  ...bankAccountDataResolvers,
  ...bankAccountTransactionsResolvers,
};

export const resolvers = { queries };
