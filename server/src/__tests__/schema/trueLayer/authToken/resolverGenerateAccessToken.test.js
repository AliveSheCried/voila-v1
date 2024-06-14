import test from "ava";
import sinon from "sinon";
import logger from "../../../../config/logger.js";
import { generateAccessToken } from "../../../../schema/TrueLayer/AuthToken/resolverGenerateAccessToken.js";

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();

  // Ensure logger.error is not already stubbed
  if (logger.error.restore) {
    logger.error.restore();
  }

  t.context.loggerErrorStub = t.context.sandbox.stub(logger, "error");

  t.context.dataSources = {
    tlAccessTokenAPI: {
      generateAccessToken: t.context.sandbox.stub(),
    },
  };

  t.context.context = {
    dataSources: t.context.dataSources,
    logger: logger,
  };
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test("generateAccessToken retrieves data correctly", async (t) => {
  const { context, dataSources } = t.context;
  const responseData = { access_token: "test_access_token" };
  dataSources.tlAccessTokenAPI.generateAccessToken.resolves(responseData);

  const result = await generateAccessToken(
    null,
    {
      scope: "test_scope",
      grant_type: "test_grant_type",
      redirect_uri: "test_redirect_uri",
      code: "test_code",
    },
    context
  );

  t.deepEqual(result, responseData);
});

test("generateAccessToken handles errors correctly", async (t) => {
  const { context, dataSources, loggerErrorStub } = t.context;
  const error = new Error("Test error");
  dataSources.tlAccessTokenAPI.generateAccessToken.rejects(error);

  const errorResult = await t.throwsAsync(
    generateAccessToken(
      null,
      {
        scope: "test_scope",
        grant_type: "test_grant_type",
        redirect_uri: "test_redirect_uri",
        code: "test_code",
      },
      context
    )
  );

  t.is(errorResult.message, "Failed to retrieve access token");
  t.true(loggerErrorStub.calledWith("Error getting access token: Test error"));
});
