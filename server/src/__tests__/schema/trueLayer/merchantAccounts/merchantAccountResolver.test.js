import test from "ava";
import sinon from "sinon";
import logger from "../../../../config/logger.js";
import { merchantAccount } from "../../../../schema/TrueLayer/MerchantAccounts/resolverMerchantAccount.js";

test.beforeEach((t) => {
  // Create a sandbox for stubbing
  t.context.sandbox = sinon.createSandbox();

  // Stub the logger
  if (!logger.info.isSinonProxy) {
    t.context.sandbox.stub(logger, "info");
  }
  if (!logger.error.isSinonProxy) {
    t.context.sandbox.stub(logger, "error");
  }

  // Stub the dataSources
  t.context.dataSources = {
    tlMerchantAccountAPI: {
      getMerchantAccount: t.context.sandbox.stub(),
    },
  };
});

test.afterEach.always((t) => {
  // Restore the sandbox after each test
  t.context.sandbox.restore();
});

test("merchantAccount retrieves data correctly", async (t) => {
  const { dataSources } = t.context;

  // Mock the response data
  const responseData = { id: "1", name: "Account 1" };

  // Stub the getMerchantAccount method to return the mock data
  dataSources.tlMerchantAccountAPI.getMerchantAccount.resolves(responseData);

  const result = await merchantAccount(
    null,
    { id: "1" },
    { token: "testToken", dataSources, logger }
  );

  t.true(logger.info.calledWith("Merchant account data retrieved for ID 1"));
  t.deepEqual(result, responseData);
});

test("merchantAccount handles errors correctly", async (t) => {
  const { dataSources } = t.context;

  // Stub the getMerchantAccount method to throw an error
  dataSources.tlMerchantAccountAPI.getMerchantAccount.rejects(
    new Error("Test error")
  );

  const error = await t.throwsAsync(() =>
    merchantAccount(
      null,
      { id: "1" },
      { token: "testToken", dataSources, logger }
    )
  );

  t.true(
    logger.error.calledWith(
      "Error getting merchant account with ID 1: Test error"
    )
  );
  t.is(error.message, "Failed to retrieve merchant account with ID 1");
});

test("merchantAccount handles no data returned correctly", async (t) => {
  const { dataSources } = t.context;

  // Stub the getMerchantAccount method to return null
  dataSources.tlMerchantAccountAPI.getMerchantAccount.resolves(null);

  const error = await t.throwsAsync(() =>
    merchantAccount(
      null,
      { id: "1" },
      { token: "testToken", dataSources, logger }
    )
  );

  t.true(
    logger.error.calledWith(
      "Error getting merchant account with ID 1: No data found for the ID provided!"
    )
  );
  t.is(error.message, "Failed to retrieve merchant account with ID 1");
});

test("merchantAccount handles invalid id correctly", async (t) => {
  const { dataSources } = t.context;

  // Stub the getMerchantAccount method to throw an error
  dataSources.tlMerchantAccountAPI.getMerchantAccount.rejects(
    new Error("Invalid ID")
  );

  const error = await t.throwsAsync(() =>
    merchantAccount(
      null,
      { id: "invalid" },
      { token: "testToken", dataSources, logger }
    )
  );

  t.true(
    logger.error.calledWith(
      "Error getting merchant account with ID invalid: Invalid ID"
    )
  );
  t.is(error.message, "Failed to retrieve merchant account with ID invalid");
});
