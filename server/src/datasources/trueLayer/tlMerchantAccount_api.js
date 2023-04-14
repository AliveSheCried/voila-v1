import { RESTDataSource } from "@apollo/datasource-rest";
import { handleAPIRequest } from "../../helpers/handleAPIRequest.js";

export class TLMerchantAccountAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com";
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
    return await handleAPIRequest("/merchant-accounts", token);
  }

  //get merchant account by id
  async getMerchantAccount(id, token) {
    try {
      const options = this.getOptions(token);
      return await this.get(`/merchant-accounts/${id}`, options);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  //get merchant account transactions for specified date range and account id
  async getMerchantAccountTransactions(id, token, fromDate, toDate) {
    try {
      const options = this.getOptions(token);
      return await this.get(
        `merchant-accounts/${id}/transactions?from=${fromDate}&to=${toDate}`,
        options
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
