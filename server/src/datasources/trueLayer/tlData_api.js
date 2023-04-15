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
    return await handleAPIRequest(this, `/data/v1/accounts`, token);
  }

  async getBankAccount(id, token) {
    return await handleAPIRequest(this, `/data/v1/accounts/${id}`, token);
  }

  async getBankAccountBalance(id, token) {
    return await handleAPIRequest(
      this,
      `/data/v1/accounts/${id}/balance`,
      token
    );
  }

  async getBankAccountTransactions(id, token, fromDate, toDate) {
    return await handleAPIRequest(
      this,
      `/data/v1/accounts/${id}/transactions?to=${toDate}&from=${fromDate}`,
      token
    );
  }

  async getBankAccountPendingTransactions(id, token) {
    return await handleAPIRequest(
      this,
      `/data/v1/accounts/${id}/transactions/pending`,
      token
    );
  }

  async getBankAccountDirectDebits(id, token) {
    return await handleAPIRequest(
      this,
      `/data/v1/accounts/${id}/direct_debits`,
      token
    );
  }

  async getBankAccountStandingOrders(id, token) {
    return await handleAPIRequest(
      this,
      `/data/v1/accounts/${id}/standing_orders`,
      token
    );
  }
}
