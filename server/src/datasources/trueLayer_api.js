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
    return this.get("/data/v1/accounts", null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccount(id, token) {
    return this.get(`/data/v1/accounts/${id}`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccountBalance(id, token) {
    return this.get(`/data/v1/accounts/${id}/balance`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccountTransactions(id, token, fromDate, toDate) {
    return this.get(
      `/data/v1/accounts/${id}/transactions?to=${toDate}&from=${fromDate}`,
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
    return this.get(`/data/v1/accounts/${id}/transactions/pending`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccountDirectDebits(id, token) {
    return this.get(`/data/v1/accounts/${id}/direct_debits`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccountStandingOrders(id, token) {
    return this.get(`/data/v1/accounts/${id}/standing_orders`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }
}

// const options = {
//   method: "GET",
//   headers: { accept: "application/json; charset=UTF-8" },
// };

//https://api.truelayer-sandbox.com/merchant-accounts/e1eff241-77d7-490d-aef4-d2701d68f90a/transactions?from=2021-11-01T13%3A13%3A40Z&to=2022-12-06T20%3A24%3A26.055Z
