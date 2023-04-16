import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { TLPayoutAPI } from "./tlPayout_api";

const mock = new MockAdapter(axios);

describe("TLPayoutAPI", () => {
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
});
