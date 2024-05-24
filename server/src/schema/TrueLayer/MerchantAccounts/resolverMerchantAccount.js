import logger from "../../../config/logger.js";

//get individual merchant account detail using ID
const merchantAccount = async (_, { id }, { token, dataSources }) => {
  //try catch block to handle errors
  try {
    //get updated merchant account data from TrueLayer
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccount(id, token);
    logger.info(`Merchant account data retrieved for ID ${id}`);
    //Check if data exists
    if (!responseData) {
      throw new Error("No data found for the ID provided!");
    }
    //Response data is same shape as schema
    return responseData;
  } catch (error) {
    logger.error(
      `Error getting merchant account with ID ${id}: ${error.message}`
    );
    // Throw the error so that it can be caught and handled by Apollo Server
    throw new error("Failed to retrieve merchant account with ID ${id}");
  }
};

export { merchantAccount };
