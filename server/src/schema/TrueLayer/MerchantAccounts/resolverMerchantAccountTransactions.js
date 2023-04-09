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
    where: { transaction_date: { gte: decodedFromDate, lte: decodedToDate } },
  });

  // If transactions for the requested range are found in the database, return them
  if (transactionsDb && transactionsDb.length > 0) {
    return transactionsDb;
  }

  //get transactions from TrueLayer
  const responseData =
    await dataSources.trueLayerAPI.getMerchantAccountTransactions(
      id,
      token,
      fromDate,
      toDate
    );

  //Convert received data to schema array of transaction objects
  const transactions = responseData.items.map((transaction) => transaction);

  console.log(transactions);

  return transactions;
};

export default { merchantAccountTransactions };
