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
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
      throw error;
    }
    console.log(error.config);
  }
}
