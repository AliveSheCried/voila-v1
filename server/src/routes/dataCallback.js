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
      // Check if the code is present in the request body
      if (!code) {
        console.log("Code not found in the request body.");
        return res
          .status(400)
          .json({ error: "Code not found in the request body." });
      }

      // Encrypt the code
      const { encryptedData, iv } = encrypt(code, "authLink");

      // Find the user ID from the temporary storage
      const userIds = Object.keys(tempStorage);
      const userId = userIds[0];

      // Save the encrypted code to the database using user_id
      await User.findOneAndUpdate(
        { user_id: userId },
        {
          auth_code: {
            iv: iv,
            encryptedData: encryptedData,
          },
        }
      );

      // Instantiate the tlAccessTokenAPI
      const tlAccessTokenAPI = new tlAccessTokenAPIClass(handleAPIRequest, {
        cache: null,
        token: "",
      });

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

      // Store the data token temporarily (e.g., in session or in-memory storage)
      tempStorage[userId] = { tokenResponse };
      console.log("tempStorage", tempStorage);

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
