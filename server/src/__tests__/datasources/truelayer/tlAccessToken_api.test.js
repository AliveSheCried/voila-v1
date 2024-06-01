import test from "ava";
import sinon from "sinon";
import { TLAccessTokenAPI } from "../../../datasources/trueLayer/tlAccessToken_api.js";

test.beforeEach((t) => {
  t.context.handleAPIRequestStub = sinon
    .stub()
    .resolves({ accessToken: "abc123" });
  t.context.tlAccessTokenAPI = new TLAccessTokenAPI(
    t.context.handleAPIRequestStub
  );
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test("generateAccessToken successfully generates an access token", async (t) => {
  const { tlAccessTokenAPI, handleAPIRequestStub } = t.context;
  const expectedResponse = { accessToken: "abc123" };
  handleAPIRequestStub.resolves(expectedResponse);

  const response = await tlAccessTokenAPI.generateAccessToken(
    "scope",
    "grant_type",
    "redirect_uri",
    "code"
  );

  t.true(handleAPIRequestStub.calledOnce);
  t.deepEqual(response, expectedResponse);
});

test("generateAccessToken fails to generate an access token", async (t) => {
  const { tlAccessTokenAPI, handleAPIRequestStub } = t.context;
  const error = new Error("Failed to generate access token");
  handleAPIRequestStub.rejects(error);

  await t.throwsAsync(
    () =>
      tlAccessTokenAPI.generateAccessToken(
        "scope",
        "grant_type",
        "redirect_uri",
        "code"
      ),
    { message: "Failed to generate access token" }
  );
});
