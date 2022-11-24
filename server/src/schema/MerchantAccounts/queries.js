export const queries = `
    "Return list of merchant accounts"
    merchantAccounts: [MerchantAccounts]!

    "Return individual merchant account"
    merchantAccountDetail(id: ID!): MerchantAccountDetail!
`;
