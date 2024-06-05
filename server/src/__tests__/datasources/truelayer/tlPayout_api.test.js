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
  const merchant_account_id = "e1eff241-77d7-490d-aef4-d2701d68f90a";
  const amount_in_minor = 100;
  const currency = "GBP";
  const account_identifier = {
    type: "sort_code_account_number", // Updated to match actual call
    sort_code: "123456",
    account_number: "12345678",
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
  console.log(JSON.stringify(handleAPIRequestStub.getCall(0).args, null, 2));

  t.true(
    handleAPIRequestStub.calledWithMatch(
      tlPayoutAPI,
      "/payouts",
      token,
      "POST",
      sinon.match({
        "Idempotency-Key": sinon.match.string, //asserting that the idempotency key is a string
        "Tl-Signature": "testSignature",
        "content-type": "application/json; charset=UTF-8",
        body: sinon.match({
          beneficiary: sinon.match({
            type: "external_account",
            account_identifier: sinon.match({
              type: "sort_code_account_number", // Updated to match actual call
              sort_code: "123456",
              account_number: "12345678",
            }),
            reference,
            account_holder_name,
          }),
          amount_in_minor,
          merchant_account_id,
          currency,
        }),
      })
    )
  );
});

test("getPayoutDetail calls handleAPIRequest with correct arguments", async (t) => {
  const { tlPayoutAPI, handleAPIRequestStub } = t.context;
  const token = "testToken";
  const id = "testId";

  await tlPayoutAPI.getPayoutDetail(id, token);

  t.true(
    handleAPIRequestStub.calledWithExactly(tlPayoutAPI, `/payouts/${id}`, token)
  );
});
