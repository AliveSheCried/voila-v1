const mutations = {
  generateAccessToken: async (
    _,
    { scope, grant_type, redirect_uri, code },
    { dataSources }
  ) => {
    const response = await dataSources.trueLayerAuthAPI.generateAccessToken(
      scope,
      grant_type,
      redirect_uri,
      code
    );

    return response;
  },
};

export const resolvers = { mutations };
