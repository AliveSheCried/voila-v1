import { RESTDataSource } from "apollo-datasource-rest";
import { v4 as uuidv4 } from "uuid";
import tlSigning from "truelayer-signing";

export class TrueLayerAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com";
  }

  /* 
  *************************
  Methods section
  *************************  
  */
  //merchantAccount methods

  getMerchantAccounts(token) {
    return this.get(`/merchant-accounts`, null, {
      headers: { authorization: `Bearer ${token}` },
    });
  }

  getMerchantAccount(id, token) {
    return this.get(`/merchant-accounts/${id}`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getMerchantAccountTransactions(id, token, fromDate, toDate) {
    return this.get(
      `merchant-accounts/${id}/transactions?from=${fromDate}&to=${toDate}`,
      null,
      {
        headers: {
          accept: "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }
    );
  }

  //dataApi methods
  getBankAccounts(token) {
    return this.get("/data/v1/accounts", null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccount(id, token) {
    return this.get(`/data/v1/accounts/${id}`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccountBalance(id, token) {
    return this.get(`/data/v1/accounts/${id}/balance`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccountTransactions(id, token, fromDate, toDate) {
    return this.get(
      `/data/v1/accounts/${id}/transactions?to=${toDate}&from=${fromDate}`,
      null,
      {
        headers: {
          accept: "application/json; charset=UTF-8",
          authorization: `Bearer ${token}`,
        },
      }
    );
  }

  getBankAccountPendingTransactions(id, token) {
    return this.get(`/data/v1/accounts/${id}/transactions/pending`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccountDirectDebits(id, token) {
    return this.get(`/data/v1/accounts/${id}/direct_debits`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }

  getBankAccountStandingOrders(id, token) {
    return this.get(`/data/v1/accounts/${id}/standing_orders`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
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

    return this.post(`/payouts`, body, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
        "Idempotency-Key": idKey,
        "Tl-Signature": tlSignature,
        "content-type": "application/json; charset=UTF-8",
      },
    });
  }

  getPayoutDetail(id, token) {
    return this.get(`/payouts/${id}`, null, {
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    });
  }
}
