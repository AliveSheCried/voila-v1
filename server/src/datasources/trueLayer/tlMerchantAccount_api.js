import { RESTDataSource } from "@apollo/datasource-rest";
import logger from "../../config/logger.js";
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
    try {
      return await handleAPIRequest(this, "/merchant-accounts", token);
    } catch (error) {
      logger.error(`Error getting merchant accounts: ${error.message}`);
      throw new Error("Failed to retrieve merchant accounts");
    }
  }

  //get merchant account by id
  async getMerchantAccount(id, token) {
    try {
      return await handleAPIRequest(this, `/merchant-accounts/${id}`, token);
    } catch (error) {
      logger.error(
        `Error getting merchant account with ID ${id}: ${error.message}`
      );
      throw new Error(`Failed to retrieve merchant account with ID ${id}`);
    }
  }

  //get merchant account transactions for specified date range and account id
  async getMerchantAccountTransactions(id, token, fromDate, toDate) {
    try {
      return await handleAPIRequest(
        this,
        `merchant-accounts/${id}/transactions?from=${fromDate}&to=${toDate}`,
        token
      );
    } catch (error) {
      logger.error(
        `Error getting transactions for merchant account with ID ${id}: ${error.message}`
      );
      throw new Error(
        `Failed to retrieve transactions for merchant account with ID ${id}`
      );
    }
  }
}
