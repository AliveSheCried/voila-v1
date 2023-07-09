import { bankAccountDataResolvers } from "../../../../schema/TrueLayer/BankAccount/resolverBankAccountData";

jest.mock("../../../../datasources/trueLayer/tlData_api.js", () => ({
  tlDataAPI: {
    getBankAccountBalance: jest.fn(),
    getBankAccountDirectDebits: jest.fn(),
    getBankAccountStandingOrders: jest.fn(),
  },
}));

describe("bankAccountData resolver", () => {
  let mockToken, mockDataSources;

  beforeAll(() => {
    mockToken = "test-token";
    mockDataSources = {
      tlDataAPI: {
        getBankAccountBalance: jest.fn(() =>
          Promise.resolve({
            results: [
              { currency: "GBP", available: 100, current: 100, overdraft: 0 },
            ],
          })
        ),
        getBankAccountDirectDebits: jest.fn(() =>
          Promise.resolve({
            results: [
              {
                direct_debit_id: "004ea8ce16b6ff57090b7bf8c7b483a1",
                status: "Active",
              },
              {
                direct_debit_id: "8e5dfbc5b4d66c8aff248e9ca6440c55",
                status: "Active",
              },
            ],
          })
        ),
        getBankAccountStandingOrders: jest.fn(() =>
          Promise.resolve({
            results: [
              { frequency: "IntrvlMnthDay:01:26", status: "Active" },
              { frequency: "IntrvlMnthDay:01:30s", status: "Active" },
            ],
          })
        ),
      },
    };
  });

  //Happy path - fetch bank account balance
  it("fetches bank account balance and returns it in correct format", async () => {
    const result = await bankAccountDataResolvers.bankAccountBalance(
      {},
      { id: 1 },
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(
      mockDataSources.tlDataAPI.getBankAccountBalance
    ).toHaveBeenCalledWith(1, mockToken);
    expect(result).toEqual({
      currency: "GBP",
      available: 100,
      current: 100,
      overdraft: 0,
    });
  });

  //Happy path - fetch bank account direct debits
  it("fetches bank account direct debits and returns them in correct format", async () => {
    const result = await bankAccountDataResolvers.bankAccountDirectDebits(
      {},
      { id: 1 },
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(
      mockDataSources.tlDataAPI.getBankAccountDirectDebits
    ).toHaveBeenCalledWith(1, mockToken);
    expect(result).toEqual([
      {
        direct_debit_id: "004ea8ce16b6ff57090b7bf8c7b483a1",
        status: "Active",
      },
      {
        direct_debit_id: "8e5dfbc5b4d66c8aff248e9ca6440c55",
        status: "Active",
      },
    ]);
  });

  //Happy path - fetch bank account standing orders
  it("fetches bank account standing orders and returns them in correct format", async () => {
    const result = await bankAccountDataResolvers.bankAccountStandingOrders(
      {},
      { id: 1 },
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(
      mockDataSources.tlDataAPI.getBankAccountStandingOrders
    ).toHaveBeenCalledWith(1, mockToken);
    expect(result).toEqual([
      { frequency: "IntrvlMnthDay:01:26", status: "Active" },
      { frequency: "IntrvlMnthDay:01:30s", status: "Active" },
    ]);
  });

  //Error path - fetch bank account balance
  it("throws an error when bank account balance cannot be fetched", async () => {
    mockDataSources.tlDataAPI.getBankAccountBalance.mockImplementationOnce(() =>
      Promise.reject(new Error("No data found for the ID provided!"))
    );

    await expect(
      bankAccountDataResolvers.bankAccountBalance(
        {},
        { id: 1 },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("No data found for the ID provided!");
  });

  //Error path - fetch bank account direct debits
  it("throws an error when bank account direct debits cannot be fetched", async () => {
    mockDataSources.tlDataAPI.getBankAccountDirectDebits.mockImplementationOnce(
      () =>
        Promise.reject(
          new Error("No data found or data format not as expected!")
        )
    );

    await expect(
      bankAccountDataResolvers.bankAccountDirectDebits(
        {},
        { id: 1 },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("No data found or data format not as expected!");
  });

  //Error path - fetch bank account standing orders
  it("throws an error when bank account standing orders cannot be fetched", async () => {
    mockDataSources.tlDataAPI.getBankAccountStandingOrders.mockImplementationOnce(
      () =>
        Promise.reject(
          new Error("No data found or data format not as expected!")
        )
    );

    await expect(
      bankAccountDataResolvers.bankAccountStandingOrders(
        {},
        { id: 1 },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("No data found or data format not as expected!");
  });
});
