import bodyParser from "body-parser";
import cors from "cors";
import { startApolloServer } from "../apolloServer.js";
import { startServer } from "../index.js";
import { errorHandler } from "../middleware/errorHandler.js";
import { transactionsHandler } from "../routes/transactions.js";

jest.mock("cors");
jest.mock("body-parser", () => ({
  json: jest.fn(),
  urlencoded: jest.fn(),
}));
jest.mock("../apolloServer.js", () => ({
  startApolloServer: jest.fn(),
}));
jest.mock("../middleware/errorHandler.js", () => jest.fn());
jest.mock("../routes/transactions.js", () => jest.fn());

describe("startServer", () => {
  it("sets up the server correctly", async () => {
    const mockApp = {
      use: jest.fn(),
      get: jest.fn(),
    };
    const mockHttpServer = {
      listen: jest.fn().mockImplementation((_, cb) => cb()),
    };
    const mockClient = {};

    await startServer(mockApp, mockHttpServer, mockClient);

    expect(cors).toHaveBeenCalledWith({
      origin: "http://127.0.0.1:5173",
      optionsSuccessStatus: 200,
    });
    expect(bodyParser.json).toHaveBeenCalled();
    expect(bodyParser.urlencoded).toHaveBeenCalledWith({ extended: true });
    expect(startApolloServer).toHaveBeenCalledWith(
      mockApp,
      mockHttpServer,
      mockClient
    );
    expect(transactionsHandler).toHaveBeenCalledWith(mockClient);
    expect(errorHandler).toHaveBeenCalled();

    expect(mockApp.use).toHaveBeenCalledTimes(5);
    expect(mockApp.get).toHaveBeenCalledWith(
      "/api/transactions",
      expect.any(Function)
    );

    expect(mockHttpServer.listen).toHaveBeenCalledWith(
      { port: 4000 },
      expect.any(Function)
    );
  });
});
