import { RESTDataSource } from "@apollo/datasource-rest";
import { handleAPIRequest } from "../../helpers/handleAPIRequest";

export class TLAccessTokenAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://auth.truelayer-sandbox.com";
  }

  //methods
  async generateAccessToken(scope, grant_type, redirect_uri, code) {
    try {
      const endpoint = `/connect/token`;
      const data = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&scope=${scope}&grant_type=${grant_type}&redirect_uri=${redirect_uri}&code=${code}`,
      };

      return await handleAPIRequest(this, endpoint, null, "POST", data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
