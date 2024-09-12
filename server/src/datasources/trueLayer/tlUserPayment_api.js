import { RESTDataSource } from "@apollo/datasource-rest";
import tlSigning from "truelayer-signing";
import { v4 as uuidv4 } from "uuid";
import logger from "../../config/logger.js";
import { handleAPIRequest as defaultHandleAPIRequest } from "../../helpers/handleAPIRequest.js";

export class TLPUserPaymentAPI extends RESTDataSource {
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

  async createUserPayment({
    amount_in_minor,
    currency,

    token,
  }) {
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
          merchant_account_id: "e1eff241-77d7-490d-aef4-d2701d68f90a",
        },
      },
      user: {
        id: "f61c0ec7-0f83-414e-8e5f-aace86e0ed35",
        name: "Jonathan Sandbridge",
        email: "john@sandbridge.com",
        phone: "+447809123456",
        date_of_birth: "1992-11-28",
        address: {
          address_line1: "40 Finsbury Square",
          city: "London",
          state: "London",
          zip: "EC2a 1PX",
          country_code: "GB",
        },
      },
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

// const options = {
//     method: 'POST',
//     headers: {
//       accept: 'application/json; charset=UTF-8',
//       'Idempotency-Key': 'idempotencykey',
//       'Tl-Signature': 'TL sign',
//       'content-type': 'application/json; charset=UTF-8'
//     },
//     body: '{"currency":"GBP","payment_method":{"type":"bank_transfer","provider_selection":{"type":"user_selected","filter":{"countries":["GB"],"release_channel":"general_availability","customer_segments":["retail"]},"scheme_selection":{"type":"instant_only","allow_remitter_fee":false}},"beneficiary":{"type":"merchant_account","verification":{"type":"automated"},"merchant_account_id":"MERCHACCId","reference":"Widget001"},"retry":{"newKey":"New Value"}},"user":{"id":"userId","name":"Ryan Jakson","email":"ryan@email.com","political_exposure":"none"},"amount_in_minor":10001}'
//   };

//   fetch('https://api.truelayer-sandbox.com/v3/payments', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));
