import { tempStorage } from "./dataAuthLink.js";

export function getDataTokenHandler() {
  return async (req, res) => {
    // Find the user ID from the temporary storage
    const userIds = Object.keys(tempStorage);
    const userId = userIds[0];

    if (!userId || !tempStorage[userId] || !tempStorage[userId].dataToken) {
      return res.status(400).json({ error: "Data token not found" });
    }

    // Access the tokenResponse from tempStorage using userId
    const dataToken = tempStorage[userId].tokenResponse;

    // Optionally, remove the token from temporary storage after retrieval
    delete tempStorage[userId];

    // Send the dataToken as a JSON response
    res.json({ dataToken });
  };
}
