import { PrismaClient } from "@prisma/client";
import { mapMerchantAccountData } from "../../../helpers/tl/resolverHelpers/merchantAccounts/merchantAccounts.js";
const prisma = new PrismaClient();

// Get all merchant accounts
const merchantAccounts = async (_, __, { token, dataSources }) => {
  try {
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccounts(token);
    const merchantAccountsClient = responseData.items;

    // Create an array to store the merged merchant accounts
    let mergedMerchantAccounts = [];

    // Iterate through the merchantAccountsClient array
    for (const merchantAccountClient of merchantAccountsClient) {
      // Map the client data to the data shape required for the database
      const { accountData, accountIdentifierData } = mapMerchantAccountData(
        merchantAccountClient
      );

      // Upsert the account record
      const upsertedMerchantAccount = await prisma.accounts.upsert({
        where: { account_id: merchantAccountClient.id },
        update: {
          available_balance_in_minor: accountData.available_balance_in_minor,
          current_balance_in_minor: accountData.current_balance_in_minor,
          display_name: accountData.display_name,
        },
        create: accountData,
        include: { account_identifiers: true },
      });

      // Update the accountIdentifierData with the correct parent_account_id
      accountIdentifierData.parent_account_id = upsertedMerchantAccount.id;

      // Upsert the account_identifiers record
      const upsertedAccountIdentifier = await prisma.account_identifiers.upsert(
        {
          where: {
            account_identifiers_unique_constraint: {
              parent_account_id: upsertedMerchantAccount.id,
              type: accountIdentifierData.type,
            },
          },
          update: accountIdentifierData,
          create: {
            id: accountIdentifierData.id,
            type: accountIdentifierData.type,
            account_number: accountIdentifierData.account_number,
            iban: accountIdentifierData.iban,
            swift: accountIdentifierData.swift,
            branch_number: accountIdentifierData.branch_number,
            accounts: {
              connect: { id: upsertedMerchantAccount.id },
            },
          },
        }
      );

      // Update the upsertedMerchantAccount with the upsertedAccountIdentifier
      upsertedMerchantAccount.account_identifiers = upsertedAccountIdentifier;

      // Add the upsertedMerchantAccount to the mergedMerchantAccounts array
      mergedMerchantAccounts.push(upsertedMerchantAccount);
    }

    return mergedMerchantAccounts.map((account) => ({
      ...account,
      account_holder_name: account.display_name,
      account_identifiers: account.account_identifiers
        ? [
            {
              ...account.account_identifiers,
              sort_code: account.account_identifiers.branch_number,
            },
          ]
        : [],
    }));
  } catch (error) {
    console.log(error);
  }
};

export default { merchantAccounts };

// import { PrismaClient } from "@prisma/client";
// import { mapMerchantAccountData } from "../../../helpers/tl/resolverHelpers/merchantAccounts/merchantAccounts.js";
// const prisma = new PrismaClient();

// //Get all merchant accounts
// const merchantAccounts = async (_, __, { token, dataSources }) => {
//   //try catch block to handle errors
//   try {
//     const responseData =
//       await dataSources.tlMerchantAccountAPI.getMerchantAccounts(token);

//     const merchantAccountsClient = responseData.items;

//     // Create an array to store the merged merchant accounts
//     let mergedMerchantAccounts = [];

//     // Iterate through the merchantAccountsClient array
//     for (const merchantAccountClient of merchantAccountsClient) {
//       // Check if the merchant account exists in the database
//       const merchantAccountDb = await prisma.accounts.findFirst({
//         where: { id: merchantAccountClient.id },
//         include: { account_identifiers: true },
//       });

//       // If the merchant account is not found in the database, insert it
//       if (!merchantAccountDb) {
//         const { accountData, accountIdentifierData } = mapMerchantAccountData(
//           merchantAccountClient
//         );

//         const newAccount = await prisma.accounts.create({
//           data: accountData,
//           include: { account_identifiers: true },
//         });

//         const newAccountIdentifier = await prisma.account_identifiers.create({
//           data: accountIdentifierData,
//         });

//         const newMerchantAccount = {
//           ...newAccount,
//           account_identifiers: newAccountIdentifier,
//         };
//         mergedMerchantAccounts.push(newMerchantAccount);
//       } else {
//         mergedMerchantAccounts.push(merchantAccountDb);
//       }
//     }

//     return mergedMerchantAccounts;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default { merchantAccounts };
