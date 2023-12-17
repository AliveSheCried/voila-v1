import { RESTDataSource } from "@apollo/datasource-rest";
import { handleAPIRequest } from "../../helpers/handleAPIRequest.js";

export class TLMerchantAccountAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com/v3";
  }
  /* 
  *************************
  Methods section
  TrueLayer Merchant Accounts API
  DOCS: https://docs.truelayer.com/docs/merchant-accounts-1
  *************************  
  */

  //get all merchant accounts
  async getMerchantAccounts(token) {
    return await handleAPIRequest(this, "/merchant-accounts", token);
  }

  //get merchant account by id
  async getMerchantAccount(id, token) {
    return await handleAPIRequest(this, `/merchant-accounts/${id}`, token);
  }

  //get merchant account transactions for specified date range and account id
  async getMerchantAccountTransactions(id, token, fromDate, toDate) {
    return await handleAPIRequest(
      this,
      `merchant-accounts/${id}/transactions?from=${fromDate}&to=${toDate}`,
      token
    );
  }
}
