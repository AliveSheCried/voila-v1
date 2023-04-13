//handle GET & POST requests function
export async function handleAPIRequest(
  dataSource,
  endpoint,
  token = null,
  method = "GET",
  data = null
) {
  console.log(endpoint);
  // Common options function
  const getOptions = (token) => {
    return {
      method: method,
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
      },
    };
  };

  const options = getOptions(token);

  if (method === "POST" && data) {
    options.method = "POST";
    options.headers = {
      ...options.headers,
      ...data.headers,
    };
    options.body = data.body;
  }

  console.log(endpoint, options);

  const response = await dataSource.fetch(endpoint, options);

  if (!response.ok) {
    let message = `Error making ${method} request to ${endpoint}: ${response.status}`;

    try {
      const error = await response.json();
      message += ` - ${error.error_description}`;
    } catch (error) {}

    throw new Error(message);
  }

  return response.json();
}
