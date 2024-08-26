import { RESTDataSource } from "@apollo/datasource-rest";
import { handleAPIRequest } from "../../helpers/handleAPIRequest.js";
import { storeTaskMetadata } from "../../helpers/webhookDataHelper.js";

export class TLDataAPI extends RESTDataSource {
  constructor({ webhookURL }) {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com";
    this.webhookURL = `${webhookURL}/webhooks/truelayer/data`;
  }

  /* 
  *************************
  Methods section
  TrueLayer Data API
  DOCS: https://docs.truelayer.com/docs/data-api-basics
  *************************  
  */

  async getBankAccounts(token, dataApiType) {
    const response = await handleAPIRequest(
      this,
      `/data/v1/accounts?async=true&webhook_uri=${this.webhookURL}`,
      token
    );

    const taskId = response.task_id;

    // Store the association between task_id and dataApiType
    storeTaskMetadata(taskId, dataApiType);

    return response;
  }

  async getBankAccountDirectDebits(id, token, dataApiType) {
    const response = await handleAPIRequest(
      this,
      `/data/v1/accounts/${id}/direct_debits?async=true&webhook_uri=${this.webhookURL}`,
      token
    );

    const taskId = response.task_id;

    // Store the association between task_id and dataApiType
    storeTaskMetadata(taskId, dataApiType);

    return response;
  }

  async getBankAccountStandingOrders(id, token, dataApiType) {
    const response = await handleAPIRequest(
      this,
      `/data/v1/accounts/${id}/standing_orders?async=true&webhook_uri=${this.webhookURL}`,
      token
    );

    const taskId = response.task_id;

    // Store the association between task_id and dataApiType
    storeTaskMetadata(taskId, dataApiType);

    return response;
  }

  async getBankAccountBalance(id, token) {
    return await handleAPIRequest(
      this,
      `/data/v1/accounts/${id}/balance`,
      token
    );
  }

  async getBankAccountTransactions(id, token, fromDate, toDate) {
    // Decode the fromDate and toDate values
    const decodedFromDate = decodeURIComponent(fromDate);
    const decodedToDate = decodeURIComponent(toDate);

    return await handleAPIRequest(
      this,
      `/data/v1/accounts/${id}/transactions?to=${decodedToDate}&from=${decodedFromDate}`,
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

  async getBankAccount(id, token) {
    return await handleAPIRequest(this, `/data/v1/accounts/${id}`, token);
  }
}
