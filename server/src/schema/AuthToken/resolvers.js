const mutations = {
  generateAccessToken: async (
    _,
    { client_id, client_secret, scope, grant_type },
    { dataSources }
  ) => {
    const response = await dataSources.trueLayerAuthAPI.generateAccessToken(
      client_id,
      client_secret,
      scope,
      grant_type
    );

    return response;
  },
};

export const resolvers = { mutations };
