// handleAPIRequest.non2xx.test.js
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

test("handles API response with non-2xx status code", async (t) => {
  // Set up the stub to return a client object with a request method that rejects with an error
  axiosCreateStub.returns({
    request: sinon.stub().rejects({ response: { status: 400, data: "error" } }),
  });

  const error = await t.throwsAsync(() =>
    handleAPIRequest("dataSource", "endpoint", "token")
  );

  t.is(error.message, "API responded with status code 400: error");
  t.true(axiosCreateStub.calledOnce);
});
