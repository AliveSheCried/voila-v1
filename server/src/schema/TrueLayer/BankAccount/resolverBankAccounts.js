/* 
*********************************************
Bank account meta data queries
*********************************************
*/

// For the purpose of this demo, we will store the user data token in a local variable to be used in the webhook handler
let tempUserDataToken = null;

//Get all bank accounts
const bankAccounts = async (_, __, { token, dataSources, logger }) => {
  //try catch block to handle errors

  try {
    // Store the active token in temporary storage
    tempUserDataToken = token;
    // Initiate the asynchronous request to TrueLayer
    await dataSources.tlDataAPI.getBankAccounts(token, "bankAccounts");

    // Since the process is asynchronous, return a message indicating that the data will be processed later
    return {
      __typename: "InitialStatus",
      status: "Processing",
      message:
        "The request has been initiated. You will receive the results once they are processed.",
    };
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

export { tempUserDataToken };

// const resolverBankAccounts = {
//   Query: {
//     getDataAccounts: bankAccounts,
//   },
//   GetDataAccountsResult: {
//     __resolveType(obj) {
//       if (obj.status) {
//         return "InitialStatus";
//       }
//       if (obj.accounts) {
//         return "BankAccounts";
//       }
//       return null;
//     },
//   },
// };

// export default resolverBankAccounts;
