import logger from "../config/logger.js";
import { TLAccessTokenAPI as tlAccessTokenAPIClass } from "../datasources/truelayer/index.js";
import { decrypt } from "../helpers/encryptionHelper.js";
import { handleAPIRequest } from "../helpers/handleAPIRequest.js";
import { generateAccessToken } from "../schema/TrueLayer/AuthToken/resolverGenerateAccessToken.js";

export function dataAuthCodeDecryptHandler() {
  return async (req, res) => {
    const { authCode } = req.body;
    const decryptedCode = decrypt(authCode, "authLink");
    logger.info("decryptedCode: ", decryptedCode);

    // Instantiate the tlAccessTokenAPI
    const tlAccessTokenAPI = new tlAccessTokenAPIClass(handleAPIRequest, {
      cache: null,
      token: "",
    });

    //Generate the access token using the resolver code to go here  - arguements scope, grant_type, redirect_uri, code
    const tokenResponse = await generateAccessToken(
      null,
      {
        scope: "",
        grant_type: "refresh_token",
        redirect_uri: "",
        refresh_token: decryptedCode,
      },
      { dataSources: { tlAccessTokenAPI }, logger }
    );

    res.json({ tokenResponse });
  };
}
