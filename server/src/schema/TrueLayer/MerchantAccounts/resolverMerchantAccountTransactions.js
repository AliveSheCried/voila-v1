///////Prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { processTransactionData } from "../../../helpers/tl/resolverHelpers/merchantAccounts/merchantAccountTransactions.js";

const merchantAccountTransactions = async (
  _,
  { id, fromDate, toDate },
  { token, dataSources }
) => {
  console.log("params", id, fromDate, toDate);

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
    console.log("transactions", transactions);

    // Iterate through the transactions array calling the mapMerchantAccountTransactionData helper function for each transaction
    for (const transaction of transactions) {
      // mapMerchantAccountTransactionData returns an object containing the transactionData, one of the following: beneficiaryData, remitterData, paymentSourcesData; and accountIdentifierData
      const transactionData = await processTransactionData(
        transaction,
        id,
        prisma
      );

      //create transaction in database
      await prisma.transactions.create({
        data: transactionData,
      });
    }

    //return newly created transactions from database
    const transactionsDb = await prisma.transactions.findMany({
      where: { created_at: { gte: decodedFromDate, lte: decodedToDate } },
      include: {
        beneficiary: {
          include: {
            account_identifiers: true,
          },
        },
        remitter: {
          include: {
            account_identifiers: true,
          },
        },
        payment_source: {
          include: {
            account_identifiers: true,
          },
        },
      },
    });

    console.log("object", transactionsDb);

    return [
      {
        __typename: "Payout",
        type: "payout",
        id: "dec32c60-a0eb-4355-9741-fa3cba291cac",
        currency: "GBP",
        status: "executed",
        amount_in_minor: 50000,
        beneficiary: {
          account_holder_name: "VoilaTestMerchant",
          reference: "TestPayout 02",
          type: "external_account",
          account_identifiers: [
            {
              type: "sort_code_account_number",
              sort_code: "040668",
              account_number: "00000871",
              iban: "GB75CLRB04066800000871",
            },
          ],
        },
        context_code: "withdrawal",
        created_at: "2022-12-27T11:11:38.636461Z",
        executed_at: "2022-12-27T11:11:40.103Z",
        payout_id: "dec32c60-a0eb-4355-9741-fa3cba291cac",
      },
      {
        __typename: "MerchantAccountPayment",
        type: "merchant_account_payment",
        id: "f943fdb1-a25b-4842-8f19-8cc060f8edc4",
        currency: "GBP",
        status: "settled",
        amount_in_minor: 1,
        payment_id: "ce02bcbb-0b9d-49ad-a5bf-5da20a75c9ea",
        payment_source: {
          account_holder_name: "JOHN SANDBRIDGE",
          account_identifiers: [
            {
              type: "sort_code_account_number",
              sort_code: "040668",
              account_number: "00000871",
              iban: "GB75CLRB04066800000871",
            },
          ],
        },
        settled_at: "2022-10-29T18:02:01.640Z",
      },
    ];
  } catch (error) {
    console.log(error);
  }
};

export default { merchantAccountTransactions };
