import logger from "../../../config/logger";
import { merchantAccountTransactions } from "./resolverMerchantAccountTransactions";

jest.mock("../../../config/logger", () => ({
  error: jest.fn(),
  info: jest.fn(),
}));

const mockGetMerchantAccountTransactions = jest.fn();
jest.mock("../../../dataSources/tlMerchantAccountAPI", () => ({
  getMerchantAccountTransactions: mockGetMerchantAccountTransactions,
}));

describe("merchantAccountTransactions", () => {
  const mockContext = {
    token: "mockToken",
    dataSources: {
      tlMerchantAccountAPI: {
        getMerchantAccountTransactions: mockGetMerchantAccountTransactions,
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return transactions when getMerchantAccountTransactions returns valid response", async () => {
    const mockTransactions = [{ id: "1" }, { id: "2" }];
    mockGetMerchantAccountTransactions.mockResolvedValueOnce({
      items: mockTransactions,
    });

    const result = await merchantAccountTransactions(
      null,
      { id: "mockId", fromDate: "2022-01-01", toDate: "2022-01-31" },
      mockContext
    );

    expect(result).toEqual(mockTransactions);
    expect(mockGetMerchantAccountTransactions).toHaveBeenCalledWith(
      "mockId",
      "mockToken",
      "2022-01-01T00:00:00.000Z",
      "2022-01-31T23:59:59.999Z"
    );
  });

  it("should throw error when getMerchantAccountTransactions throws error", async () => {
    mockGetMerchantAccountTransactions.mockRejectedValueOnce(
      new Error("Mock error")
    );

    await expect(
      merchantAccountTransactions(
        null,
        { id: "mockId", fromDate: "2022-01-01", toDate: "2022-01-31" },
        mockContext
      )
    ).rejects.toThrow(
      "Failed to retrieve merchant account transactions with ID mockId"
    );

    expect(logger.error).toHaveBeenCalledWith(
      "Error getting merchant account transactions with ID mockId: Mock error"
    );
  });

  it("should throw error when getMerchantAccountTransactions returns empty array", async () => {
    mockGetMerchantAccountTransactions.mockResolvedValueOnce({ items: [] });

    await expect(
      merchantAccountTransactions(
        null,
        { id: "mockId", fromDate: "2022-01-01", toDate: "2022-01-31" },
        mockContext
      )
    ).rejects.toThrow(
      "No transactions for the date range 2022-01-01 to 2022-01-31 found"
    );

    expect(logger.error).toHaveBeenCalledWith(
      "No transactions for the date range 2022-01-01 to 2022-01-31 found"
    );
  });
});
