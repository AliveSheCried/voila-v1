export const queries = `
    "Return list of merchant accounts"
    merchantAccounts: [MerchantAccount]!

    "Return individual merchant account"
    merchantAccount(id: ID!): MerchantAccount!

    "Return transactions from individual merchant account"
    merchantAccountTransactions(id: ID!, fromDate: String!, toDate: String!): [MerchantAccountTransactions!]
`;
