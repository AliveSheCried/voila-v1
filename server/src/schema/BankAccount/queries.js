export const queries = `
###Bank account data
"Retrieve all bank accounts"
bankAccounts: [BankAccount]!

"Retrieve specific bank account passing account_id"
bankAccount(id: ID!): BankAccount!
`;
