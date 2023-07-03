import { payoutDetail } from "../../../../schema/TrueLayer/MerchantAccountPayout/resolverPayoutDetail";

jest.mock("../../../../datasources/trueLayer/tlPayout_api.js", () => ({
  tlPayoutAPI: {
    getPayoutDetail: jest.fn(),
  },
}));

describe("payoutDetail resolver", () => {
  let mockToken, mockDataSources;

  beforeAll(() => {
    mockToken = "test-token";
    mockDataSources = {
      tlPayoutAPI: require("../../../../datasources/trueLayer/tlPayout_api.js")
        .tlPayoutAPI,
    };
  });

  it("fetches a single payout's detail using an id and returns it in correct format", async () => {
    mockDataSources.tlPayoutAPI.getPayoutDetail.mockImplementation(() =>
      Promise.resolve({
        items: [{ id: 1, name: "Account 1" }],
      })
    );

    const result = await payoutDetail(
      {},
      { id: 1 },
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(mockDataSources.tlPayoutAPI.getPayoutDetail).toHaveBeenCalledWith(
      1,
      mockToken
    );
    expect(result).toEqual({ items: [{ id: 1, name: "Account 1" }] });
  });

  // This test is to be reviewed and updated - need to confirm what the API returns if no data is found
  it("throws an error if data is not found", async () => {
    mockDataSources.tlPayoutAPI.getPayoutDetail.mockImplementation(() =>
      Promise.resolve({
        items: null,
      })
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
