// For the purpose of this demo, we will store the user data token in a local variable to be used in the webhook handler
let tempUserDataToken = null;

//Retrieve account transctions
const bankAccountTransactions = async (
  _,
  { id, fromDate, toDate },
  { token, dataSources }
) => {
  // Store the active token in temporary storage
  tempUserDataToken = token;

  //try catch block to handle errors
  try {
    // Always fetch the transactions from TrueLayer API
    await dataSources.tlDataAPI.getBankAccountTransactions(
      id,
      token,
      fromDate,
      toDate,
      "transactions"
    );

    // Since the process is asynchronous, return a message indicating that the data will be processed later
    return {
      __typename: "InitialStatus",
      status: "Processing",
      message:
        "The request to return transactions has been initiated. You will receive the results once they are processed.",
    };
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
  }
};

//Retrieve account pending transactions
const bankAccountPendingTransactions = async (
  _,
  { id },
  { token, dataSources }
) => {
  //try catch block to handle errors
  try {
    const responseData =
      await dataSources.tlDataAPI.getBankAccountPendingTransactions(id, token);

    //check if pending transactions exist
    if (responseData.results.length === 0) {
      return [];
    }

    //Convert received data to schema array of pending transaction objects
    const pendingTransactions = responseData.results.map(
      (transaction) => transaction
    );

    return pendingTransactions;
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
  }
};

export const bankAccountTransactionsResolvers = {
  bankAccountTransactions,
  bankAccountPendingTransactions,
};
