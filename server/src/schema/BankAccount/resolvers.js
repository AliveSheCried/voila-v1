const queries = {
  /* 
**********************
Bank account meta data queries
**********************
*/
  //Get all bank accounts
  bankAccounts: async (_, __, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getBankAccounts(token);

    const bankAccounts = responseData.results.map((account) => {
      return {
        account_id: account.account_id,
        account_type: account.account_type,
        display_name: account.display_name,
        currency: account.currency,
        account_number: {
          iban: account.account_number.iban,
          swift_bic: account.account_number.swift_bic,
          number: account.account_number.number,
          sort_code: account.account_number.sort_code,
        },
        provider: {
          display_name: account.provider.display_name,
          provider_id: account.provider.provider_id,
          logo_uri: account.provider.logo_uri,
        },
      };
    });

    return bankAccounts;
  },

  bankAccount: async (_, { id }, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getBankAccount(
      id,
      token
    );

    return {
      account_id: responseData.results[0].account_id,
      account_type: responseData.results[0].account_type,
      display_name: responseData.results[0].display_name,
      currency: responseData.results[0].currency,
      account_number: {
        iban: responseData.results[0].account_number.iban,
        swift_bic: responseData.results[0].account_number.swift_bic,
        number: responseData.results[0].account_number.number,
        sort_code: responseData.results[0].account_number.sort_code,
      },
      provider: {
        display_name: responseData.results[0].provider.display_name,
        provider_id: responseData.results[0].provider.provider_id,
        logo_uri: responseData.results[0].provider.logo_uri,
      },
    };
  },
};

export const resolvers = { queries };
