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

    //return the merchant account data using the id
    const account = await prisma.accounts.findUnique({
      where: { account_id: id },
    });

    //if a value is returned, extract the account_identifiers data
    if (account) {
      const existingAccountIdentifiers =
        await prisma.account_identifiers.findMany({
          where: { parent_account_id: account.id },
        });

      // Map the merchant account data to the database schema using the helper function
      const { accountData, accountIdentifierData } = mapMerchantAccountData(
        responseData,
        false,
        existingAccountIdentifiers
      );

      // Fetch the account_identifiers data separately
      const accountIdentifier = await prisma.account_identifiers.findUnique({
        where: {
          account_identifiers_unique_constraint: {
            parent_account_id: accountIdentifierData.parent_account_id,
            type: accountIdentifierData.type,
          },
        },
      });

      console.log("accountIdentifier", accountIdentifier);

      // Update the account_identifiers data
      await prisma.account_identifiers.update({
        where: { id: accountIdentifier.id },
        data: {
          account_number: accountIdentifierData.account_number,
          iban: accountIdentifierData.iban,
          branch_number: accountIdentifierData.branch_number,
        },
      });
      // Update the accounts data
      const updatedMerchantAccount = await prisma.accounts.update({
        where: { account_id: id },
        data: {
          available_balance_in_minor: accountData.available_balance_in_minor,
          current_balance_in_minor: accountData.current_balance_in_minor,
        },
        include: { account_identifiers: true },
      });

      console.log("updatedMerchantAccount", updatedMerchantAccount);
      // Map the database fields to the GraphQL fields
      const mappedAccount = {
        ...updatedMerchantAccount,
        account_holder_name: updatedMerchantAccount.display_name,
        account_identifiers: updatedMerchantAccount.account_identifiers.map(
          (identifier) => ({
            ...identifier,
            sort_code: identifier.branch_number,
          })
        ),
      };

      console.log("mappedAccount", mappedAccount);
      return mappedAccount;
    } else {
      throw new Error(
        `Merchant account (id: ${id}) not found; please check the account ID`
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export default { merchantAccount };
