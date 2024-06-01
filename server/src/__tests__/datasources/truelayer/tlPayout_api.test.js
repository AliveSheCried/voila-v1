import test from "ava";
import sinon from "sinon";
import tlSigning from "truelayer-signing";
import { TLPayoutAPI } from "../../../datasources/trueLayer/tlPayout_api.js";

test.beforeEach((t) => {
  // Create a sandbox for stubbing
  t.context.sandbox = sinon.createSandbox();

  // Stub the handleAPIRequest function
  t.context.handleAPIRequestStub = t.context.sandbox
    .stub()
    .resolves({ accessToken: "abc123" });

  // Create an instance of TLPayoutAPI with the stubbed handleAPIRequest
  t.context.tlPayoutAPI = new TLPayoutAPI(t.context.handleAPIRequestStub);
});

test.afterEach.always((t) => {
  // Restore the sandbox after each test
  t.context.sandbox.restore();
});

test("createMerchantAccountPayout calls handleAPIRequest with correct arguments", async (t) => {
  const { tlPayoutAPI, handleAPIRequestStub } = t.context;
  const token = "testToken";
  const reference = "testReference";
  const account_holder_name = "testAccountHolderName";
  const merchant_account_id = "testMerchantAccountID";
  const amount_in_minor = 100;
  const currency = "GBP";
  const account_identifier = {
    type: "external_account",
    sort_code: "testSortCode",
    account_number: "testAccountNumber",
  };

  // Mock environment variables
  process.env.KID = "testKid";
  process.env.PRIVATE_KEY = "testPrivateKey";

  // Mock tlSigning.sign
  t.context.sandbox.stub(tlSigning, "sign").returns("testSignature");

  // Directly set the idempotency key
  const idKey = "testIdKey";

  const body = {
    beneficiary: {
      type: "external_account",
      account_identifier,
      reference,
      account_holder_name,
    },
    amount_in_minor,
    merchant_account_id,
    currency,
  };

  const options = {
    "Idempotency-Key": idKey,
    "Tl-Signature": "testSignature",
    "content-type": "application/json; charset=UTF-8",
    body: body,
  };

  await tlPayoutAPI.createMerchantAccountPayout(
    reference,
    account_holder_name,
    merchant_account_id,
    amount_in_minor,
    currency,
    account_identifier,
    token
  );

  // Log the actual arguments passed to handleAPIRequest
  console.log(handleAPIRequestStub.getCall(0).args);

  t.true(
    handleAPIRequestStub.calledWithExactly(
      tlPayoutAPI,
      "/payouts",
      token,
      "POST",
      {
        ...options,
        body: {
          beneficiary: {
            type: "external_account",
            account_identifier,
            reference,
            account_holder_name,
          },
          amount_in_minor,
          merchant_account_id,
          currency,
        },
      }
    )
  );
});
