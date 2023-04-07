import { RESTDataSource } from "@apollo/datasource-rest";
import { handleAPIRequest } from "../../helpers/handleAPIRequest.js";

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

  async getBankAccounts(token) {
    try {
      const endpoint = `/data/v1/accounts`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccount(id, token) {
    try {
      const endpoint = `/data/v1/accounts/${id}`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountBalance(id, token) {
    try {
      const endpoint = `/data/v1/accounts/${id}/balance`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountTransactions(id, token, fromDate, toDate) {
    try {
      const endpoint = `/data/v1/accounts/${id}/transactions?from=${fromDate}&to=${toDate}`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountPendingTransactions(id, token) {
    try {
      const endpoint = `/data/v1/accounts/${id}/transactions/pending`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountDirectDebits(id, token) {
    try {
      const endpoint = `/data/v1/accounts/${id}/direct_debits`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountStandingOrders(id, token) {
    try {
      const endpoint = `/data/v1/accounts/${id}/standing_orders`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
