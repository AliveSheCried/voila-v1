///////Prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//get individual merchant account detail using ID
const merchantAccount = async (_, { id }, { token, dataSources }) => {
  //check database for merchant account
  const merchantAccountDb = await prisma.accounts.findUnique({
    where: { id: id },
  });

  //if merchant account exists in database, return it
  if (merchantAccountDb) {
    return merchantAccountDb;
  }

  //get merchant account from TrueLayer
  const responseData = await dataSources.trueLayerAPI.getMerchantAccount(
    id,
    token
  );

  //Convert received date to schema object
  const merchantAccount = {
    id: responseData.id,
    //temp value - no idea how to get an ID from a separate table while creating the data object.
    asset_id: "fa658832-ee6c-478b-a7d1-0967f399b50a",
    account_type: "TL_MA",
    currency: responseData.currency,
    display_name: responseData.account_holder_name,
    account_number:
      responseData.account_identifiers.find(
        (item) => item.type === "sort_code_account_number"
      )?.account_number || null,
    iban:
      responseData.account_identifiers.find((item) => item.type === "iban")
        ?.iban || null,
    //temp value; merchant account data structure doesn't include
    swift: null,
    //temp value; at present only caters for UK account types
    branch_number:
      responseData.account_identifiers.find(
        (item) => item.type === "sort_code_account_number"
      )?.sort_code || null,
    //temp value; as above.
    bank_id: "f9980c7a-bc02-4f7e-9b7e-7e9a0ef569b3",
  };
  // console.log(merchantAccount);

  //create merchant account in database
  try {
    await prisma.accounts.create({
      data: merchantAccount,
    });
  } catch (error) {
    // handle the error here, for example:
    throw new Error("Could not create merchant account", error);
  }

  //In this instance, responseData is the shape required by the schema.
  return responseData;
};

export default { merchantAccount };
