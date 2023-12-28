import { createContext } from "react";

export const MerchantAccountContext = createContext({
  merchantAccounts: [],
  setMerchantAccounts: () => {},
});
