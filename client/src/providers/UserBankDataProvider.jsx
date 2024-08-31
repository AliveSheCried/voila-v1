// UserBankDataContext.js
import PropTypes from "prop-types";
import React, { createContext, useState } from "react";

export const UserBankDataContext = createContext();

export const UserBankDataProvider = ({ children }) => {
  const [userBankData, setUserBankData] = useState({
    bankAccounts: {},
    transactions: {},
    directDebits: {},
    standingOrders: {},
    bankAccountBalance: {},
  });

  return (
    <UserBankDataContext.Provider value={{ userBankData, setUserBankData }}>
      {children}
    </UserBankDataContext.Provider>
  );
};

UserBankDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
