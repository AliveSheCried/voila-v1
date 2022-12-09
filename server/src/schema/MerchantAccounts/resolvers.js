const queries = {
  //Queries
  //Get all merchant accounts
  merchantAccounts: async (_, __, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getMerchantAccounts(
      token
    );

    //Orignal code

    // const merchantAccounts = responseData.items.map((merchantAcc) => {
    //   return {
    //     id: merchantAcc.id,
    //     currency: merchantAcc.currency,
    //     account_identifiers: merchantAcc.account_identifiers,
    //     available_balance: merchantAcc.available_balance_in_minor,
    //     current_balance: merchantAcc.current_balance_in_minor,
    //   };
    // });

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

    return {
      id: responseData.id,
      currency: responseData.currency,
      available_balance_in_minor: responseData.available_balance_in_minor,
      current_balance_in_minor: responseData.current_balance_in_minor,
      account_holder_name: responseData.account_holder_name,
      account_identifiers: responseData.account_identifiers,
    };
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

    const transactions = responseData.items.map((tx) => {
      return {
        //generic transaction fields
        type: tx.type,
        id: tx.id,
        currency: tx.currency,
        amount_in_minor: tx.amount_in_minor,
        status: tx.status,
        //payout fields
        beneficiary: tx.beneficiary,
        context_code: tx.context_code,
        created_at: tx.created_at,
        executed_at: tx.executed_at,
        payout_id: tx.payout_id,
        //merchant account payment type fields
        payment_id: tx.payment_id,
        payment_source: tx.payment_source,
        //External payment
        remitter: tx.remitter,
        //merchant and external payment
        settled_at: tx.settled_at,
      };
    });

    return transactions;
  },
};

export const resolvers = { queries };
