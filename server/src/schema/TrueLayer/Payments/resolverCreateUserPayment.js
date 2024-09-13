const createUserPayment = async (
  _,
  {
    input: {
      amount_in_minor,
      currency,
      merchant_account_id,
      user_id,
      user_name,
      user_email,
      user_phone,
      user_date_of_birth,
      user_address_line1,
      user_city,
      user_state,
      user_zip,
      user_country_code,
    },
  },
  { token, dataSources }
) => {
  try {
    const responseData = await dataSources.tlPaymentAPI.createPayment(
      amount_in_minor,
      currency,
      merchant_account_id,
      user_id,
      user_name,
      user_email,
      user_phone,
      user_date_of_birth,
      user_address_line1,
      user_city,
      user_state,
      user_zip,
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
