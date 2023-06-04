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

    //check if transactions in date range exist in database
    const transactionsDb = await myCollection
      .find({
        created_at: {
          $gte: decodedFromDate,
          $lte: decodedToDate,
        },
      })
      .toArray();

    //if transactions in date range do exist in database, return them
    if (transactionsDb.length > 0) {
      return transactionsDb;
    }

    //if transactions in date range do not exist in database, get them from TrueLayer
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccountTransactions(
        id,
        token,
        fromDate,
        toDate
      );

    //confirm response includes transactions
    if (!responseData.items) {
      throw new Error("No transactions for the date range found");
    }

    //Convert received data to schema array of transaction objects
    const transactions = responseData.items.map((transaction) => transaction);

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

export default { merchantAccountTransactions };
