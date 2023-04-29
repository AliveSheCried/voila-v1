///////Prisma
import { PrismaClient } from "@prisma/client";
import { mapMerchantAccountData } from "../../../helpers/tl/resolverHelpers/merchantAccounts/merchantAccounts.js";
const prisma = new PrismaClient();

//get individual merchant account detail using ID
const merchantAccount = async (_, { id }, { token, dataSources }) => {
  //try catch block to handle errors
  try {
    //get updated merchant account data from TrueLayer
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccount(id, token);

    console.log(responseData);

    // Map the merchant account data to the database schema using the helper function
    const { accountData } = mapMerchantAccountData(responseData);

    // Upsert the account record
    const updatedMerchantAccount = await prisma.accounts.update({
      where: { account_id: id },
      data: {
        available_balance_in_minor: accountData.available_balance_in_minor,
        current_balance_in_minor: accountData.current_balance_in_minor,
      },
      //create: accountData,
      include: { account_identifiers: true },
    });

    return updatedMerchantAccount;
  } catch (error) {
    console.log(error);
  }
};

export default { merchantAccount };
