export const queries = `
###Bank account data
"Retrieve all bank accounts"
bankAccounts: [BankAccount]!

"Retrieve specific bank account passing account_id"
bankAccount(id: ID!): BankAccount!

###Bank account transactions
"Retrieve account accout balance"
bankAccountBalance(id: ID!): BankAccountBalance!

"Retrieve bank account transactions"
bankAccountTransactions(id: ID!): [BankAccountTransaction!]

"Retrieve pending transactions for account"
bankAccountPendingTransactions(id: ID!): [BankAccountTransaction!]

"Retrieve direct debits linked to an account"
bankAccountDirectDebits(id: ID!): [DirectDebit]

"Retrieve standing orders linked to an account"
bankAccountStandingOrders(id: ID!): [StandingOrder]
`;
