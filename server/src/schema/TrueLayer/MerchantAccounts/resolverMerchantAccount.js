//get individual merchant account detail using ID
const merchantAccount = async (_, { id }, { token, dataSources }) => {
  //try catch block to handle errors
  try {
    //get updated merchant account data from TrueLayer
    const responseData =
      await dataSources.tlMerchantAccountAPI.getMerchantAccount(id, token);

    //Check if data exists
    if (!responseData) {
      throw new Error("No data found for the ID provided!");
    }
    //Response data is same shape as schema
    return responseData;
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
  }
};

export { merchantAccount };
