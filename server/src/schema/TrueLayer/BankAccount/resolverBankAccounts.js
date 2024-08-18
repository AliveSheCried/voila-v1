/* 
*********************************************
Bank account meta data queries
*********************************************
*/

//Get all bank accounts
const bankAccounts = async (_, __, { token, dataSources, logger }) => {
  //try catch block to handle errors

  try {
    console.log("Initiating bank accounts request...");
    // Initiate the asynchronous request to TrueLayer
    await dataSources.tlDataAPI.getBankAccounts(token);

    // Since the process is asynchronous, return a message indicating that the data will be processed later
    return {
      status: "Processing",
      message:
        "The request has been initiated. You will receive the results once they are processed.",
    };
    /*
    *********************************************
    Resovler before refactoring to use Webhook
    *********************************************
    const responseData = await dataSources.tlDataAPI.getBankAccounts(token);

    //Check if data exists
    if (!responseData.results || !Array.isArray(responseData.results)) {
      throw new Error("No data found or data format not as expected!");
    }
    //Convert received data to schema array of bank account objects
    const bankAccounts = responseData.results.map((account) => account);

    return bankAccounts;
    */
  } catch (error) {
    logger.error("Error initiating bank accounts request:", error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw new Error(
      "Failed to initiate bank accounts request. Please try again later."
    );
  }
};

//Get specific bank account with id
const bankAccount = async (_, { id }, { token, dataSources }) => {
  //try catch block to handle errors
  try {
    const responseData = await dataSources.tlDataAPI.getBankAccount(id, token);

    //Check if data exists
    if (!responseData.results) {
      throw new Error("No data found for the ID provided!");
    }

    return responseData.results[0];
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
  }
};

export const bankAccountResolvers = {
  bankAccounts,
  bankAccount,
};
