const mutations = {
  generateAccessToken: async (
    _,
    { scope, grant_type, redirect_uri, code },
    { dataSources }
  ) => {
    let responseData;
    // Fetch the access token from TrueLayer API
    try {
      responseData = await dataSources.tlAccessTokenAPI.generateAccessToken(
        scope,
        grant_type,
        redirect_uri,
        code
      );
    } catch (error) {
      logger.error(`Error getting access token: ${error.message}`);
      throw new Error(`Failed to retrieve access token`);
    }

    return responseData;
  },
};

export const resolvers = { mutations };
