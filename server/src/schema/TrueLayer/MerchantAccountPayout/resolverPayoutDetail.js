const payoutDetail = async (_, { id }, { token, dataSources }) => {
  const responseData = await dataSources.tlPayoutAPI.getPayoutDetail(id, token);

  console.log("payoutDetail resolver called with id: ", id);

  if (!responseData.items) {
    throw new Error("No data found for the ID provided!");
  }

  return responseData;
};

export { payoutDetail };
