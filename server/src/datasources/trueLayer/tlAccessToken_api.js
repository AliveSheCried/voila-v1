import { RESTDataSource } from "@apollo/datasource-rest";
import logger from "../../config/logger.js";
import { handleAPIRequest as defaultHandleAPIRequest } from "../../helpers/handleAPIRequest.js";

export class TLAccessTokenAPI extends RESTDataSource {
  constructor(handleAPIRequest = defaultHandleAPIRequest) {
    super();
    this.baseURL = "https://auth.truelayer-sandbox.com";
    this.handleAPIRequest = handleAPIRequest.bind(this);
  }

  //methods
  async generateAccessToken(
    scope = "",
    grant_type,
    redirect_uri = "",
    code = ""
  ) {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;
    const options = {
      accept: "application/json",
      "content-type": "application/json",
    };
    const body = {
      client_id,
      client_secret,
      scope,
      grant_type,
      redirect_uri,
      code,
    };

    // Log client_id and redirect_uri
    // logger.info(`client_id: ${client_id}`);
    // logger.info(`redirect_uri: ${redirect_uri}`);

    try {
      return await this.handleAPIRequest(this, `/connect/token`, "", "POST", {
        ...options,
        body,
      });
    } catch (error) {
      logger.error(`Error generating access token: ${error.message}`);
      if (error.response) {
        logger.error(`Response status: ${error.response.status}`);
        logger.error(`Response data: ${error.response.data}`);
      } else if (error.request) {
        logger.error(`Request made but no response received: ${error.request}`);
      } else {
        logger.error(`Error in setting up request: ${error.message}`);
      }
      throw new Error("Failed to generate access token");
    }
  }
}

/////////////////////// Code working before chang for Ava tests
// import { RESTDataSource } from "@apollo/datasource-rest";
// import logger from "../../config/logger.js";
// import { handleAPIRequest } from "../../helpers/handleAPIRequest.js";

// export class TLAccessTokenAPI extends RESTDataSource {
//   constructor() {
//     super();
//     this.baseURL = "https://auth.truelayer-sandbox.com";
//   }
//   //methods
//   async generateAccessToken(
//     scope = "",
//     grant_type,
//     redirect_uri = "",
//     code = ""
//   ) {
//     const client_id = process.env.CLIENT_ID;
//     const client_secret = process.env.CLIENT_SECRET;
//     const options = {
//       accept: "application/json",
//       "content-type": "application/json",
//     };
//     const body = {
//       client_id,
//       client_secret,
//       scope,
//       grant_type,
//       redirect_uri,
//       code,
//     };

//     try {
//       return await handleAPIRequest(this, `/connect/token`, "", "POST", {
//         ...options,
//         body,
//       });
//     } catch (error) {
//       logger.error(`Error generating access token: ${error.message}`);
//       if (error.response) {
//         logger.error(`Response status: ${error.response.status}`);
//         logger.error(`Response data: ${error.response.data}`);
//       } else if (error.request) {
//         logger.error(`Request made but no response received: ${error.request}`);
//       } else {
//         logger.error(`Error in setting up request: ${error.message}`);
//       }
//       throw new Error("Failed to generate access token");
//     }
//   }
// }
