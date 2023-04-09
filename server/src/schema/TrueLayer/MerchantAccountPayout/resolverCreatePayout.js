const createPayoutExternalAccount = async (
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
};

export default { createPayoutExternalAccount };
