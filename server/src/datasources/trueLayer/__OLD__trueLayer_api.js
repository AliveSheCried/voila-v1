/*

Used for reference only


*/

import { RESTDataSource } from "@apollo/datasource-rest";
import tlSigning from "truelayer-signing";
import { v4 as uuidv4 } from "uuid";

export class TrueLayerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com";
  }

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

  /* 
  *************************
  Methods section
  *************************  
  */
  //merchantAccount methods

  getMerchantAccounts(token) {
    const options = this.getOptions(token);
    return this.get(`/merchant-accounts`, options);
  }

  getMerchantAccount(id, token) {
    const options = this.getOptions(token);
    return this.get(`/merchant-accounts/${id}`, options);
  }

  getMerchantAccountTransactions(id, token, fromDate, toDate) {
    const options = this.getOptions(token);
    return this.get(
      `merchant-accounts/${id}/transactions?from=${fromDate}&to=${toDate}`,
      options
    );
  }

  //dataApi methods
  getBankAccounts(token) {
    const options = this.getOptions(token);
    return this.get("/data/v1/accounts", options);
  }

  getBankAccount(id, token) {
    const options = this.getOptions(token);
    return this.get(`/data/v1/accounts/${id}`, options);
  }

  getBankAccountBalance(id, token) {
    const options = this.getOptions(token);
    return this.get(`/data/v1/accounts/${id}/balance`, options);
  }

  getBankAccountTransactions(id, token, fromDate, toDate) {
    const options = this.getOptions(token);
    return this.get(
      `/data/v1/accounts/${id}/transactions?to=${toDate}&from=${fromDate}`,
      options
    );
  }

  getBankAccountPendingTransactions(id, token) {
    const options = this.getOptions(token);
    return this.get(`/data/v1/accounts/${id}/transactions/pending`, options);
  }

  getBankAccountDirectDebits(id, token) {
    const options = this.getOptions(token);
    return this.get(`/data/v1/accounts/${id}/direct_debits`, options);
  }

  getBankAccountStandingOrders(id, token) {
    const options = this.getOptions(token);
    return this.get(`/data/v1/accounts/${id}/standing_orders`, options);
  }

  //MerchantAccountPayout methods
  createMerchantAccountPayout(
    reference,
    account_holder_name,
    merchant_account_id,
    amount_in_minor,
    currency,
    account_identifier,
    token
  ) {
    const kid = process.env.KID;
    if (!kid) throw new Error("Missing env var KID");

    const privateKeyPem = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
    if (!privateKeyPem) throw new Error("Missing env var PRIVATE_KEY");

    const idKey = uuidv4();

    const body = {
      beneficiary: {
        type: "external_account",
        account_identifier: account_identifier,
        reference,
        account_holder_name,
      },
      amount_in_minor,
      merchant_account_id,
      currency,
    };

    const tlSignature = tlSigning.sign({
      kid,
      privateKeyPem,
      method: "POST",
      path: "/payouts",
      headers: {
        "Idempotency-Key": idKey,
      },
      body: JSON.stringify(body),
    });

    const options = {
      method: "POST",
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
        "Idempotency-Key": idKey,
        "Tl-Signature": tlSignature,
        "content-type": "application/json; charset=UTF-8",
      },
      body,
    };

    return this.post(`/payouts`, options);
  }

  getPayoutDetail(id, token) {
    const options = this.getOptions(token);
    return this.get(`/payouts/${id}`, options);
  }
}
