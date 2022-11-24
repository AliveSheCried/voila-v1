import { RESTDataSource } from "apollo-datasource-rest";

export class TrueLayerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com";
  }

  //methods
  getMerchantAccounts(token) {
    return this.get(`/merchant-accounts`, null, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  getMerchantAccountDetail(id) {
    return this.get(`/merchant-accounts/${id}`);
  }
}
