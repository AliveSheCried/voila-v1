//Jest test of the tlMerchantAccount_api.js file

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TLMerchantAccountAPI } from "./tlMerchantAccount_api";

const mock = new MockAdapter(axios);

describe("TLMerchantAccountAPI", () => {
  const tlMerchantAccountAPI = new TLMerchantAccountAPI();
  const token = "test-token";
  const baseURL = "https://api.truelayer-sandbox.com";

  afterEach(() => {
    mock.reset();
  });

  test("getMerchantAccounts", async () => {
    const expectedResult = [{ id: "account-1" }, { id: "account-2" }];
    mock.onGet(`${baseURL}/merchant-accounts`).reply(200, expectedResult);

    const result = await tlMerchantAccountAPI.getMerchantAccounts(token);

    expect(result).toEqual(expectedResult);
  });

  test("getMerchantAccount", async () => {
    const accountId = "account-1";
    const expectedResult = { id: accountId };
    mock
      .onGet(`${baseURL}/merchant-accounts/${accountId}`)
      .reply(200, expectedResult);

    const result = await tlMerchantAccountAPI.getMerchantAccount(
      accountId,
      token
    );

    expect(result).toEqual(expectedResult);
  });

  test("getMerchantAccountTransactions", async () => {
    const accountId = "account-1";
    const fromDate = "2023-04-01";
    const toDate = "2023-04-15";
    const expectedResult = [{ id: "transaction-1" }, { id: "transaction-2" }];
    mock
      .onGet(
        `${baseURL}/merchant-accounts/${accountId}/transactions?from=${fromDate}&to=${toDate}`
      )
      .reply(200, expectedResult);

    const result = await tlMerchantAccountAPI.getMerchantAccountTransactions(
      accountId,
      token,
      fromDate,
      toDate
    );

    expect(result).toEqual(expectedResult);
  });
});
