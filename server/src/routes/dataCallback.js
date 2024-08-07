import logger from "../config/logger.js";
import { TLAccessTokenAPI as tlAccessTokenAPIClass } from "../datasources/truelayer/index.js";
import { encrypt } from "../helpers/encryptionHelper.js";
import { handleAPIRequest } from "../helpers/handleAPIRequest.js";
import { User } from "../models/User.js";
import { generateAccessToken } from "../schema/TrueLayer/AuthToken/resolverGenerateAccessToken.js";
import { tempStorage } from "./dataAuthLink.js";

export function dataCallbackHandler() {
  return async (req, res) => {
    try {
      const { code } = req.body; // Extract the code from the request body
      logger.info("Received code from TrueLayer:", code);

      // Check if the code is present in the request body
      if (!code) {
        logger.error("Code not found in the request body.");
        return res
          .status(400)
          .json({ error: "Code not found in the request body." });
      }

      // Find the user ID from the temporary storage
      const userIds = Object.keys(tempStorage);
      const userId = userIds[0];

      // Instantiate the tlAccessTokenAPI
      const tlAccessTokenAPI = new tlAccessTokenAPIClass(handleAPIRequest, {
        cache: null,
        token: "",
      });

      logger.info("Requesting access token with the following parameters:");
      logger.info(`scope: data`);
      logger.info(`grant_type: authorization_code`);
      logger.info(`redirect_uri: http://localhost:4000/data/callback`);
      logger.info(`code: ${code}`);

      //Generate the access token using the resolver code to go here  - arguements scope, grant_type, redirect_uri, code
      const tokenResponse = await generateAccessToken(
        null,
        {
          scope: "data",
          grant_type: "authorization_code",
          redirect_uri: "http://localhost:4000/data/callback",
          code,
        },
        { dataSources: { tlAccessTokenAPI }, logger }
      );

      //extract the refresh token from the token response to encrypt and store in the database
      const { refresh_token } = tokenResponse;

      // Encrypt the code
      const { encryptedData, iv } = encrypt(refresh_token, "authLink");

      // Save the encrypted refresh token to the database using user_id
      await User.findOneAndUpdate(
        { user_id: userId },
        {
          auth_code: {
            iv: iv,
            encryptedData: encryptedData,
          },
        }
      );

      // Store the data token temporarily (e.g., in session or in-memory storage)
      tempStorage[userId] = { tokenResponse };
      logger.info("TempStorage after dataCallbackHandler:", tempStorage);

      // Respond with a script to close the window
      res.send(`
        <html>
          <body>
            <script>
              window.opener.postMessage('authorizationComplete', '*');
              window.close();
            </script>
          </body>
        </html>
      `);
    } catch (error) {
      console.error("Error in dataCallbackHandler:", error);
      res.status(500).send("Internal Server Error");
    }
  };
}
