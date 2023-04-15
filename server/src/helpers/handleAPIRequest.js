export async function handleAPIRequest(
  dataSource,
  endpoint,
  token,
  method = "GET",
  additionalHeaders = {},
  body = {}
) {
  console.log(body);
  try {
    const headers = {
      accept: "application/json; charset=UTF-8",
      ...additionalHeaders,
      authorization: `Bearer ${token}`,
    };

    const options = {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    };

    console.log(endpoint, options);

    const response = await dataSource.fetch(endpoint, options);

    return response;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}
