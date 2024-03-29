import { createContext } from "react";

// const TokenContext = createContext({
//   tokenData: {
//     name: "",
//     type: "",
//     expiry: "",
//     state: "",
//     accessToken: "",
//   },

//   setToken: () => {},
// });

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
