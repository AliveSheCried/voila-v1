import { RESTDataSource } from "@apollo/datasource-rest";
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

  //handle GET & POST requests function
  async handleAPIRequest(endpoint, token, method = "GET", data = null) {
    const options = this.getOptions(token, {
      "Content-Type": "application/json",
    });

    if (method === "POST" && data) {
      options.method = "POST";
      options.headers = {
        ...options.headers,
        ...data.headers,
      };
      options.body = data.body;
    }

    const response = await this.fetch(endpoint, options);

    if (!response.ok) {
      let message = `Error making ${method} request to ${endpoint}: ${response.status}`;

      try {
        const error = await response.json();
        message += ` - ${error.error_description}`;
      } catch (error) {}

      throw new Error(message);
    }

    return response.json();
  }

  /* 
  *************************
  Methods section
  *************************  
  */

  /////////merchantAccount methods
  //get all merchant accounts

  async getMerchantAccounts(token) {
    try {
      return await this.handleAPIRequest(`/merchant-accounts`, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  //get merchant account by id
  async getMerchantAccount(id, token) {
    try {
      return await this.handleAPIRequest(`/merchant-accounts/${id}`, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  //get merchant account transactions for specified date range and account id
  async getMerchantAccountTransactions(id, token, fromDate, toDate) {
    try {
      const endpoint = `/merchant-accounts/${id}/transactions?from=${fromDate}&to=${toDate}`;
      return await this.handleAPIRequest(endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  /////////dataApi methods
  async getBankAccounts(token) {
    try {
      const endpoint = `/data/v1/accounts`;
      return await this.handleAPIRequest(endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccount(id, token) {
    try {
      const endpoint = `/data/v1/accounts/${id}`;
      return await this.handleAPIRequest(endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountBalance(id, token) {
    try {
      const endpoint = `/data/v1/accounts/${id}/balance`;
      return await this.handleAPIRequest(endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountTransactions(id, token, fromDate, toDate) {
    try {
      const endpoint = `/data/v1/accounts/${id}/transactions?from=${fromDate}&to=${toDate}`;
      return await this.handleAPIRequest(endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountPendingTransactions(id, token) {
    try {
      const endpoint = `/data/v1/accounts/${id}/transactions/pending`;
      return await this.handleAPIRequest(endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountDirectDebits(id, token) {
    try {
      const endpoint = `/data/v1/accounts/${id}/direct_debits`;
      return await this.handleAPIRequest(endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getBankAccountStandingOrders(id, token) {
    try {
      const endpoint = `/data/v1/accounts/${id}/standing_orders`;
      return await this.handleAPIRequest(endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  /////////MerchantAccountPayout methods
  async createMerchantAccountPayout(
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

    /*  Original code
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
    */

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

    try {
      const endpoint = `/payouts`;
      const headers = {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
        "Idempotency-Key": idKey,
        "Tl-Signature": tlSignature,
        "content-type": "application/json; charset=UTF-8",
      };
      const body = JSON.stringify({
        beneficiary: {
          type: "external_account",
          account_identifier: account_identifier,
          reference,
          account_holder_name,
        },
        amount_in_minor,
        merchant_account_id,
        currency,
      });
      const data = {
        headers: headers,
        body: body,
      };

      return await this.handleAPIRequest(endpoint, token, "POST", data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }

    //return this.post(`/payouts`, options);
  }

  async getPayoutDetail(id, token) {
    try {
      const endpoint = `/payouts/${id}`;
      return await this.handleAPIRequest(endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
