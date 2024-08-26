import axios from "axios";
import { updateUserDataStore } from "../helpers/webhookDataHelper.js";
import { tempUserDataToken } from "../schema/TrueLayer/BankAccount/resolverBankAccounts.js";

export const dataWebhookHandler = () => async (req, res) => {
  try {
    const { task_id, status, results_uri } = req.body;

    if (!task_id || !status || !results_uri) {
      throw new Error("Invalid webhook payload");
    }

    console.log("object task_id", task_id),
      console.log("object status", status),
      console.log("object results_uri", results_uri);

    if (status === "Succeeded") {
      // Fetch the results using the token from temporary storage
      const resultsResponse = await axios.get(results_uri, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tempUserDataToken}`, // Use the stored token
        },
      });

      const results = resultsResponse.data.results;
      console.log("object results", results);

      updateUserDataStore(task_id, results); // Update data key of temporary store with the results

      res.status(200).send("Data successfully retrieved and processed.");
    } else {
      res
        .status(200)
        .send(`Task ${task_id} is still in progress or has failed.`);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).send("Error processing webhook.");
  }
};
