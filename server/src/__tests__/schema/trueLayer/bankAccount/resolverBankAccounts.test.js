import { bankAccountResolvers } from "../../../../schema/TrueLayer/BankAccount/resolverBankAccounts";

jest.mock("../../../../datasources/trueLayer/tlData_api.js", () => ({
  tlDataAPI: {
    getBankAccounts: jest.fn(),
    getBankAccount: jest.fn(),
  },
}));

describe("bankAccounts resolver", () => {
  let mockToken, mockDataSources;

  beforeAll(() => {
    mockToken = "test-token";
    mockDataSources = {
      tlDataAPI: {
        getBankAccounts: jest.fn(() =>
          Promise.resolve({
            results: [
              { id: 1, name: "Account 1" },
              { id: 2, name: "Account 2" },
            ],
          })
        ),
        getBankAccount: jest.fn(() =>
          Promise.resolve({
            results: [{ id: 1, name: "Account 1" }],
          })
        ),
      },
    };
  });

  //Happy path - fetch all bank accounts
  it("fetches all bank accounts and returns them in correct format", async () => {
    const result = await bankAccountResolvers.bankAccounts(
      {},
      {},
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(mockDataSources.tlDataAPI.getBankAccounts).toHaveBeenCalledWith(
      mockToken
    );
    expect(result).toEqual([
      { id: 1, name: "Account 1" },
      { id: 2, name: "Account 2" },
    ]);
  });

  //Happy path - fetch specific bank account
  it("fetches specific bank account and returns it in correct format", async () => {
    const result = await bankAccountResolvers.bankAccount(
      {},
      { id: 1 },
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(mockDataSources.tlDataAPI.getBankAccount).toHaveBeenCalledWith(
      1,
      mockToken
    );
    expect(result).toEqual({ id: 1, name: "Account 1" });
  });

  //Error path - fetch all bank accounts
  it("throws an error when no data is returned", async () => {
    mockDataSources.tlDataAPI.getBankAccounts.mockImplementationOnce(() =>
      Promise.resolve({
        results: null,
      })
    );

    await expect(
      bankAccountResolvers.bankAccounts(
        {},
        {},
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("No data found or data format not as expected!");
  });

  //Error path - fetch specific bank account
  it("throws an error when no data is returned", async () => {
    mockDataSources.tlDataAPI.getBankAccount.mockImplementationOnce(() =>
      Promise.resolve({
        results: null,
      })
    );

    await expect(
      bankAccountResolvers.bankAccount(
        {},
        { id: 1 },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("No data found for the ID provided!");
  });
});
