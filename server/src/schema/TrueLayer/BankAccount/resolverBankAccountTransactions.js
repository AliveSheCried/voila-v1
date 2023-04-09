//Retrieve account transctions
const bankAccountTransactions = async (
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
};

//Retrieve account pending transactions
const bankAccountPendingTransactions = async (
  _,
  { id },
  { token, dataSources }
) => {
  const responseData =
    await dataSources.trueLayerAPI.getBankAccountPendingTransactions(id, token);

  const pendingTransactions = responseData.results.map(
    (transaction) => transaction
  );

  return pendingTransactions;
};

export const bankAccountTransactionsResolvers = {
  bankAccountTransactions,
  bankAccountPendingTransactions,
};
