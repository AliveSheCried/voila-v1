import { RESTDataSource } from "apollo-datasource-rest";

export class TrueLayerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com";
  }

  /* 
  *************************
  Methods section
  *************************  
  */
  //merchantAccount methods

  getMerchantAccounts(token) {
    return this.get(`/merchant-accounts`, null, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  getMerchantAccount(id, token) {
    return this.get(`/merchant-accounts/${id}`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getMerchantAccountTransactions(id, token, fromDate, toDate) {
    return this.get(
      `merchant-accounts/${id}/transactions?from=${fromDate}&to=${toDate}`,
      null,
      {
        headers: {
          accept: "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }
    );
  }

  //dataApi methods
  getBankAccounts(token) {
    return this.get("/data/v1/accounts&async=true", null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccount(id, token) {
    return this.get(`/data/v1/accounts/${id}&async=true`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccountBalance(id, token) {
    return this.get(`/data/v1/accounts/${id}/balance?async=true`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccountTransactions(id, token, fromDate, toDate) {
    return this.get(
      `/data/v1/accounts/${id}/transactions?to=${toDate}&from=${fromDate}&async=true`,
      null,
      {
        headers: {
          accept: "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getBankAccountPendingTransactions(id, token) {
    return this.get(
      `/data/v1/accounts/${id}/transactions/pending&async=true`,
      null,
      {
        headers: {
          accept: "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getBankAccountDirectDebits(id, token) {
    return this.get(
      `/data/v1/accounts/${id}/transactions/direct_debits&async=true`,
      null,
      {
        headers: {
          accept: "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getBankAccountStandingOrders(id, token) {
    return this.get(
      `/data/v1/accounts/${id}/transactions/standing_orders&async=true`,
      null,
      {
        headers: {
          accept: "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
