const payoutDetail = async (_, { id }, { token, dataSources }) => {
  const responseData = await dataSources.trueLayerAPI.getPayoutDetail(
    id,
    token
  );

  return responseData;
};

export default payoutDetail;
