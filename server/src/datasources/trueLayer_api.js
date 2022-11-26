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

  getMerchantAccountDetail(id, token) {
    return this.get(`/merchant-accounts/${id}`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  //dataApi methods
}
