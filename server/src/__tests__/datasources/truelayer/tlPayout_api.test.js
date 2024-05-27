import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TLPayoutAPI } from "../../../datasources/trueLayer/tlPayout_api.js";

const mock = new MockAdapter(axios);

describe("TLPayoutAPI", () => {
  jest.mock("truelayer-signing"); // Mock the signing module

  const tlPayoutAPI = new TLPayoutAPI();
  const token = "test-token";
  const baseURL = "https://api.truelayer-sandbox.com";

  afterEach(() => {
    mock.reset();
  });

  test("createMerchantAccountPayout", async () => {
    // Replace these with your test data
    const reference = "test-reference";
    const account_holder_name = "John Doe";
    const merchant_account_id = "account-1";
    const amount_in_minor = 1000;
    const currency = "GBP";
    const account_identifier = "test-identifier";

    const expectedResult = { id: "payout-1" };
    mock.onPost(`${baseURL}/payouts`).reply(200, expectedResult);

    // Mock environment variables
    process.env.KID = "test-kid";
    process.env.PRIVATE_KEY =
      "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----";

    const result = await tlPayoutAPI.createMerchantAccountPayout(
      reference,
      account_holder_name,
      merchant_account_id,
      amount_in_minor,
      currency,
      account_identifier,
      token
    );

    expect(result).toEqual(expectedResult);
  });

  test("getPayoutDetail", async () => {
    const payoutId = "payout-1";
    const expectedResult = { id: payoutId };
    mock.onGet(`${baseURL}/payouts/${payoutId}`).reply(200, expectedResult);

    const result = await tlPayoutAPI.getPayoutDetail(payoutId, token);

    expect(result).toEqual(expectedResult);
  });

  test("createMerchantAccountPayout throws error when KID is missing", async () => {
    const reference = "test-reference";
    const account_holder_name = "John Doe";
    const merchant_account_id = "account-1";
    const amount_in_minor = 1000;
    const currency = "GBP";
    const account_identifier = "test-identifier";

    process.env.KID = "";
    process.env.PRIVATE_KEY =
      "-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----";

    await expect(
      tlPayoutAPI.createMerchantAccountPayout(
        reference,
        account_holder_name,
        merchant_account_id,
        amount_in_minor,
        currency,
        account_identifier,
        token
      )
    ).rejects.toThrow("Missing env var KID");
  });

  test("createMerchantAccountPayout throws error when PRIVATE_KEY is missing", async () => {
    const reference = "test-reference";
    const account_holder_name = "John Doe";
    const merchant_account_id = "account-1";
    const amount_in_minor = 1000;
    const currency = "GBP";
    const account_identifier = "test-identifier";

    process.env.KID = "test-kid";
    process.env.PRIVATE_KEY = "";

    await expect(
      tlPayoutAPI.createMerchantAccountPayout(
        reference,
        account_holder_name,
        merchant_account_id,
        amount_in_minor,
        currency,
        account_identifier,
        token
      )
    ).rejects.toThrow("Missing env var PRIVATE_KEY");
  });

  test("getPayoutDetail throws error when request fails", async () => {
    const payoutId = "payout-1";

    mock.onGet(`${baseURL}/payouts/${payoutId}`).reply(500);

    await expect(tlPayoutAPI.getPayoutDetail(payoutId, token)).rejects.toThrow(
      `Failed to get payout detail for ID ${payoutId}`
    );
  });
});
