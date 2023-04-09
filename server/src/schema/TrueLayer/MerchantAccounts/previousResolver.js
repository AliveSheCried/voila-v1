const queries = {
  //Queries
  //Get all merchant accounts
  merchantAccounts: async (_, __, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getMerchantAccounts(
      token
    );

    //Convert received data to schema object using reducer; originally extracted directly e.g. {id: merchantAc.id}
    const merchantAccounts = responseData.items.reduce((acc, current) => [
      acc,
      current,
    ]);

    return merchantAccounts;
  },

  //get individual merchant account detail
  merchantAccount: async (_, { id }, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getMerchantAccount(
      id,
      token
    );

    //In this instance, responseData is the shape required by the schema.
    return responseData;
  },

  //get transactions from merchant account by id
  merchantAccountTransactions: async (
    _,
    { id, fromDate, toDate },
    { token, dataSources }
  ) => {
    const responseData =
      await dataSources.trueLayerAPI.getMerchantAccountTransactions(
        id,
        token,
        fromDate,
        toDate
      );

    //Convert received data to schema array of transaction objects
    const transactions = responseData.items.map((transaction) => transaction);

    return transactions;
  },
};

export const resolvers = { queries };
