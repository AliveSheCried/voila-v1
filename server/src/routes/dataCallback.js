import { encrypt } from "../helpers/encryptionHelper.js";
import { User } from "../models/User.js";
import { tempStorage } from "./dataAuthLink.js";

export function dataCallbackHandler() {
  return async (req, res) => {
    try {
      const { code } = req.body; // Extract the code from the request body
      console.log("auth code:", code);

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

      // Save the encrypted code to the database
      await User.findByIdAndUpdate(userId, {
        auth_code: {
          iv: iv,
          encryptedData: encryptedData,
        },
      });

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
