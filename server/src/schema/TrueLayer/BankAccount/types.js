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
    provider_id: ID!
    logo_uri: String
}

"Initial status of the data fetch"
type InitialStatus {
    status: String!
    message: String
}

"Union type for the result of getDataAccounts"
union GetDataAccountsResult = InitialStatus | BankAccounts

"Union type for the result of getDirectDebits"
union GetDirectDebitsResult = InitialStatus | DirectDebits

"Union type for the result of getStandingOrders"
union GetStandingOrdersResult = InitialStatus | StandingOrders

"Array of bank accounts"
type BankAccounts {
    accounts: [BankAccount!]!
}

"Array of direct debits"
type DirectDebits {
    directDebits: [DirectDebit!]!
}

"Array of standing orders"
type StandingOrders {
    standingOrders: [StandingOrder!]!
}

"Account balance"
type BankAccountBalance {
    currency: String!
    available: Float!
    current: Float!
    overdraft: Float!
    update_timestamp: String!
}

"Transactions against a bank account"
type BankAccountTransaction {
    timestamp: String!
    description: String
    transaction_type: String!
    transaction_category: String!
    transaction_classification:[String]
    amount: Float!
    currency: String!
    transaction_id: String!
    provider_transaction_id: ID!
    normalised_provider_transaction_id: String!
    running_balance: RunningBalance
    meta: Meta
}

"List of direct debits for an account"
type DirectDebit {
    direct_debit_id: ID!
    timestamp: String!
    name: String!
    status: String
    previous_payment_amount: Float
    currency: String
    meta: Meta
}

"List of standing orders for an account"
type StandingOrder {
    frequency: String!
    status: String!
    timestamp: String!
    currency: String!
    meta: Meta
    next_payment_date: String
    next_payment_amount: Float
    first_payment_date: String!
    first_payment_amount: Float!
    final_payment_date: String!
    final_payment_amount: Float!
    reference: String
}

"Balance of account at the time of transaction"
type RunningBalance {
    currency: String
    amount: Float   
}

"Transaction metadata"
type Meta {
    provider_transaction_category: String 
    provider_account_id: ID
    provider_mandate_identification: String
    provider_standing_order_id: String
}

`;

export default types;
