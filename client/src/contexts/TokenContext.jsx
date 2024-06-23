import { createContext } from "react";

const DataTokenContext = createContext({
  token: {
    name: "",
    type: "",
    expiry: "",
    state: "",
    accessToken: "",
  },

  setToken: () => {},
});

const PaymentTokenContext = createContext({
  token: {
    name: "",
    type: "",
    expiry: "",
    state: "",
    accessToken: "",
  },

  setToken: () => {},
});

export { DataTokenContext, PaymentTokenContext };
