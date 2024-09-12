import { RESTDataSource } from "@apollo/datasource-rest";
import tlSigning from "truelayer-signing";
import { v4 as uuidv4 } from "uuid";
import logger from "../../config/logger.js";
import { handleAPIRequest as defaultHandleAPIRequest } from "../../helpers/handleAPIRequest.js";

export class TLPayoutAPI extends RESTDataSource {
  constructor(handleAPIRequest = defaultHandleAPIRequest) {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com/v3";
    this.handleAPIRequest = handleAPIRequest.bind(this);
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
      path: "/v3/payouts",
      headers: {
        "Idempotency-Key": idKey,
      },
      body: JSON.stringify(body),
    });

    const options = {
      "Idempotency-Key": idKey,
      "Tl-Signature": tlSignature,
      "content-type": "application/json; charset=UTF-8",
    };

    try {
      console.log(`/payouts`, token, "POST", {
        ...options,
        body,
      });
      return await this.handleAPIRequest(this, `/payouts`, token, "POST", {
        ...options,
        body,
      });
    } catch (error) {
      logger.error(`Error creating merchant account payout: ${error.message}`);
      if (error.response) {
        logger.error(`Response status: ${error.response.status}`);
        logger.error(`Response data: ${error.response.data}`);
      } else if (error.request) {
        logger.error(`Request made but no response received: ${error.request}`);
      } else {
        logger.error(`Error in setting up request: ${error.message}`);
      }
      throw new Error("Failed to create merchant account payout");
    }
  }

  async getPayoutDetail(id, token) {
    try {
      return await this.handleAPIRequest(this, `/payouts/${id}`, token);
    } catch (error) {
      logger.error(
        `Error getting payout detail for ID ${id}: ${error.message}`
      );
      if (error.response) {
        logger.error(`Response status: ${error.response.status}`);
        logger.error(`Response data: ${error.response.data}`);
      } else if (error.request) {
        logger.error(`Request made but no response received: ${error.request}`);
      } else {
        logger.error(`Error in setting up request: ${error.message}`);
      }
      throw new Error(`Failed to get payout detail for ID ${id}`);
    }
  }
}
