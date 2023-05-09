///////Lodash  - import disappears when using lodash; commented out for now
//import _ from "lodash";
import { processTransactionData } from "../../../helpers/tl/resolverHelpers/merchantAccounts/merchantAccountTransactions.js";
///////Prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const merchantAccountTransactions = async (
  _,
  { id, fromDate, toDate },
  { token, dataSources }
) => {
  // Decode the fromDate and toDate values
  const decodedFromDate = decodeURIComponent(fromDate);
  const decodedToDate = decodeURIComponent(toDate);

  //check database for transactions within date range supplied
  const transactionsDb = await prisma.transactions.findMany({
    where: { created_at: { gte: decodedFromDate, lte: decodedToDate } },
  });

  // If transactions for the requested range are found in the database, return them
  if (transactionsDb && transactionsDb.length > 0) {
    return transactionsDb;
  }

  //if no matching transactions returned from db, fetch from TrueLayer
  try {
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccountTransactions(
        id,
        token,
        fromDate,
        toDate
      );

    //Convert received data to schema array of transaction objects
    const transactions = responseData.items;

    // Iterate through the transactions array calling the mapMerchantAccountTransactionData helper function for each transaction
    for (const transaction of transactions) {
      // mapMerchantAccountTransactionData returns an object containing the transactionData, one of the following: beneficiaryData, remitterData, paymentSourcesData; and accountIdentifierData
      const { transactionData } = processTransactionData(transaction, id);

      console.log("Returned from helper", transactionData);

      //create transaction in database
      const newTransaction = await prisma.transactions.create({
        data: transactionData,
      });
    }

    return transactions;
  } catch (error) {
    console.log(error);
  }
};

export default { merchantAccountTransactions };
