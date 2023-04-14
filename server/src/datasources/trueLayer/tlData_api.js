import { RESTDataSource } from "@apollo/datasource-rest";

export class TLDataAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com";
  }

  /* 
  *************************
  Methods section
  TrueLayer Data API
  DOCS: https://docs.truelayer.com/docs/data-api-basics
  *************************  
  */

  //Common options function
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

  async getBankAccounts(token) {
    try {
      const options = this.getOptions(token);
      return await this.get("/data/v1/accounts", options);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccount(id, token) {
    try {
      const options = this.getOptions(token);
      return await this.get(`/data/v1/accounts/${id}`, options);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountBalance(id, token) {
    try {
      const options = this.getOptions(token);
      return await this.get(`/data/v1/accounts/${id}/balance`, options);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountTransactions(id, token, fromDate, toDate) {
    try {
      const options = this.getOptions(token);
      return await this.get(
        `/data/v1/accounts/${id}/transactions?to=${toDate}&from=${fromDate}`,
        options
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountPendingTransactions(id, token) {
    try {
      const options = this.getOptions(token);
      return await this.get(
        `/data/v1/accounts/${id}/transactions/pending`,
        options
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountDirectDebits(id, token) {
    try {
      const options = this.getOptions(token);
      return await this.get(`/data/v1/accounts/${id}/direct_debits`, options);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountStandingOrders(id, token) {
    try {
      const options = this.getOptions(token);
      return await this.get(`/data/v1/accounts/${id}/standing_orders`, options);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
