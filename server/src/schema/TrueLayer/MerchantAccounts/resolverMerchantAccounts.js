import logger from "../../../config/logger.js";

const merchantAccounts = async (_, __, { token, dataSources }) => {
  try {
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccounts(token);

    logger.info("Merchant accounts data retrieved");

    // Check if responseData is defined and has an 'items' property that is an array
    if (!responseData || !Array.isArray(responseData.items)) {
      logger.error("No data found or data format not as expected!");
      throw new Error("No data found or data format not as expected!");
    }

    // Correct the use of reducer to flatten the array
    const merchantAccounts = responseData.items.reduce(
      (acc, current) => [...acc, current],
      []
    );

    return merchantAccounts;
  } catch (error) {
    logger.error(`Error getting merchant accounts: ${error.message}`);
    throw new Error("Failed to retrieve merchant accounts");
  }
};

export { merchantAccounts };
