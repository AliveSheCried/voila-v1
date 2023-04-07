import { queries } from "./queries.js";
import {
  bankAccountBalance,
  bankAccountDirectDebits,
  bankAccountStandingOrders,
} from "./resolverBankAccountData.js";
import { bankAccountTransactions } from "./resolverBankAccountTransactions.js";
import { bankAccount, bankAccounts } from "./resolverBankAccounts.js";
import types from "./types.js";

const resolvers = {
  ...bankAccount,
  ...bankAccounts,
  ...bankAccountBalance,
  ...bankAccountDirectDebits,
  ...bankAccountStandingOrders,
  ...bankAccountTransactions,
};

export const BankAccount = { queries, resolvers, types };
