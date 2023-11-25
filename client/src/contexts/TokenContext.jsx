import { createContext } from "react";

export const TokenContext = createContext({
  tokenData: {
    name: "",
    type: "",
    expiry: "",
    state: "",
    accessToken: "",
  },

  setToken: () => {},
});
