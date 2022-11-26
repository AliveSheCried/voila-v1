const queries = {
  //Queries
  //Get all merchant accounts
  merchantAccounts: async (_, __, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getMerchantAccounts(
      token
    );
    const merchantAccounts = responseData.items.map((merchantAcc) => {
      return {
        id: merchantAcc.id,
        currency: merchantAcc.currency,
        account_identifiers: merchantAcc.account_identifiers.map(
          (identifier) => {
            return {
              type: identifier.type,
              sort_code: identifier.sort_code,
              account_number: identifier.account_number,
              iban: identifier.iban,
            };
          }
        ),
        available_balance: merchantAcc.available_balance_in_minor,
        current_balance: merchantAcc.current_balance_in_minor,
      };
    });

    return merchantAccounts;
  },

  //get individual merchant account detail
  merchantAccountDetail: async (_, { id }, { token, dataSources }) => {
    const responseData =
      await dataSources.trueLayerAPI.getMerchantAccountDetail(id, token);

    return {
      id: responseData.id,
      currency: responseData.currency,
      available_balance_in_minor: responseData.available_balance_in_minor,
      current_balance_in_minor: responseData.current_balance_in_minor,
      account_holder_name: responseData.account_holder_name,
      account_identifiers: responseData.account_identifiers.map(
        (identifier) => {
          return {
            type: identifier.type,
            sort_code: identifier.sort_code,
            account_number: identifier.account_number,
            iban: identifier.iban,
          };
        }
      ),
    };
  },
};

export const resolvers = { queries };
