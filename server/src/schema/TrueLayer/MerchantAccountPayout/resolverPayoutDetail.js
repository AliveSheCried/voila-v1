import logger from "../../../config/logger.js";

const payoutDetail = async (_, { id }, { token, dataSources }) => {
  let responseData;
  // Fetch the payout detail from TrueLayer API
  try {
    responseData = await dataSources.tlPayoutAPI.getPayoutDetail(id, token);
  } catch (error) {
    logger.error(`Error getting payout detail with ID ${id}: ${error.message}`);
    throw new Error(`Failed to retrieve payout detail with ID ${id}`);
  }

  // console.log("payoutDetail resolver called with id: ", id);
  // console.log("payoutDetail resolver response: ", responseData);

  if (!responseData) {
    logger.error("No data found for the ID provided!");
    throw new Error("No data found for the ID provided!");
  }

  return responseData;
};

export { payoutDetail };
