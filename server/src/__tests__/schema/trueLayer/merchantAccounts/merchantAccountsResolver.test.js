import { merchantAccounts } from "../../../../schema/TrueLayer/MerchantAccounts/resolverMerchantAccounts.js";

jest.mock("../../../../datasources/trueLayer/tlMerchantAccount_api.js", () => ({
  tlMerchantAccountAPI: {
    getMerchantAccounts: jest.fn(),
  },
}));

describe("merchantAccounts resolver", () => {
  it("fetches merchant accounts and returns them in correct format", async () => {
    const mockToken = "test-token";
    const mockDataSources = {
      tlMerchantAccountAPI: {
        getMerchantAccounts: jest.fn(() =>
          Promise.resolve({
            items: [
              { id: 1, name: "Account 1" },
              { id: 2, name: "Account 2" },
            ],
          })
        ),
      },
    };

    const result = await merchantAccounts(
      {},
      {},
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(
      mockDataSources.tlMerchantAccountAPI.getMerchantAccounts
    ).toHaveBeenCalledWith(mockToken);
    expect(result).toEqual([
      { id: 1, name: "Account 1" },
      { id: 2, name: "Account 2" },
    ]);
  });

  it("throws an error if data is not found", async () => {
    const mockToken = "test-token";
    const mockDataSources = {
      tlMerchantAccountAPI: {
        getMerchantAccounts: jest.fn(() =>
          Promise.resolve({
            items: null,
          })
        ),
      },
    };

    await expect(
      merchantAccounts(
        {},
        {},
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("No data found or data format not as expected!");
  });
});
