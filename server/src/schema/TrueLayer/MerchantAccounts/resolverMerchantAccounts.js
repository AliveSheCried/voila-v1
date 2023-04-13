///////Prisma
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

//Get all merchant accounts
const merchantAccounts = async (_, __, { token, dataSources }) => {
  //check database for merchant accounts
  //this needs more thought - Truelayer assumes 1 customer is accessing i.e. there is no customer ID in the URL. Park for now.

  //get merchant accounts from TrueLayer
  // let merchantAccountsClient;
  //try {
  //$transaction method provided by Prisma to execute a sequence of database operations as a single transaction

  // await prisma.$transaction(async () => {
  const responseData =
    await dataSources.tlMerchantAccountAPI.getMerchantAccounts(token);

  //Convert received data to schema object using reducer; originally extracted directly e.g. {id: merchantAc.id}
  const merchantAccountsClient = responseData.items.reduce((acc, current) => [
    acc,
    current,
  ]);

  /*
  Temporary comment out of database elements while I test the data source.
      //convert array of flattened objects to database format
      const merchantAccountsDb = merchantAccountsClient.map((element) => {
        return {
          id: element.id,
          //temp value - no idea how to get an ID from a separate table while creating the data object.
          asset_id: "fa658832-ee6c-478b-a7d1-0967f399b50a",
          account_type: "TL_MA",
          currency: element.currency,
          display_name: element.account_holder_name,
          //each of the following keys are nested within the elements account_identifiers object so create a function for each key to return the correct value.
          account_number:
            element.account_identifiers.find(
              (item) => item.type === "sort_code_account_number"
            )?.account_number || null,
          iban:
            element.account_identifiers.find((item) => item.type === "iban")
              ?.iban || null,
          //temp value; merchant account data structure doesn't include
          swift: null,
          //temp value; at present only caters for UK account types
          branch_number:
            element.account_identifiers.find(
              (item) => item.type === "sort_code_account_number"
            )?.sort_code || null,
          //temp value; as above.
          bank_id: "f9980c7a-bc02-4f7e-9b7e-7e9a0ef569b3",
        };
      });

      try {
        for (const item of merchantAccountsDb) {
          await prisma.accounts.create({
            data: item,
          });
        }
      } catch (error) {
        // handle the error here, for example:
        throw new Error("Could not create merchant account", error);
      }
      */
  //   });
  // } catch (error) {
  //   console.log(error);
  // }

  //return data to client
  return merchantAccountsClient;
};

export default { merchantAccounts };
