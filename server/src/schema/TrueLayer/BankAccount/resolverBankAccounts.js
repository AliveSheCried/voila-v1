/* 
*********************************************
Bank account meta data queries
*********************************************
*/

//Get all bank accounts
const bankAccounts = async (_, __, { token, dataSources }) => {
  const responseData = await dataSources.tlDataAPI.getBankAccounts(token);

  const bankAccounts = responseData.results.map((account) => account);

  return bankAccounts;
};

//Get specific bank account with id
const bankAccount = async (_, { id }, { token, dataSources }) => {
  const responseData = await dataSources.tlDataAPI.getBankAccount(id, token);

  return responseData.results[0];
};

export const bankAccountResolvers = {
  bankAccounts,
  bankAccount,
};
