const mutations = {
  createPayoutExternalAccount: async (
    _,
    {
      reference,
      account_holder_name,
      merchant_account_id,
      amount_in_minor,
      currency,
      account_identifier,
    },
    { token, dataSources }
  ) => {
    const responseData =
      await dataSources.trueLayerAPI.createMerchantAccountPayout(
        reference,
        account_holder_name,
        merchant_account_id,
        amount_in_minor,
        currency,
        account_identifier,
        token
      );

    return responseData;
  },
};

const queries = {
  payoutDetail: async (_, { id }, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getPayoutDetail(
      id,
      token
    );

    return responseData;
  },
};

export const resolvers = { mutations, queries };
