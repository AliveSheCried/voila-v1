/* 
*********************************************
Bank account meta data related queries
*********************************************
*/

// Retrieve account balance
const bankAccountBalance = async (_, { id }, { token, dataSources }) => {
  //try catch block to handle errors
  try {
    const responseData = await dataSources.tlDataAPI.getBankAccountBalance(
      id,
      token
    );

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

// Retrieve account direct debits
const bankAccountDirectDebits = async (_, { id }, { token, dataSources }) => {
  //try catch block to handle errors
  try {
    const responseData = await dataSources.tlDataAPI.getBankAccountDirectDebits(
      id,
      token
    );

    //Check if data exists
    if (!responseData.results || !Array.isArray(responseData.results)) {
      throw new Error("No data found or data format not as expected!");
    }

    const directDebits = responseData.results.map((directDebit) => directDebit);

    return directDebits;
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
  }
};

// Retrieve account standing orders
const bankAccountStandingOrders = async (_, { id }, { token, dataSources }) => {
  //try catch block to handle errors
  try {
    const responseData =
      await dataSources.tlDataAPI.getBankAccountStandingOrders(id, token);

    //Check if data exists
    if (!responseData.results || !Array.isArray(responseData.results)) {
      throw new Error("No data found or data format not as expected!");
    }

    const standingOrders = responseData.results.map(
      (standingOrders) => standingOrders
    );

    return standingOrders;
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
  }
};

export const bankAccountDataResolvers = {
  bankAccountBalance,
  bankAccountDirectDebits,
  bankAccountStandingOrders,
};
