import axios from "axios";
import logger from "../config/logger";
import { handleAPIRequest } from "./handleAPIRequest";

jest.mock("axios");
jest.mock("../config/logger");

describe("handleAPIRequest", () => {
  it("handles successful API request", async () => {
    axios.create.mockReturnValue({
      request: jest.fn().mockResolvedValue({ data: "success" }),
    });

    const result = await handleAPIRequest("dataSource", "endpoint", "token");

    expect(result).toEqual("success");
  });

  it("handles API response with non-2xx status code", async () => {
    axios.create.mockReturnValue({
      request: jest
        .fn()
        .mockRejectedValue({ response: { status: 400, data: "error" } }),
    });

    await expect(
      handleAPIRequest("dataSource", "endpoint", "token")
    ).rejects.toThrow("API responded with status code 400: error");
    expect(logger.error).toHaveBeenCalledTimes(3);
  });

  it("handles API request with no response", async () => {
    axios.create.mockReturnValue({
      request: jest.fn().mockRejectedValue({ request: {} }),
    });

    await expect(
      handleAPIRequest("dataSource", "endpoint", "token")
    ).rejects.toThrow("No response received from API");
    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it("handles error in setting up request", async () => {
    axios.create.mockReturnValue({
      request: jest.fn().mockRejectedValue({ message: "error" }),
    });

    await expect(
      handleAPIRequest("dataSource", "endpoint", "token")
    ).rejects.toThrow("Error in setting up API request: error");
    expect(logger.error).toHaveBeenCalledTimes(1);
  });
});
