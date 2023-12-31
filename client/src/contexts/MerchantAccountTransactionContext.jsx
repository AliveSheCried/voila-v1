import { createContext } from "react";

export const MerchantAccountTransactionContext = createContext({
  merchantAccountTransactions: [],
  setMerchantAccountTransactions: () => {},
});
