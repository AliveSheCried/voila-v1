// handleAPIRequest.success.test.js
import test from "ava";
import axios from "axios";
import sinon from "sinon";
import { handleAPIRequest } from "../../helpers/handleAPIRequest.js";

let axiosCreateStub;

test.beforeEach(() => {
  axiosCreateStub = sinon.stub(axios, "create");
});

test.afterEach(() => {
  axiosCreateStub.restore();
});

test("handles successful API request", async (t) => {
  axiosCreateStub.returns({
    request: sinon.stub().resolves({ data: "response" }),
  });

  const result = await handleAPIRequest("dataSource", "endpoint", "token");

  t.is(result, "response");
  t.true(axiosCreateStub.calledOnce);
});
