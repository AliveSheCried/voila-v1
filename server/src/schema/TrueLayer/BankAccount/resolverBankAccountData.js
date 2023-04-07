/* 
*********************************************
Bank account meta data related queries
*********************************************
*/

// Retrieve account balance
export const bankAccountBalance = async (_, { id }, { token, dataSources }) => {
  const responseData = await dataSources.trueLayerAPI.getBankAccountBalance(
    id,
    token
  );

  return responseData.results[0];
};

// Retrieve account direct debits
export const bankAccountDirectDebits = async (
  _,
  { id },
  { token, dataSources }
) => {
  const responseData =
    await dataSources.trueLayerAPI.getBankAccountDirectDebits(id, token);

  const directDebits = responseData.results.map((directDebit) => directDebit);

  return directDebits;
};

// Retrieve account standing orders
export const bankAccountStandingOrders = async (
  _,
  { id },
  { token, dataSources }
) => {
  const responseData =
    await dataSources.trueLayerAPI.getBankAccountStandingOrders(id, token);

  const standingOrders = responseData.results.map(
    (standingOrders) => standingOrders
  );

  return standingOrders;
};
