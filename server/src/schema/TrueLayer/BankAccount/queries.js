export const queries = `
###Bank account data
"Retrieve all bank accounts"
getDataAccounts: GetDataAccountsResult!

"Retrieve specific bank account passing account_id"
bankAccount(id: ID!): BankAccount!

###Bank account transactions
"Retrieve account accout balance"
bankAccountBalance(id: ID!): GetBankAccountBalanceResult!

"Retrieve bank account transactions; date format is ISO 8601 Date and time format (YYYY-MM-DDTHH:mm:ss.sssZ)"
bankAccountTransactions(id: ID!, fromDate: String, toDate: String): GetBankAccountTransactionsResult!

"Retrieve pending transactions for account"
bankAccountPendingTransactions(id: ID!): [BankAccountTransaction!]

"Retrieve direct debits linked to an account"
bankAccountDirectDebits(id: ID!): GetDirectDebitsResult!

"Retrieve standing orders linked to an account"
bankAccountStandingOrders(id: ID!): GetStandingOrdersResult!
`;

//"Retrieve all bank accounts"
//bankAccounts: [BankAccount]!
