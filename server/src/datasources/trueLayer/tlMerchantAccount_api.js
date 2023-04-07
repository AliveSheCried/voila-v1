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
    try {
      const endpoint = `/merchant-accounts`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  //get merchant account by id
  async getMerchantAccount(id, token) {
    try {
      const endpoint = `/merchant-accounts/${id}`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  //get merchant account transactions for specified date range and account id
  async getMerchantAccountTransactions(id, token, fromDate, toDate) {
    try {
      const endpoint = `/merchant-accounts/${id}/transactions?from=${fromDate}&to=${toDate}`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
