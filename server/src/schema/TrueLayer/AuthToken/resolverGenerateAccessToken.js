export const generateAccessToken = async (
  _,
  { scope, grant_type, redirect_uri, code, refresh_token },
  { dataSources, logger }
) => {
  let responseData;
  logger.info("generateAccessToken called with parameters:");
  logger.info(`scope: ${scope}`);
  logger.info(`grant_type: ${grant_type}`);
  logger.info(`redirect_uri: ${redirect_uri}`);
  logger.info(`code: ${code}`);
  logger.info(`refresh_token: ${refresh_token}`);

  // Fetch the access token from TrueLayer API
  try {
    responseData = await dataSources.tlAccessTokenAPI.generateAccessToken(
      scope,
      grant_type,
      redirect_uri,
      code,
      refresh_token
    );
  } catch (error) {
    logger.error(`Error getting access token: ${error.message}`);
    throw new Error(`Failed to retrieve access token`);
  }

  return responseData;
};
