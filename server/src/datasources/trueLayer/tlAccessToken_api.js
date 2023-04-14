import { RESTDataSource } from "@apollo/datasource-rest";

export class TLAccessTokenAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://auth.truelayer-sandbox.com";
  }

  //methods
  async generateAccessToken(scope, grant_type, redirect_uri, code) {
    try {
      return await this.post(`/connect/token`, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        scope: scope ? scope : "",
        grant_type: grant_type,
        redirect_uri: redirect_uri ? redirect_uri : "",
        code: code ? code : "",
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      throw error;
    }
  }
}
