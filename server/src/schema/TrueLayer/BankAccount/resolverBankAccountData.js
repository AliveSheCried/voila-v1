/* 
*********************************************
Bank account meta data related queries
*********************************************
*/

// For the purpose of this demo, we will store the user data token in a local variable to be used in the webhook handler
let tempUserDataToken = null;

// Retrieve account direct debits
const bankAccountDirectDebits = async (_, { id }, { token, dataSources }) => {
  // Store the active token in temporary storage
  tempUserDataToken = token;
  //try catch block to handle errors
  try {
    await dataSources.tlDataAPI.getBankAccountDirectDebits(
      id,
      token,
      "directDebits"
    );

    // Since the process is asynchronous, return a message indicating that the data will be processed later
    return {
      __typename: "InitialStatus",
      status: "Processing",
      message:
        "The request to return direct debits has been initiated. You will receive the results once they are processed.",
    };
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
  }
};

// Retrieve account standing orders
const bankAccountStandingOrders = async (_, { id }, { token, dataSources }) => {
  tempUserDataToken = token;
  //try catch block to handle errors
  try {
    await dataSources.tlDataAPI.getBankAccountStandingOrders(
      id,
      token,
      "standingOrders"
    );

    // Since the process is asynchronous, return a message indicating that the data will be processed later
    return {
      __typename: "InitialStatus",
      status: "Processing",
      message:
        "The request to return standing orders has been initiated. You will receive the results once they are processed.",
    };
  } catch (error) {
    console.log(error);
    // Throw the error so that it can be caught and handled by Apollo Server
    throw error;
  }
};

// Retrieve account balance
const bankAccountBalance = async (_, { id }, { token, dataSources }) => {
  tempUserDataToken = token;
  //try catch block to handle errors
  try {
    await dataSources.tlDataAPI.getBankAccountBalance(
      id,
      token,
      "bankAccountBalance"
    );

    // Since the process is asynchronous, return a message indicating that the data will be processed later
    return {
      __typename: "InitialStatus",
      status: "Processing",
      message:
        "The request to return the account balance has been initiated. You will receive the results once they are processed.",
    };
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
