/* 
*********************************************
Bank account meta data queries
*********************************************
*/

//Get all bank accounts
const bankAccounts = async (_, __, { token, dataSources }) => {
  //try catch block to handle errors
  try {
    const responseData = await dataSources.tlDataAPI.getBankAccounts(token);

    //Check if data exists
    if (!responseData.results || !Array.isArray(responseData.results)) {
      throw new Error("No data found or data format not as expected!");
    }
    //Convert received data to schema array of bank account objects
    const bankAccounts = responseData.results.map((account) => account);

    return bankAccounts;
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
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
