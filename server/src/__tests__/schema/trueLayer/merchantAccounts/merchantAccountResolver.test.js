import { tlMerchantAccountAPI } from "../../../../datasources/trueLayer/tlMerchantAccount_api.js";
import logger from "../../../config/logger.js";
import { merchantAccount } from "./resolverMerchantAccount";

jest.mock("../../../../datasources/trueLayer/tlMerchantAccount_api.js");
jest.mock("../../../config/logger.js");

describe("merchantAccount", () => {
  beforeEach(() => {
    tlMerchantAccountAPI.getMerchantAccount.mockClear();
    logger.info.mockClear();
    logger.error.mockClear();
  });

  it("should fetch merchant account data and log info", async () => {
    const mockData = { id: 1, name: "Account 1" };
    tlMerchantAccountAPI.getMerchantAccount.mockResolvedValue(mockData);

    const result = await merchantAccount(
      {},
      { id: 1 },
      { token: "test-token", dataSources: { tlMerchantAccountAPI } }
    );

    expect(tlMerchantAccountAPI.getMerchantAccount).toHaveBeenCalledWith(
      1,
      "test-token"
    );
    expect(logger.info).toHaveBeenCalledWith(
      "Merchant account data retrieved for ID 1"
    );
    expect(result).toEqual(mockData);
  });

  it("should throw an error and log it when no data is found", async () => {
    tlMerchantAccountAPI.getMerchantAccount.mockResolvedValue(null);

    await expect(
      merchantAccount(
        {},
        { id: 1 },
        { token: "test-token", dataSources: { tlMerchantAccountAPI } }
      )
    ).rejects.toThrow("No data found for the ID provided!");

    expect(tlMerchantAccountAPI.getMerchantAccount).toHaveBeenCalledWith(
      1,
      "test-token"
    );
    expect(logger.error).toHaveBeenCalledWith(
      "Error getting merchant account with ID 1: No data found for the ID provided!"
    );
  });

  it("should throw an error and log it when an exception occurs", async () => {
    const mockError = new Error(
      "Failed to retrieve merchant account with ID 1"
    );
    tlMerchantAccountAPI.getMerchantAccount.mockRejectedValue(mockError);

    await expect(
      merchantAccount(
        {},
        { id: 1 },
        { token: "test-token", dataSources: { tlMerchantAccountAPI } }
      )
    ).rejects.toThrow("Failed to retrieve merchant account with ID 1");

    expect(tlMerchantAccountAPI.getMerchantAccount).toHaveBeenCalledWith(
      1,
      "test-token"
    );
    expect(logger.error).toHaveBeenCalledWith(
      `Error getting merchant account with ID 1: ${mockError.message}`
    );
  });
});
