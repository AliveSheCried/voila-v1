import test from "ava";
import sinon from "sinon";
import logger from "../../config/logger.js";
import { errorHandler } from "../../middleware/errorHandler.js";

test.beforeEach((t) => {
  // Create a sandbox for stubbing
  t.context.sandbox = sinon.createSandbox();

  // Stub the logger.error method
  t.context.loggerErrorStub = t.context.sandbox.stub(logger, "error");
});

test.afterEach.always((t) => {
  // Restore the sandbox after each test
  t.context.sandbox.restore();
});

test("errorHandler logs the error and sends a 500 response", (t) => {
  const { loggerErrorStub } = t.context;
  const err = new Error("Test error");
  const req = {};
  const res = {
    status: sinon.stub().returnsThis(),
    send: sinon.stub(),
  };
  const next = sinon.stub();

  errorHandler(err, req, res, next);

  t.true(loggerErrorStub.calledWith(err.stack));
  t.true(res.status.calledWith(500));
  t.true(res.send.calledWith({ error: "Something went wrong!" }));
});

export default test;
