import { merchantAccountTransactions } from "../../../../schema/TrueLayer/MerchantAccounts/resolverMerchantAccountTransactions.js"; // Import the resolver function to test

const mockFind = jest.fn();
const mockInsertMany = jest.fn();
// Test code...
const mockDb = {
  collection: jest.fn().mockReturnValue({
    find: mockFind,
    insertMany: mockInsertMany,
  }),
};

const mockDbClient = {
  db: jest.fn().mockReturnValue(mockDb),
};

// Before all tests
beforeAll(() => {
  global.dbClient = mockDbClient;
});

const mockToken = "test-token";

// Mock Truelayer API
const mockGetMerchantAccountTransactions = jest.fn();
const dataSources = {
  tlMerchantAccountAPI: {
    getMerchantAccountTransactions: mockGetMerchantAccountTransactions,
  },
};

// Your test data goes here
const mockApiTransactions = [
  {
    type: "payout",
    id: "9748b5f1-7b71-45a7-8d4e-e8dd0f358a86",
    currency: "GBP",
    amount_in_minor: 980,
    status: "executed",
    created_at: "2023-06-15T19:52:40.575780Z",
    executed_at: "2023-06-15T19:52:42.483Z",
    beneficiary: {
      type: "external_account",
      account_holder_name: "KingBOB",
      account_identifier: {
        type: "sort_code_account_number",
        sort_code: "560029",
        account_number: "26207729",
      },
      account_identifiers: [
        {
          type: "sort_code_account_number",
          sort_code: "560029",
          account_number: "26207729",
        },
        {
          type: "iban",
          iban: "GB10NWBK56002926207729",
        },
      ],
      reference: "15JUN23",
    },
    context_code: "withdrawal",
    payout_id: "9748b5f1-7b71-45a7-8d4e-e8dd0f358a86",
  },
  {
    type: "payout",
    id: "1676d320-efd7-43af-a336-133b73c074b9",
    currency: "GBP",
    amount_in_minor: 27,
    status: "executed",
    created_at: "2022-12-27T10:55:07.701277Z",
    executed_at: "2022-12-27T10:55:09.067Z",
    beneficiary: {
      type: "external_account",
      account_holder_name: "John Smith",
      account_identifier: {
        type: "sort_code_account_number",
        sort_code: "040668",
        account_number: "00000871",
      },
      account_identifiers: [
        {
          type: "sort_code_account_number",
          sort_code: "040668",
          account_number: "00000871",
        },
        {
          type: "iban",
          iban: "GB75CLRB04066800000871",
        },
      ],
      reference: "Reference Exmample",
    },
    context_code: "withdrawal",
    payout_id: "1676d320-efd7-43af-a336-133b73c074b9",
  },
];
const mockDbTransactions = [
  {
    type: "payout",
    id: "dec32c60-a0eb-4355-9741-fa3cba291cac",
    currency: "GBP",
    amount_in_minor: 50000,
    status: "executed",
    created_at: "2022-12-27T11:11:38.636461Z",
    executed_at: "2022-12-27T11:11:40.103Z",
    beneficiary: {
      type: "external_account",
      account_holder_name: "VoilaTestMerchant",
      account_identifier: {
        type: "sort_code_account_number",
        sort_code: "040668",
        account_number: "00000871",
      },
      account_identifiers: [
        {
          type: "sort_code_account_number",
          sort_code: "040668",
          account_number: "00000871",
        },
        {
          type: "iban",
          iban: "GB75CLRB04066800000871",
        },
      ],
      reference: "TestPayout 02",
    },
    context_code: "withdrawal",
    payout_id: "dec32c60-a0eb-4355-9741-fa3cba291cac",
  },
];
const mockNewTransactions = [
  {
    type: "merchant_account_payment",
    id: "f943fdb1-a25b-4842-8f19-8cc060f8edc4",
    currency: "GBP",
    amount_in_minor: 1,
    status: "settled",
    settled_at: "2022-10-29T18:02:01.640Z",
    payment_source: {
      id: "080ad87d-0d14-40cf-99c9-efb23b3d589a",
      account_holder_name: "JOHN SANDBRIDGE",
      account_identifiers: [
        {
          type: "sort_code_account_number",
          sort_code: "040668",
          account_number: "00000871",
        },
        {
          type: "iban",
          iban: "GB75CLRB04066800000871",
        },
      ],
      user_id: "4ebf6f44-f8a7-4647-8a39-a546a0b4d962",
    },
    payment_id: "ce02bcbb-0b9d-49ad-a5bf-5da20a75c9ea",
  },
];

describe("merchantAccountTransactions", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock calls before each test
  });

  it("should throw an error if there is no database client", async () => {
    global.dbClient = null;
    await expect(
      merchantAccountTransactions(
        { id: "dummyId", fromDate: "dummyFromDate", toDate: "dummyToDate" },
        { dataSources },
        mockToken
      )
    ).rejects.toThrow("No database client");
  });

  it("should throw an error if no transactions found", async () => {
    mockGetMerchantAccountTransactions.mockResolvedValueOnce({ items: null });
    await expect(
      merchantAccountTransactions(
        null,
        { id: "dummyId", fromDate: "dummyFromDate", toDate: "dummyToDate" },
        { token: mockToken, dataSources, dbClient: mockDbClient }
      )
    ).rejects.toThrow(
      "No transactions for the date range dummyFromDate to dummyToDate found"
    );

    mockGetMerchantAccountTransactions.mockResolvedValueOnce({ items: [] });
    await expect(
      merchantAccountTransactions(
        null,
        { id: "dummyId", fromDate: "dummyFromDate", toDate: "dummyToDate" },
        { token: mockToken, dataSources, dbClient: mockDbClient }
      )
    ).rejects.toThrow(
      "No transactions for the date range dummyFromDate to dummyToDate found"
    );
  });

  it("should return all transactions if there are no new transactions", async () => {
    mockFind.mockResolvedValueOnce(mockDbTransactions);
    mockGetMerchantAccountTransactions.mockResolvedValueOnce({
      items: mockApiTransactions,
    });
    const result = await merchantAccountTransactions(
      null,
      { id: "dummyId", fromDate: "dummyFromDate", toDate: "dummyToDate" },
      { token: mockToken, dataSources, dbClient: mockDbClient }
    );
    expect(result).toEqual(mockDbTransactions);
  });

  // Test case for new transactions
  it("should insert new transactions into the database", async () => {
    mockFind.mockResolvedValueOnce(mockDbTransactions);
    const newTransactionsCount = 3; // The number of new transactions
    mockInsertMany.mockResolvedValueOnce({
      insertedCount: newTransactionsCount,
    });
    // Simulate API response with new transactions
    mockGetMerchantAccountTransactions.mockResolvedValueOnce({
      items: [...mockApiTransactions, ...mockNewTransactions],
    });
    const result = await merchantAccountTransactions(
      null,
      { id: "dummyId", fromDate: "dummyFromDate", toDate: "dummyToDate" },
      { token: mockToken, dataSources, dbClient: mockDbClient }
    );
    expect(result.length).toBe(
      mockApiTransactions.length + newTransactionsCount
    );
  });
});
