const types = `
###Types
"External bank account"
type BankAccount {
    account_id: ID!
    account_type: String!
    display_name: String!
    currency: String!
    account_number: AccountNumber!
    provider: Provider!
}

"Account number sub-type"
type AccountNumber {
    iban: String!
    swift_bic: String!
    number: String
    sort_code: String
}

"Provider - Bank where account is held"
type Provider {
    display_name: String!
    provider_id: String!
    logo_uri: String
}

`;

export default types;
