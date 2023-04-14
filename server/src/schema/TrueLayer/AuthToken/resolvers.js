const mutations = {
  generateAccessToken: async (
    _,
    { scope, grant_type, redirect_uri, code },
    { dataSources }
  ) => {
    const responseData = await dataSources.tlAccessTokenAPI.generateAccessToken(
      scope,
      grant_type,
      redirect_uri,
      code
    );

    return responseData;
  },
};

export const resolvers = { mutations };
