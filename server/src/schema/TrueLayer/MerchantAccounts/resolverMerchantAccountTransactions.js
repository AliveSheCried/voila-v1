const merchantAccountTransactions = async (
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
    const myCollection = myDb.collection("MerchantAccountTransactions");

    // Decode the fromDate and toDate values
    const decodedFromDate = decodeURIComponent(fromDate);
    const decodedToDate = decodeURIComponent(toDate);

    //Always fetch the transactions from TrueLayer API
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccountTransactions(
        id,
        token,
        fromDate,
        toDate
      );

    if (!responseData.items) {
      throw new Error(
        `No transactions for the date range ${decodedFromDate} to ${decodedToDate} found`
      );
    }

    // Convert received data to schema array of transaction objects
    const apiTransactions = responseData.items.map(
      (transaction) => transaction
    );

    //check if transactions in date range exist in database
    const dbTransactions = await myCollection
      .find({
        created_at: {
          $gte: decodedFromDate,
          $lte: decodedToDate,
        },
      })
      .toArray();

    // Filter out transactions that are already in the database
    const newTransactions = apiTransactions.filter(
      (apiTransaction) =>
        !dbTransactions.some(
          (dbTransaction) => dbTransaction.id === apiTransaction.id
        )
    );

    // If newTransactions do exist, update the database with new transactions from the API
    const result = await myCollection.insertMany(newTransactions);
    console.log(`Inserted ${result.insertedCount} records into the collection`);

    const allTransactions = [...dbTransactions, ...newTransactions];

    return allTransactions;
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
  }
};

export { merchantAccountTransactions };
