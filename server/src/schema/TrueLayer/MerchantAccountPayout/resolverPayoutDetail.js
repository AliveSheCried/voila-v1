const payoutDetail = async (_, { id }, { token, dataSources }) => {
  const responseData = await dataSources.tlPayoutAPI.getPayoutDetail(id, token);

  return responseData;
};

export default { payoutDetail };
