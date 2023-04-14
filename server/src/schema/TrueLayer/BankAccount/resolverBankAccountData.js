/* 
*********************************************
Bank account meta data related queries
*********************************************
*/

// Retrieve account balance
const bankAccountBalance = async (_, { id }, { token, dataSources }) => {
  const responseData = await dataSources.tlDataAPI.getBankAccountBalance(
    id,
    token
  );

  return responseData.results[0];
};

// Retrieve account direct debits
const bankAccountDirectDebits = async (_, { id }, { token, dataSources }) => {
  const responseData = await dataSources.tlDataAPI.getBankAccountDirectDebits(
    id,
    token
  );

  const directDebits = responseData.results.map((directDebit) => directDebit);

  return directDebits;
};

// Retrieve account standing orders
const bankAccountStandingOrders = async (_, { id }, { token, dataSources }) => {
  const responseData = await dataSources.tlDataAPI.getBankAccountStandingOrders(
    id,
    token
  );

  const standingOrders = responseData.results.map(
    (standingOrders) => standingOrders
  );

  return standingOrders;
};

export const bankAccountDataResolvers = {
  bankAccountBalance,
  bankAccountDirectDebits,
  bankAccountStandingOrders,
};
