import logger from "../../../config/logger";
import { tlMerchantAccountAPI } from "../../../datasources/trueLayer/tlMerchantAccount_api";
import { merchantAccounts } from "./resolverMerchantAccounts";

jest.mock("../../../datasources/trueLayer/tlMerchantAccount_api");
jest.mock("../../../config/logger");

describe("merchantAccounts", () => {
  beforeEach(() => {
    tlMerchantAccountAPI.getMerchantAccounts.mockClear();
    logger.error.mockClear();
    logger.info.mockClear();
  });

  it("fetches merchant accounts and returns them in correct format", async () => {
    const mockToken = "test-token";
    const mockResponse = {
      items: [
        { id: 1, name: "Account 1" },
        { id: 2, name: "Account 2" },
      ],
    };

    tlMerchantAccountAPI.getMerchantAccounts.mockResolvedValue(mockResponse);

    const result = await merchantAccounts(
      {},
      {},
      { token, dataSources: { tlMerchantAccountAPI } }
    );

    expect(tlMerchantAccountAPI.getMerchantAccounts).toHaveBeenCalledWith(
      mockToken
    );
    expect(result).toEqual(mockResponse.items);
    expect(logger.info).toHaveBeenCalledWith(
      "Merchant accounts data retrieved"
    );
  });

  it("throws an error if data is not found or data format not as expected", async () => {
    const mockToken = "test-token";
    const mockResponse = { items: "not an array" };

    tlMerchantAccountAPI.getMerchantAccounts.mockResolvedValue(mockResponse);

    await expect(
      merchantAccounts(
        {},
        {},
        { token: mockToken, dataSources: { tlMerchantAccountAPI } }
      )
    ).rejects.toThrow("No data found or data format not as expected!");

    expect(logger.error).toHaveBeenCalledWith(
      "No data found or data format not as expected!"
    );
  });

  it("throws an error if getMerchantAccounts fails", async () => {
    const mockToken = "test-token";
    const mockError = new Error("Failed to retrieve merchant accounts");

    tlMerchantAccountAPI.getMerchantAccounts.mockRejectedValue(mockError);

    await expect(
      merchantAccounts(
        {},
        {},
        { token: mockToken, dataSources: { tlMerchantAccountAPI } }
      )
    ).rejects.toThrow("Failed to retrieve merchant accounts");

    expect(logger.error).toHaveBeenCalledWith(
      `Error getting merchant accounts: ${mockError.message}`
    );
  });
});
