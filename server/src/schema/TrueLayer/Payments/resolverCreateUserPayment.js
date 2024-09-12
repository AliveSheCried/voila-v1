const createUserPayment = async (
  _,
  {
    input: { amount_in_minor, currency, provider_id, scheme_id, redirect_uri },
  },
  { token, dataSources }
) => {
  try {
    const responseData = await dataSources.tlPaymentAPI.createPayment(
      amount_in_minor,
      currency,
      provider_id,
      scheme_id,
      redirect_uri,
      token
    );

    return responseData;
  } catch (error) {
    logger.error("Error in create User Payment:", error);

    throw new Error(error.message || "Failed to create payment");
  }
};

const getUserPaymentDetails = async (_, { paymentId }, { dataSources }) => {
  try {
    const responseData = await dataSources.tlPaymentAPI.getPayment(paymentId);

    return responseData;
  } catch (error) {
    logger.error("Error in get User Payment:", error);

    throw new Error(error.message || "Failed to get payment details");
  }
};
