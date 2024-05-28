//import logger from "../../config/logger.js";
import logger from "../../config/testLogger.js";
import { decrypt } from "../../helpers/encryptionHelper.js";
import { transactionsHandler } from "../../routes/transactions.js";

jest.mock("../../config/logger.js");
jest.mock("../../helpers/encryptionHelper.js");

describe("transactionsHandler", () => {
  let req, res, client, db, transactionsCollection;

  beforeEach(() => {
    transactionsCollection = {
      find: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      toArray: jest.fn(),
      countDocuments: jest.fn(),
    };
    db = { collection: jest.fn().mockReturnValue(transactionsCollection) };
    client = { db: jest.fn().mockReturnValue(db) };
    req = { query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    logger.error.mockClear();
    decrypt.mockClear();
  });

  it("should return transactions and total count", async () => {
    const transactions = [{}, {}];
    transactionsCollection.toArray.mockResolvedValue(transactions);
    transactionsCollection.countDocuments.mockResolvedValue(100);
    decrypt.mockImplementation((transaction) => JSON.stringify(transaction));

    await transactionsHandler(client)(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ transactions, total: 100 });
  });

  it("should handle error from transactionsCollection.find", async () => {
    transactionsCollection.toArray.mockRejectedValue(new Error("Find error"));

    await transactionsHandler(client)(req, res);

    expect(logger.error).toHaveBeenCalledWith(
      "Error fetching transactions:",
      expect.any(Error)
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to fetch transactions",
    });
  });

  it("should handle error from decrypt", async () => {
    const transactions = [{}, {}];
    transactionsCollection.toArray.mockResolvedValue(transactions);
    decrypt.mockImplementation(() => {
      throw new Error("Decrypt error");
    });

    await transactionsHandler(client)(req, res);

    expect(logger.error).toHaveBeenCalledWith(
      "Error decrypting transaction:",
      expect.any(Error)
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      transactions,
      total: expect.any(Number),
    });
  });
});
