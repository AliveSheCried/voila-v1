import { bankAccountDataResolvers } from "./resolverBankAccountData.js";
import { bankAccountTransactionsResolvers } from "./resolverBankAccountTransactions.js";
import { bankAccountResolvers } from "./resolverBankAccounts.js";

const queries = {
  getDataAccounts: bankAccountResolvers.bankAccounts,
  bankAccount: bankAccountResolvers.bankAccount,
  bankAccountTransactions:
    bankAccountTransactionsResolvers.bankAccountTransactions,
  bankAccountPendingTransactions:
    bankAccountTransactionsResolvers.bankAccountPendingTransactions,
  bankAccountBalance: bankAccountDataResolvers.bankAccountBalance,
  bankAccountDirectDebits: bankAccountDataResolvers.bankAccountDirectDebits,
  bankAccountStandingOrders: bankAccountDataResolvers.bankAccountStandingOrders,
};

export const resolvers = { queries };
