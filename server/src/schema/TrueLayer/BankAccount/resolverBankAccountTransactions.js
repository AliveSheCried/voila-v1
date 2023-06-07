//Retrieve account transctions
const bankAccountTransactions = async (
  _,
  { id, fromDate, toDate },
  { token, dataSources }
) => {
  //try catch block to handle errors
  try {
    //MongoDB code
    //confirm connection to mongodb
    const { dbClient } = global;
    if (!dbClient) {
      throw new Error("No database client");
    }
    //db variables
    const myDb = dbClient.db("VoilaDev");
    const myCollection = myDb.collection("ExternalAccountTransactions");

    // Decode the fromDate and toDate values
    const decodedFromDate = decodeURIComponent(fromDate);
    const decodedToDate = decodeURIComponent(toDate);

    //check if transactions in date range exist in database
    const exTransactionsDb = await myCollection
      .find({
        timestamp: {
          $gte: decodedFromDate,
          $lte: decodedToDate,
        },
      })
      .toArray();

    console.log("object", exTransactionsDb);

    //if transactions in date range do exist in database, return them
    if (exTransactionsDb.length > 0) {
      return exTransactionsDb;
    }

    //if transactions in date range do not exist in database, get them from TrueLayer
    const responseData = await dataSources.tlDataAPI.getBankAccountTransactions(
      id,
      token,
      fromDate,
      toDate
    );

    //confirm response includes transactions
    if (!responseData.results) {
      throw new Error(
        `No transactions for the date range ${decodedFromDate} to ${decodedToDate} found`
      );
    }

    //Convert received data to schema array of transaction objects
    const transactions = responseData.results.map((transaction) => transaction);

    //insert transactions into database, logging records inserted
    const result = await myCollection.insertMany(transactions);
    console.log(`Inserted ${result.insertedCount} records into the collection`);

    return transactions;
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
