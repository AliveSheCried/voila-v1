import test from "ava";
import sinon from "sinon";
import { merchantAccounts } from "../../../../schema/TrueLayer/MerchantAccounts/resolverMerchantAccounts.js";

test.beforeEach((t) => {
  // Create a sandbox for stubbing
  t.context.sandbox = sinon.createSandbox();

  // Create a stubbed logger
  t.context.logger = {
    info: t.context.sandbox.stub(),
    error: t.context.sandbox.stub(),
  };

  // Stub the dataSources
  t.context.dataSources = {
    tlMerchantAccountAPI: {
      getMerchantAccounts: t.context.sandbox.stub(),
    },
  };
});

test.afterEach.always((t) => {
  // Restore the sandbox after each test
  t.context.sandbox.restore();
});

test("merchantAccounts retrieves data correctly", async (t) => {
  const { dataSources, logger } = t.context;

  // Mock the response data
  const responseData = {
    items: [
      { id: "1", name: "Account 1" },
      { id: "2", name: "Account 2" },
    ],
  };

  // Stub the getMerchantAccounts method to return the mock data
  dataSources.tlMerchantAccountAPI.getMerchantAccounts.resolves(responseData);

  const result = await merchantAccounts(null, null, {
    token: "testToken",
    dataSources,
    logger,
  });

  t.true(logger.info.calledWith("Merchant accounts data retrieved"));
  t.deepEqual(result, responseData.items);
});

test("merchantAccounts handles errors correctly", async (t) => {
  const { dataSources, logger } = t.context;

  // Stub the getMerchantAccounts method to throw an error
  dataSources.tlMerchantAccountAPI.getMerchantAccounts.rejects(
    new Error("Test error")
  );

  const error = await t.throwsAsync(() =>
    merchantAccounts(null, null, { token: "testToken", dataSources, logger })
  );

  t.true(
    logger.error.calledWith("Error getting merchant accounts: Test error")
  );
  t.is(error.message, "Failed to retrieve merchant accounts");
});
