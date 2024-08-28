export const userBankDataStore = {}; // Temporary in-memory store for results (demo purposes only)

export function storeTaskMetadata(taskId, dataApiType, id = "") {
  userBankDataStore[taskId] = {
    type: dataApiType, // e.g., "bankAccounts", "directDebits"
    accountData: {
      allAccounts: [], // For data that doesn't relate to a specific accountId
      [id]: [], // id is the accountId, and the array holds the data for that account
    },
  };
}

export const updateUserDataStore = (taskId, accountId, data) => {
  // Use "allAccounts" as a special key when accountId is null or undefined
  const key = accountId || "allAccounts";

  // if (!userBankDataStore[taskId].accountData[key]) {
  //   userBankDataStore[taskId].accountData[key] = [];
  // }

  userBankDataStore[taskId].accountData[key].push(...data);
};
