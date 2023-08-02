import { RESTDataSource } from "@apollo/datasource-rest";
import { handleAPIRequest } from "../../helpers/handleAPIRequest.js";

export class TLAccessTokenAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://auth.truelayer-sandbox.com";
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

    try {
      return await handleAPIRequest(this, `/connect/token`, "", "POST", {
        ...options,
        body,
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
