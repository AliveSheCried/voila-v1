import { bankAccountTransactionsResolvers } from "../../../../schema/TrueLayer/BankAccount/resolverBankAccountTransactions";

jest.mock("../../../../datasources/trueLayer/tlData_api.js", () => ({
  tlDataAPI: {
    getBankAccountTransactions: jest.fn(),
    getBankAccountPendingTransactions: jest.fn(),
  },
}));

describe("bankAccountTransactions resolver", () => {
  let mockToken, mockDataSources;

  beforeAll(() => {
    mockToken = "test-token";
    mockDataSources = {
      tlDataAPI: {
        getBankAccountTransactions: jest.fn(() =>
          Promise.resolve({
            results: [
              {
                transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
                timestamp: "2020-04-06T00:00:00",
                description: "Tesco",
                transaction_type: "DEBIT",
                transaction_category: "PURCHASE",
                transaction_classification: ["Shopping", "Food"],
                amount: -21.5,
                currency: "GBP",
                transaction_classification: ["Shopping", "Food"],
                merchant_name: "Tesco",
                meta: {
                  provider_transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
                  provider_source: "TRANSACTION_HISTORY",
                  provider_account_id: "5e8b0d7c6d55c2681c0f0b8f",
                },
              },
              {
                transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
                timestamp: "2020-04-06T00:00:00",
                description: "Tesco",
                transaction_type: "DEBIT",
                transaction_category: "PURCHASE",
                transaction_classification: ["Shopping", "Food"],
                amount: -21.5,
                currency: "GBP",
                transaction_classification: ["Shopping", "Food"],
                merchant_name: "Tesco",
                meta: {
                  provider_transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
                  provider_source: "TRANSACTION_HISTORY",
                  provider_account_id: "5e8b0d7c6d55c2681c0f0b8f",
                },
              },
            ],
          })
        ),
        getBankAccountPendingTransactions: jest.fn(() =>
          Promise.resolve({
            results: [
              {
                transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
                timestamp: "2020-04-06T00:00:00",
                description: "Tesco",
                transaction_type: "DEBIT",
                transaction_category: "PURCHASE",
                transaction_classification: ["Shopping", "Food"],
                amount: -21.5,
                currency: "GBP",
                transaction_classification: ["Shopping", "Food"],
                merchant_name: "Tesco",
                meta: {
                  provider_transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
                  provider_source: "TRANSACTION_HISTORY",
                  provider_account_id: "5e8b0d7c6d55c2681c0f0b8f",
                },
              },
              {
                transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
                timestamp: "2020-04-06T00:00:00",
                description: "Tesco",
                transaction_type: "DEBIT",
                transaction_category: "PURCHASE",
                transaction_classification: ["Shopping", "Food"],
                amount: -21.5,
                currency: "GBP",
                transaction_classification: ["Shopping", "Food"],
                merchant_name: "Tesco",
                meta: {
                  provider_transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
                  provider_source: "TRANSACTION_HISTORY",
                  provider_account_id: "5e8b0d7c6d55c2681c0f0b8f",
                },
              },
            ],
          })
        ),
      },
    };
  });

  /* 
        
        This test suite does not include a test for transactions.  Like resolverMerchantAccountTransactions.test.js, it failed with a scoping error that I was unable to resolve. ChatGPT suggested changing the entire server code to make it work, but that was beyond me and it(!) at the time.  It can't be a coincidence that both tests attempt to mock connecting to MongoDB Atlas, so I suspect that is the issue.  

        */

  //Happy path - fetch pending transactions
  it("fetches pending transactions", async () => {
    const response =
      await bankAccountTransactionsResolvers.bankAccountPendingTransactions(
        null,
        { token: mockToken },
        { dataSources: mockDataSources }
      );
    expect(response).toEqual([
      {
        transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
        timestamp: "2020-04-06T00:00:00",
        description: "Tesco",
        transaction_type: "DEBIT",
        transaction_category: "PURCHASE",
        transaction_classification: ["Shopping", "Food"],
        amount: -21.5,
        currency: "GBP",
        transaction_classification: ["Shopping", "Food"],
        merchant_name: "Tesco",
        meta: {
          provider_transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
          provider_source: "TRANSACTION_HISTORY",
          provider_account_id: "5e8b0d7c6d55c2681c0f0b8f",
        },
      },
      {
        transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
        timestamp: "2020-04-06T00:00:00",
        description: "Tesco",
        transaction_type: "DEBIT",
        transaction_category: "PURCHASE",
        transaction_classification: ["Shopping", "Food"],
        amount: -21.5,
        currency: "GBP",
        transaction_classification: ["Shopping", "Food"],
        merchant_name: "Tesco",
        meta: {
          provider_transaction_id: "5e8b0d7c6d55c2681c0f0b8f",
          provider_source: "TRANSACTION_HISTORY",
          provider_account_id: "5e8b0d7c6d55c2681c0f0b8f",
        },
      },
    ]);
  });

  //Happy path - no pending transactions found
  it("returns an empty array if no pending transactions found", async () => {
    mockDataSources.tlDataAPI.getBankAccountPendingTransactions.mockImplementationOnce(
      () =>
        Promise.resolve({
          results: [],
        })
    );
    const response =
      await bankAccountTransactionsResolvers.bankAccountPendingTransactions(
        null,
        { token: mockToken },
        { dataSources: mockDataSources }
      );
    expect(response).toEqual([]);
  });
});
