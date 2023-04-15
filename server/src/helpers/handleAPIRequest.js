export async function handleAPIRequest(
  endpoint,
  token,
  additionalHeaders = {}
) {
  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
        ...additionalHeaders,
      },
    };
    // const response = await fetch(
    //   `https://api.truelayer-sandbox.com/${endpoint}`,
    //   options
    // );

    const response = await dataSource.fetch(endpoint, options);
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    throw error;
  }
}
