import { payoutDetail } from "../../../../schema/TrueLayer/MerchantAccountPayout/resolverPayoutDetail";

jest.mock("../../../../datasources/trueLayer/tlPayout_api.js", () => ({
  tlPayoutAPI: {
    getPayoutDetail: jest.fn(),
  },
}));

describe("payoutDetail resolver", () => {
  let mockToken, mockDataSources;

  beforeEach(() => {
    mockToken = "test-token";
    mockDataSources = {
      tlPayoutAPI: require("../../../../datasources/trueLayer/tlPayout_api.js")
        .tlPayoutAPI,
    };
  });

  it("calls tlPayoutAPI.getPayoutDetail with correct arguments", async () => {
    mockDataSources.tlPayoutAPI.getPayoutDetail.mockImplementation(() =>
      Promise.resolve({ items: [{ id: 1, name: "Account 1" }] })
    );

    await payoutDetail(
      {},
      { id: 1 },
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(mockDataSources.tlPayoutAPI.getPayoutDetail).toHaveBeenCalledWith(
      1,
      mockToken
    );
  });

  it("returns correct data when tlPayoutAPI.getPayoutDetail resolves", async () => {
    mockDataSources.tlPayoutAPI.getPayoutDetail.mockImplementation(() =>
      Promise.resolve({ items: [{ id: 1, name: "Account 1" }] })
    );

    const result = await payoutDetail(
      {},
      { id: 1 },
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(result).toEqual({ items: [{ id: 1, name: "Account 1" }] });
  });

  it("throws an error when tlPayoutAPI.getPayoutDetail rejects", async () => {
    mockDataSources.tlPayoutAPI.getPayoutDetail.mockImplementation(() =>
      Promise.reject(new Error("API call failed"))
    );

    await expect(
      payoutDetail(
        {},
        { id: 1 },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Failed to retrieve payout detail with ID 1");
  });

  it("throws an error when tlPayoutAPI.getPayoutDetail resolves with no data", async () => {
    mockDataSources.tlPayoutAPI.getPayoutDetail.mockImplementation(() =>
      Promise.resolve(null)
    );

    await expect(
      payoutDetail(
        {},
        { id: 1 },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("No data found for the ID provided!");
  });
});
