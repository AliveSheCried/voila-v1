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

// const options = {
//   method: 'POST',
//   headers: {
//     accept: 'application/json; charset=UTF-8',
//     'Idempotency-Key': 'b00f0fd8-0dfa-4d30-8e06-da8b71a7a3e7',
//     'Tl-Signature': 'eyJhbGciOiJFUzUxMiIsImtpZCI6ImQ2YzhjYjlkLWM1YmQtNGYxMy1hOTYyLWM4ZGM0YWJhZmZmMSIsInRsX3ZlcnNpb24iOiIyIiwidGxfaGVhZGVycyI6IklkZW1wb3RlbmN5LUtleSJ9..AXDC6wBI3khurvj10FWHwZ8GMJpkOQ0cDpCQfYUsdbiTg0woHXjqw0VtrIzoQYU7D4UBeoBEzPEeJVk7BFoePBUPAP-BBb6LLgxz7kJrgNQePixGZt_GXr9s2oUM83BZzvnTivM1m-sNqaZOzNpji-T-u9yh6RyHampXLqIQOastLnew',
//     'content-type': 'application/json; charset=UTF-8'
//   },
//   body: '{"currency":"GBP","beneficiary":{"type":"external_account","account_identifier":{"type":"sort_code_account_number","sort_code":"009922","account_number":"12345678"},"reference":"14JUN23","account_holder_name":"KingBOB"},"merchant_account_id":"e1eff241-77d7-490d-aef4-d2701d68f90a\'","amount_in_minor":987}'
// };

// fetch('https://api.truelayer-sandbox.com/payouts', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));
