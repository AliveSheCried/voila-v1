import test from "ava";
import sinon from "sinon";
import { TLMerchantAccountAPI } from "../../../datasources/trueLayer/tlMerchantAccount_api.js";

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  t.context.handleAPIRequestStub = t.context.sandbox
    .stub()
    .resolves({ accessToken: "abc123" });
  t.context.tlMerchantAccountAPI = new TLMerchantAccountAPI(
    t.context.handleAPIRequestStub
  );
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test("getMerchantAccounts calls handleAPIRequest with correct arguments", async (t) => {
  const { tlMerchantAccountAPI, handleAPIRequestStub } = t.context;
  const token = "testToken";

  await tlMerchantAccountAPI.getMerchantAccounts(token);

  t.true(
    handleAPIRequestStub.calledWith(
      tlMerchantAccountAPI,
      "/merchant-accounts",
      token
    )
  );
});

test("getMerchantAccounts handles error correctly", async (t) => {
  const { tlMerchantAccountAPI, handleAPIRequestStub } = t.context;
  const token = "testToken";

  handleAPIRequestStub.rejects(
    new Error("Failed to retrieve merchant accounts")
  );

  const error = await t.throwsAsync(
    tlMerchantAccountAPI.getMerchantAccounts(token)
  );

  t.is(error.message, "Failed to retrieve merchant accounts");
});

test("getMerchantAccount calls handleAPIRequest with correct arguments", async (t) => {
  const { tlMerchantAccountAPI, handleAPIRequestStub } = t.context;
  const token = "testToken";
  const id = "testID";

  await tlMerchantAccountAPI.getMerchantAccount(id, token);

  t.true(
    handleAPIRequestStub.calledWith(
      tlMerchantAccountAPI,
      `/merchant-accounts/${id}`,
      token
    )
  );
});

test("getMerchantAccount handles error correctly", async (t) => {
  const { tlMerchantAccountAPI, handleAPIRequestStub } = t.context;
  const token = "testToken";
  const id = "testID";

  handleAPIRequestStub.rejects(
    new Error(`Failed to retrieve merchant account with ID ${id}`)
  );

  const error = await t.throwsAsync(
    tlMerchantAccountAPI.getMerchantAccount(id, token)
  );

  t.is(error.message, `Failed to retrieve merchant account with ID ${id}`);
});

test("getMerchantAccountTransactions calls handleAPIRequest with correct arguments", async (t) => {
  const { tlMerchantAccountAPI, handleAPIRequestStub } = t.context;
  const token = "testToken";
  const id = "testID";
  const fromDate = "2021-01-01";
  const toDate = "2021-01-31";

  await tlMerchantAccountAPI.getMerchantAccountTransactions(
    id,
    token,
    fromDate,
    toDate
  );

  t.true(
    handleAPIRequestStub.calledWith(
      tlMerchantAccountAPI,
      `merchant-accounts/${id}/transactions?from=${fromDate}&to=${toDate}`,
      token
    )
  );
});

test("getMerchantAccountTransactions handles error correctly", async (t) => {
  const { tlMerchantAccountAPI, handleAPIRequestStub } = t.context;
  const token = "testToken";
  const id = "testID";
  const fromDate = "2021-01-01";
  const toDate = "2021-01-31";

  handleAPIRequestStub.rejects(
    new Error(
      `Failed to retrieve transactions for merchant account with ID ${id}`
    )
  );

  const error = await t.throwsAsync(
    tlMerchantAccountAPI.getMerchantAccountTransactions(
      id,
      token,
      fromDate,
      toDate
    )
  );

  t.is(
    error.message,
    `Failed to retrieve transactions for merchant account with ID ${id}`
  );
});
