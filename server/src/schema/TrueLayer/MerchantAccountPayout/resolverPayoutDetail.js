import logger from "../../../config/logger";

const payoutDetail = async (_, { id }, { token, dataSources }) => {
  const responseData = await dataSources.tlPayoutAPI.getPayoutDetail(id, token);

  console.log("payoutDetail resolver called with id: ", id);
  console.log("payoutDetail resolver response: ", responseData);

  if (!responseData) {
    logger.error("No data found for the ID provided!");
    throw new Error("No data found for the ID provided!");
  }

  return responseData;
};

export { payoutDetail };
