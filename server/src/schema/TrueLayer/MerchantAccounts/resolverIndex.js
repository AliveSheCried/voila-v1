import merchantAccount from "./resolverMerchantAccount.js";
import merchantAccounts from "./resolverMerchantAccounts.js";
import merchantAccountTransactions from "./resolverMerchantAccountTransactions.js";

const queries = {
  ...merchantAccount,
  ...merchantAccounts,
  ...merchantAccountTransactions,
};

// define __resolveType functions for MerchantAccountTransactions and Transaction
const MerchantAccountTransactions = {
  __resolveType(obj, context, info) {
    if (obj.type === "payout") {
      return "Payout";
    }
    if (obj.type === "merchant_account_payment") {
      return "MerchantAccountPayment";
    }
    if (obj.type === "external_payment") {
      return "ExternalPayment";
    }
    return null;
  },
};

const Transaction = {
  __resolveType(transaction, context, info) {
    if (transaction.payout_id) {
      return "Payout";
    }
    if (transaction.payment_id) {
      return "MerchantAccountPayment";
    }
    if (transaction.remitter) {
      return "ExternalPayment";
    }
  },
};

export const resolvers = {
  Query: queries,
  MerchantAccountTransactions,
  Transaction,
};
