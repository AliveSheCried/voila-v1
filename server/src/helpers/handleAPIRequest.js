import axios from "axios";
import logger from "../config/logger.js";
export async function handleAPIRequest(
  dataSource,
  endpoint,
  token,
  method = "GET",
  additionalHeaders = {}
) {
  console.log("token", token);
  try {
    const headers = {
      accept: "application/json; charset=UTF-8",
      ...additionalHeaders,
      authorization: token.length === 0 ? "" : `Bearer ${token}`,
    };

    const client = axios.create({
      baseURL: dataSource.baseURL,
      headers: headers,
    });

    const response = await client({
      method: method,
      url: endpoint,
      data: additionalHeaders.body,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      logger.error("Response error data:", error.response.data);
      logger.error("Response error status:", error.response.status);
      logger.error("Response error headers:", error.response.headers);
      throw new Error(
        `API responded with status code ${error.response.status}: ${error.response.data}`
      );
    } else if (error.request) {
      // The request was made but no response was received
      logger.error("No response received:", error.request);
      throw new Error("No response received from API");
    } else {
      // Something happened in setting up the request that triggered an Error
      logger.error("Error in setting up request:", error.message);
      throw new Error(`Error in setting up API request: ${error.message}`);
    }
  }
}
