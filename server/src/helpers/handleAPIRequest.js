//handle GET & POST requests function
export async function handleAPIRequest(
  dataSource,
  endpoint,
  token = null,
  method = "GET",
  data = null
) {
  // Common options function
  const getOptions = (additionalHeaders = {}) => {
    return {
      method: method,
      headers: {
        accept: "application/json; charset=UTF-8",
        authorization: `Bearer ${token}`,
        ...additionalHeaders,
      },
    };
  };

  const options = getOptions(token, {
    "Content-Type": "application/json",
  });

  if (method === "POST" && data) {
    options.method = "POST";
    options.headers = {
      ...options.headers,
      ...data.headers,
    };
    options.body = data.body;
  }

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
