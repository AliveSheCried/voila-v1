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

  //Get specific bank account with id
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

  /* 
**********************
Bank account data related queries
**********************
*/
  // Retrieve account balance
  bankAccountBalance: async (_, { id }, { token, dataSources }) => {
    const responseData = await dataSources.trueLayerAPI.getBankAccountBalance(
      id,
      token
    );

    return {
      currency: responseData.results[0].currency,
      available: responseData.results[0].available,
      current: responseData.results[0].current,
      overdraft: responseData.results[0].overdraft,
      update_timestamp: responseData.results[0].update_timestamp,
    };
  },

  //Retrieve account transctions
  bankAccountTransactions: async (
    _,
    { id, fromDate, toDate },
    { token, dataSources }
  ) => {
    const responseData =
      await dataSources.trueLayerAPI.getBankAccountTransactions(
        id,
        token,
        fromDate,
        toDate
      );

    const transactions = responseData.results.map((transaction) => {
      return {
        timestamp: transaction.timestamp,
        description: transaction.description,
        transaction_type: transaction.transaction_type,
        transaction_category: transaction.transaction_category,
        transaction_classificaton: transaction.tran.map((item) => item),
        amount: transaction.amount,
        currency: transaction.currency,
        transaction_id: transaction.transaction_id,
        provider_transaction_id: transaction.provider_transaction_id,
        normalised_provider_transaction_id:
          transaction.normalised_provider_transaction_id,
        running_balance: {
          currency: transaction.running_balance.currency,
          amount: transaction.running_balance.amount,
        },
        meta: {
          provider_transaction_category:
            transaction.meta.provider_transaction_category,
        },
      };
    });

    return transactions;
  },

  //Retrieve account pending transactions
  bankAccountPendingTransactions: async (_, { id }, { token, dataSources }) => {
    const responseData =
      await dataSources.trueLayerAPI.getBankAccountPendingTransactions(
        id,
        token
      );

    const pendingTransactions = responseData.results.map((transaction) => {
      return {
        timestamp: transaction.timestamp,
        description: transaction.description,
        transaction_type: transaction.transaction_type,
        transaction_category: transaction.transaction_category,
        transaction_classificaton: transaction.tran.map((item) => item),
        amount: transaction.amount,
        currency: transaction.currency,
        transaction_id: transaction.transaction_id,
        provider_transaction_id: transaction.provider_transaction_id,
        normalised_provider_transaction_id:
          transaction.normalised_provider_transaction_id,
        meta: {
          provider_transaction_category:
            transaction.meta.provider_transaction_category,
        },
      };
    });

    return pendingTransactions;
  },

  bankAccountDirectDebits: async (_, { id }, { token, dataSources }) => {
    const responseData =
      await dataSources.trueLayerAPI.getBankAccountDirectDebits(id, token);

    const directDebits = responseData.results.map((dd) => {
      return {
        direct_debit_id: dd.direct_debit_id,
        timestamp: dd.timestamp,
        name: dd.name,
        status: dd.status,
        previous_payment_amount: dd.previous_payment_amount,
        currency: dd.currency,
        meta: {
          provider_account_id: dd.meta.provider_account_id,
          provider_mandate_identification:
            dd.meta.provider_mandate_identification,
        },
      };
    });

    return directDebits;
  },

  bankAccountStandingOrders: async (_, { id }, { token, dataSources }) => {
    const responseData =
      await dataSources.trueLayerAPI.getBankAccountStandingOrders(id, token);

    const standingOrders = responseData.results.map((so) => {
      return {
        frequency: so.frequency,
        status: so.status,
        timestamp: so.timestamp,
        currency: so.currency,
        meta: {
          provider_account_id: so.meta.provider_account_id,
          provider_standing_order_id: so.meta.provider_standing_order_id,
        },
        next_payment_date: so.next_payment_date,
        next_payment_amount: so.next_payment_amount,
        first_payment_date: so.first_payment_date,
        first_payment_amount: so.first_payment_amount,
        final_payment_date: so.final_payment_date,
        final_payment_amount: so.final_payment_amount,
        reference: so.reference,
      };
    });

    return standingOrders;
  },
};

export const resolvers = { queries };
