import { merchantAccount } from "../../../../schema/TrueLayer/MerchantAccounts/resolverMerchantAccount.js";

jest.mock("../../../../datasources/trueLayer/tlMerchantAccount_api.js", () => ({
  tlMerchantAccountAPI: {
    getMerchantAccount: jest.fn(),
  },
}));

describe("merchantAccounts resolver", () => {
  it("fetches a single merchant account using an id and returns it in correct format", async () => {
    const mockToken = "test-token";
    const mockDataSources = {
      tlMerchantAccountAPI: {
        getMerchantAccount: jest.fn(() =>
          Promise.resolve({
            items: [{ id: 1, name: "Account 1" }],
          })
        ),
      },
    };

    const result = await merchantAccount(
      {},
      { id: 1 },
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(
      mockDataSources.tlMerchantAccountAPI.getMerchantAccount
    ).toHaveBeenCalledWith(1, mockToken);
    expect(result).toEqual({ items: [{ id: 1, name: "Account 1" }] });
  });

  // This test is to be reviewed and updated - need to confirm what the API returns if no data is found
  it("throws an error if data is not found", async () => {
    const mockToken = "test-token";
    const mockDataSources = {
      tlMerchantAccountAPI: {
        getMerchantAccount: jest.fn(() =>
          Promise.resolve({
            items: null,
          })
        ),
      },
    };

    await expect(
      merchantAccount(
        {},
        { id: 1 },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("No data found for the ID provided!");
  });
});
