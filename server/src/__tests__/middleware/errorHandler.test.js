import logger from "../../config/logger.js";
import { errorHandler } from "../../middleware/errorHandler.js";

jest.mock("../../config/logger.js", () => ({
  error: jest.fn(),
}));

describe("errorHandler middleware", () => {
  const mockRequest = {};
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  const mockNext = jest.fn();
  const error = new Error("Test error");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should log the error stack", () => {
    errorHandler(error, mockRequest, mockResponse, mockNext);
    expect(logger.error).toHaveBeenCalledWith(error.stack);
  });

  it("should set the response status to 500", () => {
    errorHandler(error, mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });

  it("should send the correct error message", () => {
    errorHandler(error, mockRequest, mockResponse, mockNext);
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: "Something went wrong!",
    });
  });
});
