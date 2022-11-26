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

  //dataApi methods
  getBankAccounts(token) {
    return this.get("/data/v1/accounts", null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
        "X-PSU-IP": "190.190.190.0",
      },
    });
  }

  getBankAccount(id, token) {
    return this.get(`/data/v1/accounts/${id}`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
        "X-PSU-IP": "190.190.190.0",
      },
    });
  }
}
