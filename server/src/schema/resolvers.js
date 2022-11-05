const { reject } = require("lodash");

const resolvers = {
  Mutation: {
    generateAccessToken: async (
      _,
      { client_id, client_secret, scope, grant_type },
      { dataSources }
    ) => {
      const responseData =
        await dataSources.truelayerAuthAPI.generateAccessToken(
          client_id,
          client_secret,
          scope,
          grant_type
        );

      const accessToken = {
        access_token: responseData.access_token,
        scope: responseData.scope,
        token_type: responseData.token_type,
        expires_in: responseData.expires_in,
      };

      return accessToken;
    },
  },
};

module.exports = resolvers;
