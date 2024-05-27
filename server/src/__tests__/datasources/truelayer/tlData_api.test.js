import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TLDataAPI } from "../../../datasources/trueLayer/tlData_api.js";

const mock = new MockAdapter(axios);

describe("TLDataAPI", () => {
  const tlDataAPI = new TLDataAPI();
  const token = "test-token";
  const baseURL = "https://api.truelayer-sandbox.com";

  afterEach(() => {
    mock.reset();
  });

  // Additional tests for the TLDataAPI class

  test("handleAPIRequest", async () => {
    const path = "/data/v1/test";
    const token = "test-token";
    const expectedResult = { id: "test-id" };
    mock.onGet(`${baseURL}${path}`).reply(200, expectedResult);

    const result = await tlDataAPI.handleAPIRequest(tlDataAPI, path, token);

    expect(result).toEqual(expectedResult);
  });

  test("getBankAccounts with handleAPIRequest", async () => {
    const token = "test-token";
    const expectedResult = [{ id: "account-1" }, { id: "account-2" }];
    mock.onGet(`${baseURL}/data/v1/accounts`).reply(200, expectedResult);

    const result = await tlDataAPI.getBankAccounts(token);

    expect(result).toEqual(expectedResult);
  });

  test("getBankAccount with handleAPIRequest", async () => {
    const accountId = "account-1";
    const token = "test-token";
    const expectedResult = { id: accountId };
    mock
      .onGet(`${baseURL}/data/v1/accounts/${accountId}`)
      .reply(200, expectedResult);

    const result = await tlDataAPI.getBankAccount(accountId, token);

    expect(result).toEqual(expectedResult);
  });

  test("getBankAccountBalance with handleAPIRequest", async () => {
    const accountId = "account-1";
    const token = "test-token";
    const expectedResult = { id: accountId, balance: 1000 };
    mock
      .onGet(`${baseURL}/data/v1/accounts/${accountId}/balance`)
      .reply(200, expectedResult);

    const result = await tlDataAPI.getBankAccountBalance(accountId, token);

    expect(result).toEqual(expectedResult);
  });

  test("getBankAccountTransactions with handleAPIRequest", async () => {
    const accountId = "account-1";
    const fromDate = "2023-04-01";
    const toDate = "2023-04-15";
    const token = "test-token";
    const expectedResult = [{ id: "transaction-1" }, { id: "transaction-2" }];
    mock
      .onGet(
        `${baseURL}/data/v1/accounts/${accountId}/transactions?to=${toDate}&from=${fromDate}`
      )
      .reply(200, expectedResult);

    const result = await tlDataAPI.getBankAccountTransactions(
      accountId,
      token,
      fromDate,
      toDate
    );

    expect(result).toEqual(expectedResult);
  });

  test("getBankAccountPendingTransactions with handleAPIRequest", async () => {
    const accountId = "account-1";
    const token = "test-token";
    const expectedResult = [{ id: "transaction-1" }, { id: "transaction-2" }];
    mock
      .onGet(`${baseURL}/data/v1/accounts/${accountId}/transactions/pending`)
      .reply(200, expectedResult);

    const result = await tlDataAPI.getBankAccountPendingTransactions(
      accountId,
      token
    );

    expect(result).toEqual(expectedResult);
  });

  test("getBankAccountDirectDebits with handleAPIRequest", async () => {
    const accountId = "account-1";
    const token = "test-token";
    const expectedResult = [{ id: "direct_debit-1" }, { id: "direct_debit-2" }];
    mock
      .onGet(`${baseURL}/data/v1/accounts/${accountId}/direct_debits`)
      .reply(200, expectedResult);

    const result = await tlDataAPI.getBankAccountDirectDebits(accountId, token);

    expect(result).toEqual(expectedResult);
  });

  test("getBankAccountStandingOrders with handleAPIRequest", async () => {
    const accountId = "account-1";
    const token = "test-token";
    const expectedResult = [
      { id: "standing_order-1" },
      { id: "standing_order-2" },
    ];
    mock
      .onGet(`${baseURL}/data/v1/accounts/${accountId}/standing_orders`)
      .reply(200, expectedResult);

    const result = await tlDataAPI.getBankAccountStandingOrders(
      accountId,
      token
    );

    expect(result).toEqual(expectedResult);
  });
});
