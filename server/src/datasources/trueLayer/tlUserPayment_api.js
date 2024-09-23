import { RESTDataSource } from "@apollo/datasource-rest";
import tlSigning from "truelayer-signing";
import { v4 as uuidv4 } from "uuid";
import logger from "../../config/logger.js";
import { handleAPIRequest as defaultHandleAPIRequest } from "../../helpers/handleAPIRequest.js";

export class TLUserPaymentAPI extends RESTDataSource {
  constructor(handleAPIRequest = defaultHandleAPIRequest) {
    super();
    this.baseURL = "https://api.truelayer-sandbox.com/v3";
    this.handleAPIRequest = handleAPIRequest.bind(this);
  }

  /*
  *************************
  Methods section
  TrueLayer Payments API - user payments
  DOCS: https://docs.truelayer.com/docs/payments-api-basics
  *************************
  */

  async createUserPayment(
    amount_in_minor,
    currency,
    merchant_account_id,
    user_id,
    user_name,
    user_email,
    user_phone,
    user_date_of_birth,
    user_address_line1,
    user_city,
    user_state,
    user_zip,
    user_country_code,
    token
  ) {
    const kid = process.env.KID;
    if (!kid) throw new Error("Missing env var KID");

    const privateKeyPem = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
    if (!privateKeyPem) throw new Error("Missing env var PRIVATE_KEY");

    const idKey = uuidv4();

    const body = {
      amount_in_minor,
      currency,
      payment_method: {
        provider_selection: {
          type: "user_selected",
          scheme_selection: {
            type: "user_selected",
            allow_remitter_fee: false,
          },
        },
        type: "bank_transfer",
        beneficiary: {
          type: "merchant_account",
          merchant_account_id,
        },
      },
      user: {
        id: user_id,
        name: user_name,
        email: user_email,
        phone: `+${user_phone}`,
        date_of_birth: user_date_of_birth,
        address: {
          address_line1: user_address_line1,
          city: user_city,
          state: user_state,
          zip: user_zip,
          country_code: user_country_code,
        },
      },
    };

    const tlSignature = tlSigning.sign({
      kid,
      privateKeyPem,
      method: "POST",
      path: "/v3/payments",
      headers: {
        "Idempotency-Key": idKey,
      },
      body: JSON.stringify(body),
    });

    const options = {
      accept: "application/json; charset=UTF-8",
      "Idempotency-Key": idKey,
      "Tl-Signature": tlSignature,
      "content-type": "application/json; charset=UTF-8",
    };

    try {
      console.log(`/payments`, token, "POST", {
        ...options,
        body,
      });
      return await this.handleAPIRequest(this, `/payments`, token, "POST", {
        ...options,
        body,
      });
    } catch (error) {
      logger.error(`Error creating user payment: ${error.message}`);
      if (error.response) {
        logger.error(`Response status: ${error.response.status}`);
        logger.error(`Response data: ${error.response.data}`);
      } else if (error.request) {
        logger.error(`Request made but no response received: ${error.request}`);
      } else {
        logger.error(`Error in setting up request: ${error.message}`);
      }
      throw new Error("Failed to create user payment");
    }
  }

  //   async getPayoutDetail(id, token) {
  //     try {
  //       return await this.handleAPIRequest(this, `/payouts/${id}`, token);
  //     } catch (error) {
  //       logger.error(
  //         `Error getting payout detail for ID ${id}: ${error.message}`
  //       );
  //       if (error.response) {
  //         logger.error(`Response status: ${error.response.status}`);
  //         logger.error(`Response data: ${error.response.data}`);
  //       } else if (error.request) {
  //         logger.error(`Request made but no response received: ${error.request}`);
  //       } else {
  //         logger.error(`Error in setting up request: ${error.message}`);
  //       }
  //       throw new Error(`Failed to get payout detail for ID ${id}`);
  //     }
  //   }
}
