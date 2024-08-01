const authLink = process.env.TL_DATA_AUTH_LINK;
const tempStorage = {};

export function dataAuthLinkHandler(userId, res) {
  if (!authLink) {
    console.log("Auth link is not set in the environment variables.");
    return res.status(500).json({ error: "Auth link not configured" });
  }

  tempStorage[userId] = authLink; // Store the auth link temporarily
  res.json({ authLink: authLink }); // Return the auth link in JSON format
}

export { tempStorage };
