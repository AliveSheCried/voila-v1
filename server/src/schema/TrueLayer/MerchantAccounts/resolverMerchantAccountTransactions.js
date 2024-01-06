const merchantAccountTransactions = async (
  _,
  { id, fromDate, toDate },
  { token, dataSources }
) => {
  console.log("merchantAccountTransactions resolver called");
  console.log("Arguments:", { id, fromDate, toDate });

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

    // Convert the fromDate and toDate values to Date objects
    const fromDateObj = new Date(decodedFromDate);
    const toDateObj = new Date(decodedToDate);

    // Format the Date objects in ISO-8601 format
    const isoFromDate = fromDateObj.toISOString();
    const isoToDate = toDateObj.toISOString();
    console.log(isoFromDate, isoToDate);

    //Always fetch the transactions from TrueLayer API
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccountTransactions(
        id,
        token,
        isoFromDate,
        isoToDate
      );

    if (!responseData.items || responseData.items.length === 0) {
      throw new Error(
        `No transactions for the date range ${decodedFromDate} to ${decodedToDate} found`
      );
    }

    // Convert received data to schema array of transaction objects
    const apiTransactions = responseData.items.map(
      (transaction) => transaction
    );

    //check if transactions in date range exist in database; note that different transaction types have different date fields
    const dbTransactions = await myCollection
      .find({
        $or: [
          {
            created_at: {
              $gte: decodedFromDate,
              $lte: decodedToDate,
            },
          },
          {
            settled_at: {
              $gte: decodedFromDate,
              $lte: decodedToDate,
            },
          },
        ],
      })
      .toArray();

    // Filter out transactions that are already in the database
    const newTransactions = apiTransactions.filter(
      (apiTransaction) =>
        !dbTransactions.some(
          (dbTransaction) => dbTransaction.id === apiTransaction.id
        )
    );

    //check if new transactions exist
    if (newTransactions.length === 0) {
      return dbTransactions;
    }

    // If newTransactions do exist, update the database with new transactions from the API
    if (newTransactions.length > 0) {
      try {
        const result = await myCollection.insertMany(newTransactions);

        //log the number of records inserted into the database and number of records in newTransactions for debugging
        if (result.insertedCount !== newTransactions.length) {
          console.log(
            "Not all new transactions were inserted into the database"
          );
          console.log(
            `Inserted ${result.insertedCount} records into the database`
          );
          console.log(`There were ${newTransactions.length} new transactions`);
        } else {
          console.log(
            `Inserted ${result.insertedCount} records into the collection`
          );
        }
      } catch (error) {
        console.log(error);
        throw new Error(
          "An error occurred while inserting new transactions into the database."
        );
      }
    }

    const allTransactions = [...dbTransactions, ...newTransactions];

    console.log("Response data:", responseData);
    return allTransactions;
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
  }
};

export { merchantAccountTransactions };
