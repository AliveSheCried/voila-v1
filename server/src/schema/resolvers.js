import { MerchantAccountPayout } from "./TrueLayer/MerchantAccountPayout/index.js";
import { MerchantAccount } from "./TrueLayer/MerchantAccounts/index.js";
import { BankAccount } from "./TrueLayer/BankAccount/index.js";
import { AuthToken } from "./TrueLayer/AuthToken/index.js";

const resolvers = {
  //interface __resolveType
  //this should be in the MerchantAccounts resolver but get an error - to be revisited
  Transaction: {
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
  },

  //this should be in the MerchantAccounts resolver but get an error - to be revisited
  //union resolveType
  MerchantAccountTransactions: {
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
  },

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
