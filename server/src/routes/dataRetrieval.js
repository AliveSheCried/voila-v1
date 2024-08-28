import { userBankDataStore } from "../helpers/webhookDataHelper.js";

export const retrieveDataHandler = (dataType) => async (req, res) => {
  try {
    let dataFound = false;

    // Iterate over the keys of userBankDataStore
    for (const taskId in userBankDataStore) {
      if (userBankDataStore.hasOwnProperty(taskId)) {
        const userData = userBankDataStore[taskId];
        // console.log("userData", userData);
        // Check if the type matches the dataType
        if (userData.type === dataType) {
          const { accountData } = userData;
          res.status(200).send(accountData);
          dataFound = true;
          break;
        }
      }
    }

    // If no matching data was found, send a 404 response
    if (!dataFound) {
      res.status(404).send("Data not found.");
    }
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).send("Error retrieving data.");
  }
};

// userBankDataStore[taskId] = {
//   type: dataApiType, // e.g., "bankAccounts", "directDebits"
//   accountData: {
//     allAccounts: [], // For data that doesn't relate to a specific accountId
//     [id]: [], // id is the accountId, and the array holds the data for that account
//   },
// };
// }
