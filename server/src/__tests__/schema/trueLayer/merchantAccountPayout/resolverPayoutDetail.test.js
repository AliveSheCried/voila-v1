import test from "ava";
import sinon from "sinon";
import logger from "../../../../config/logger.js";
import { payoutDetail } from "../../../../schema/TrueLayer/MerchantAccountPayout/resolverPayoutDetail.js";

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
    tlPayoutAPI: {
      getPayoutDetail: t.context.sandbox.stub(),
    },
  };
});

test.afterEach.always((t) => {
  // Restore the sandbox after each test
  t.context.sandbox.restore();
});

test("payoutDetail retrieves data correctly", async (t) => {
  const { dataSources } = t.context;

  // Mock the response data
  const responseData = { id: "1", status: "completed" };

  // Stub the getPayoutDetail method to return the mock data
  dataSources.tlPayoutAPI.getPayoutDetail.resolves(responseData);

  const result = await payoutDetail(
    null,
    { id: "1" },
    { token: "testToken", dataSources, logger }
  );

  t.true(logger.info.calledWith("Payout detail data retrieved for ID 1"));
  t.deepEqual(result, responseData);
});

test("payoutDetail handles errors correctly", async (t) => {
  const { dataSources } = t.context;

  // Stub the getPayoutDetail method to throw an error
  dataSources.tlPayoutAPI.getPayoutDetail.rejects(new Error("Test error"));

  const error = await t.throwsAsync(() =>
    payoutDetail(null, { id: "1" }, { token: "testToken", dataSources, logger })
  );

  t.true(
    logger.error.calledWith("Error getting payout detail with ID 1: Test error")
  );
  t.is(error.message, "Failed to retrieve payout detail with ID 1");
});

test("payoutDetail handles no data returned correctly", async (t) => {
  const { dataSources } = t.context;

  // Stub the getPayoutDetail method to return null
  dataSources.tlPayoutAPI.getPayoutDetail.resolves(null);

  const error = await t.throwsAsync(() =>
    payoutDetail(null, { id: "1" }, { token: "testToken", dataSources, logger })
  );

  t.true(logger.error.calledWith("No data found for the ID provided!"));
  t.is(error.message, "No data found for the ID provided!");
});
