import { PrismaClient } from "@prisma/client";
import { mapMerchantAccountData } from "../../../helpers/tl/resolverHelpers/merchantAccounts/merchantAccounts.js";
const prisma = new PrismaClient();

//Get all merchant accounts
const merchantAccounts = async (_, __, { token, dataSources }) => {
  //try catch block to handle errors
  try {
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccounts(token);

    const merchantAccountsClient = responseData.items;

    // Create an array to store the merged merchant accounts
    let mergedMerchantAccounts = [];

    // Iterate through the merchantAccountsClient array
    for (const merchantAccountClient of merchantAccountsClient) {
      // Check if the merchant account exists in the database
      const merchantAccountDb = await prisma.accounts.findFirst({
        where: { id: merchantAccountClient.id },
        include: { account_identifiers: true },
      });

      // If the merchant account is not found in the database, insert it
      if (!merchantAccountDb) {
        const { accountData, accountIdentifierData } = mapMerchantAccountData(
          merchantAccountClient
        );

        const newAccount = await prisma.accounts.create({
          data: accountData,
          include: { account_identifiers: true },
        });

        const newAccountIdentifier = await prisma.account_identifiers.create({
          data: accountIdentifierData,
        });

        const newMerchantAccount = {
          ...newAccount,
          account_identifiers: newAccountIdentifier,
        };
        mergedMerchantAccounts.push(newMerchantAccount);
      } else {
        mergedMerchantAccounts.push(merchantAccountDb);
      }
    }

    return mergedMerchantAccounts;
  } catch (error) {
    console.log(error);
  }
};

export default { merchantAccounts };
