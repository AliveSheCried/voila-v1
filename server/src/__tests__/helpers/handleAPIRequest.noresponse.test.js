// handleAPIRequest.nonresponse.test.js
import test from "ava";
import axios from "axios";
import sinon from "sinon";
import { handleAPIRequest } from "../../helpers/handleAPIRequest.js";

let axiosCreateStub;
let requestStub;

test.beforeEach(() => {
  // Create a new stub for axios.create before each test
  axiosCreateStub = sinon.stub(axios, "create");
  // Create a new stub for the request method
  requestStub = sinon.stub().rejects({ request: {} });
  // Make axios.create return an object with the request method stub
  axiosCreateStub.returns({ request: requestStub });
});

test.afterEach(() => {
  axiosCreateStub.restore();
});

test("handles API request with no response", async (t) => {
  requestStub.rejects({ request: {} });

  const error = await t.throwsAsync(
    handleAPIRequest("dataSource", "endpoint", "token"),
    {
      instanceOf: Error,
      message: "No response received from API",
    }
  );

  t.true(axiosCreateStub.calledOnce);
  t.true(requestStub.calledOnce);
});
