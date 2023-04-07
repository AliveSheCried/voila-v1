import { RESTDataSource } from "@apollo/datasource-rest";
import { handleAPIRequest } from "../../helpers/handleAPIRequest.js";

export class TLPayoutAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com";
  }

  /* 
  *************************
  Methods section
  TrueLayer Payments API - merchant accounts payouts
  DOCS: https://docs.truelayer.com/docs/payouts-and-refunds
  *************************  
  */

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

      return await handleAPIRequest(this, endpoint, token, "POST", data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }

  async getPayoutDetail(id, token) {
    try {
      const endpoint = `/payouts/${id}`;
      return await handleAPIRequest(this, endpoint, token);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
