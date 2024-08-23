export const userBankDataStore = {}; // Temporary in-memory store for results (demo purposes only)

export function storeTaskMetadata(taskId, dataApiType) {
  userBankDataStore[taskId] = { type: dataApiType, data: [] };
}

export const updateUserDataStore = (taskId, data) => {
  userBankDataStore[taskId].data = data;
};
