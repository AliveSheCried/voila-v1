import test from "ava";
import * as dotenv from "dotenv";
import sinon from "sinon";
import { TLAccessTokenAPI } from "../../../../datasources/trueLayer/tlAccessToken_api.js";
import { generateAccessToken } from "../../../../schema/TrueLayer/AuthToken/resolvers.js";

dotenv.config();

test.beforeEach((t) => {
  // Create a sandbox for stubbing
  t.context.sandbox = sinon.createSandbox();

  // Stub the handleAPIRequest function
  t.context.handleAPIRequestStub = t.context.sandbox
    .stub()
    .resolves({ accessToken: "abc123" });

  // Create an instance of TLAccessTokenAPI with the stubbed handleAPIRequest
  t.context.tlAccessTokenAPI = new TLAccessTokenAPI(
    t.context.handleAPIRequestStub
  );

  // Stub the logger
  t.context.logger = {
    error: t.context.sandbox.stub(),
    info: t.context.sandbox.stub(),
  };
});

test.afterEach((t) => {
  // Restore the sandbox after each test
  t.context.sandbox.restore();
});

test("generateAccessToken retrieves token correctly", async (t) => {
  const { tlAccessTokenAPI, logger } = t.context;

  // Mock environment variables
  process.env.CLIENT_ID = "testClientId";
  process.env.CLIENT_SECRET = "testClientSecret";

  // Mock context
  const context = {
    dataSources: { tlAccessTokenAPI },
    logger,
  };

  const args = {
    scope: "testScope",
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/callback",
    code: "testCode",
  };

  const result = await generateAccessToken(null, args, context);

  t.deepEqual(result, { accessToken: "abc123" });
  t.true(logger.info.calledWith("Access token generated successfully"));
});

test("generateAccessToken handles errors correctly", async (t) => {
  const { tlAccessTokenAPI, logger, handleAPIRequestStub } = t.context;

  // Stub the handleAPIRequest to throw an error
  handleAPIRequestStub.rejects(new Error("Test error"));

  // Mock environment variables
  process.env.CLIENT_ID = "testClientId";
  process.env.CLIENT_SECRET = "testClientSecret";

  // Mock context
  const context = {
    dataSources: { tlAccessTokenAPI },
    logger,
  };

  const args = {
    scope: "testScope",
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/callback",
    code: "testCode",
  };

  await t.throwsAsync(() => generateAccessToken(null, args, context), {
    instanceOf: Error,
    message: "Failed to generate access token",
  });

  t.true(logger.error.calledWith("Error generating access token: Test error"));
});
