const payoutDetail = async (_, { id }, { token, dataSources, logger }) => {
  let responseData;
  // Fetch the payout detail from TrueLayer API
  try {
    responseData = await dataSources.tlPayoutAPI.getPayoutDetail(id, token);
    logger.info(`Payout detail data retrieved for ID ${id}`);
  } catch (error) {
    logger.error(`Error getting payout detail with ID ${id}: ${error.message}`);
    throw new Error(`Failed to retrieve payout detail with ID ${id}`);
  }

  if (!responseData) {
    logger.error("No data found for the ID provided!");
    throw new Error("No data found for the ID provided!");
  }

  return responseData;
};

export { payoutDetail };
