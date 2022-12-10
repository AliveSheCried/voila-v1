const queries = {
  /* 
*********************************************
Bank account meta data queries
*********************************************
*/
  //Get all bank accounts
  bankAccounts: async (_, __, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getBankAccounts(token);

    const bankAccounts = responseData.results.map((account) => account);

    return bankAccounts;
  },

  //Get specific bank account with id
  bankAccount: async (_, { id }, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getBankAccount(
      id,
      token
    );

    return responseData.results[0];
  },

  /* 
*********************************************
Bank account data related queries
*********************************************
*/
  // Retrieve account balance
  bankAccountBalance: async (_, { id }, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getBankAccountBalance(
      id,
      token
    );

    return responseData.results[0];
  },

  //Retrieve account transctions
  bankAccountTransactions: async (
    _,
    { id, fromDate, toDate },
    { token, dataSources }
  ) => {
    const responseData =
      await dataSources.trueLayerAPI.getBankAccountTransactions(
        id,
        token,
        fromDate,
        toDate
      );

    //Convert received data to schema array of transaction objects
    const transactions = responseData.results.map((transaction) => transaction);

    return transactions;
  },

  //Retrieve account pending transactions
  bankAccountPendingTransactions: async (_, { id }, { token, dataSources }) => {
    const responseData =
      await dataSources.trueLayerAPI.getBankAccountPendingTransactions(
        id,
        token
      );

    const pendingTransactions = responseData.results.map(
      (transaction) => transaction
    );

    return pendingTransactions;
  },

  bankAccountDirectDebits: async (_, { id }, { token, dataSources }) => {
    const responseData =
      await dataSources.trueLayerAPI.getBankAccountDirectDebits(id, token);

    const directDebits = responseData.results.map((directDebit) => directDebit);

    return directDebits;
  },

  bankAccountStandingOrders: async (_, { id }, { token, dataSources }) => {
    const responseData =
      await dataSources.trueLayerAPI.getBankAccountStandingOrders(id, token);

    const standingOrders = responseData.results.map(
      (standingOrders) => standingOrders
    );

    return standingOrders;
  },
};

export const resolvers = { queries };
