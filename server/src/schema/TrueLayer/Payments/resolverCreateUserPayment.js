const createUserPayment = async (
  _,
  {
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
  { token, dataSources, logger }
) => {
  try {
    const responseData = await dataSources.tlUserPaymentAPI.createUserPayment(
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
      token
    );

    const { id, resource_token, status, user } = responseData;

    // Build the HPP URL
    const return_uri = encodeURIComponent("http://localhost:3000/redirect");
    const hpp_url = `https://payment.truelayer-sandbox.com/payments?payment_id=${id}&resource_token=${resource_token}&return_uri=${return_uri}`;

    console.log("HPP URL:", hpp_url);

    return {
      id,
      resource_token,
      status,
      user,
      hpp_url,
    };
  } catch (error) {
    logger.error("Error in create User Payment:", error);

    throw new Error(error.message || "Failed to create payment");
  }
};

const getPayment = async (_, { paymentId }, { dataSources }) => {
  try {
    const responseData = await dataSources.tlPaymentAPI.getPayment(paymentId);

    return responseData;
  } catch (error) {
    logger.error("Error in get User Payment:", error);

    throw new Error(error.message || "Failed to get payment details");
  }
};

export { createUserPayment, getPayment };
