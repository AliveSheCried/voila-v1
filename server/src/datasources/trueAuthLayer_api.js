const { RESTDataSource } = require("apollo-datasource-rest");

class TrueLayerAuthAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://auth.truelayer-sandbox.com";
  }

  //methods
  generateAccessToken() {
    return this.post(`/connect/token`, {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: "payments",
      grant_type: "client_credentials",
    });
  }
}

module.exports = TrueLayerAuthAPI;
