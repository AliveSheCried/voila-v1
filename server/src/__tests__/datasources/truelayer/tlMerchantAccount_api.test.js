//Jest test of the tlMerchantAccount_api.js file

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TLMerchantAccountAPI } from "../../../datasources/trueLayer/tlMerchantAccount_api.js";

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

describe("TLMerchantAccountAPI error handling", () => {
  const tlMerchantAccountAPI = new TLMerchantAccountAPI();
  const token = "test-token";
  const baseURL = "https://api.truelayer-sandbox.com/v3";

  afterEach(() => {
    mock.reset();
  });

  test("getMerchantAccounts error", async () => {
    mock.onGet(`${baseURL}/merchant-accounts`).networkError();

    await expect(
      tlMerchantAccountAPI.getMerchantAccounts(token)
    ).rejects.toThrow("Failed to retrieve merchant accounts");
  });

  test("getMerchantAccount error", async () => {
    const accountId = "account-1";
    mock.onGet(`${baseURL}/merchant-accounts/${accountId}`).networkError();

    await expect(
      tlMerchantAccountAPI.getMerchantAccount(accountId, token)
    ).rejects.toThrow(
      `Failed to retrieve merchant account with ID ${accountId}`
    );
  });

  test("getMerchantAccountTransactions error", async () => {
    const accountId = "account-1";
    const fromDate = "2023-04-01";
    const toDate = "2023-04-15";
    mock
      .onGet(
        `${baseURL}/merchant-accounts/${accountId}/transactions?from=${fromDate}&to=${toDate}`
      )
      .networkError();

    await expect(
      tlMerchantAccountAPI.getMerchantAccountTransactions(
        accountId,
        token,
        fromDate,
        toDate
      )
    ).rejects.toThrow(
      `Failed to retrieve transactions for merchant account with ID ${accountId}`
    );
  });
});
