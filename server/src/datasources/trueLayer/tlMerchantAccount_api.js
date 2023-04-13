import { RESTDataSource } from "@apollo/datasource-rest";

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

  /////old code for debugging
  // Common options function
  getOptions(token, additionalHeaders = {}) {
    return {
      method: "GET",
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
        ...additionalHeaders,
      },
    };
  }

  //get all merchant accounts
  async getMerchantAccounts(token) {
    try {
      // const endpoint = `/merchant-accounts`;
      // return await handleAPIRequest(this, endpoint, token);
      const options = this.getOptions(token);
      return await this.get(`/merchant-accounts`, options);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  //get merchant account by id
  async getMerchantAccount(id, token) {
    try {
      // const endpoint = `/merchant-accounts/${id}`;
      // return await handleAPIRequest(this, endpoint, token);
      const options = this.getOptions(token);
      console.log(options);
      return await this.get(`/merchant-accounts/${id}`, options);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  //get merchant account transactions for specified date range and account id
  async getMerchantAccountTransactions(id, token, fromDate, toDate) {
    try {
      // const endpoint = `/merchant-accounts/${id}/transactions?from=${fromDate}&to=${toDate}`;
      // return await handleAPIRequest(this, endpoint, token);
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
