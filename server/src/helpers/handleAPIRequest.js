import axios from "axios";

export async function handleAPIRequest(
  dataSource,
  endpoint,
  token,
  method = "GET",
  additionalHeaders = {}
) {
  try {
    const headers = {
      accept: "application/json; charset=UTF-8",
      ...additionalHeaders,
      authorization: `Bearer ${token}`,
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
    console.error(`Error: ${error.message}`);
    throw error;
  }
}
