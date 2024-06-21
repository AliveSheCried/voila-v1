/*  
This test does not work. The mockDecrypt function is not called when the transactionsHandler is called.

The error message indicates that the mockDecrypt function was not called, which is why the test is failing. The mockDecrypt function is supposed to be called when the transactionsHandler function is invoked and it tries to decrypt the transactions.

In your transactionsHandler function, you are calling the decrypt function imported from ../helpers/encryptionHelper.js. However, in your test, you are mocking a function named mockDecrypt.

Parking until someone can help me with this.
*/

import test from "ava";
import mockRequire from "mock-require";
import sinon from "sinon";
import logger from "../../config/logger.js";

// Mock decrypt function
const mockDecrypt = sinon.stub().callsFake((data) => {
  console.log("Decrypt called with data:", data);
  if (data === "invalid_iv") {
    throw new Error("Invalid initialization vector");
  }
  return JSON.stringify({
    _id: "1",
    account_holder_name: "John Doe",
    reference: "Ref123",
    merchant_account_id: "acc123",
    amount_in_minor: 1000,
    currency: "GBP",
    account_identifier: { type: "iban", iban: "GB33BUKB20201555555555" },
    payoutId: "payout123",
    created_at: new Date().toISOString(),
  });
});

// Mock client
const mockClient = {
  db: () => ({
    collection: () => ({
      find: sinon.stub().returns({
        skip: sinon.stub().returns({
          limit: sinon.stub().returns({
            toArray: sinon.stub().resolves([
              {
                _id: "1",
                iv: "7133b6fd6467ce7170863a98bb899b5b",
                encryptedData:
                  "bcf3bbef07eaefbe461ccceccc6ce9c4099b32ad34ca5bafe3a0a175e1341b5ec5cef9dd66d9cddcaf816e55700172ec64fe10658669462db4200829122e8010e07e93fad09100a2ccbfb69e7333595e1dbd0e4ea3df52084458e435a2a2c73ee7687409db61e5543d3342df8e9e66b16ee35a4eece5cafc8f50c9d473623a0cd5ed35c4d6dfca2b7dd87375573182013368152f390ddbba0469ccb6e1aac829b3cbe221efbaf2a010f9dbb6f3f775f4a6c60640d23c5b64dfc8dd5c2d56bb68dd09b2f7e90c6b909edbc2da76cb815bda124dbf081e4d59b0522f1b093d7ca8604837be3f7092401e0a74aa90cebac0db9bff8bfdb093cce73b99c65b8acdc922bb71ddbceb8fd2ddce20ba4e58cb5d2f580183fb896c738f89e917a997934277af14ff16035cd80d484aafaea71c614a833701697e6e3cfce0bae85a885a9bf9b3ec0574733fea362482daa6573fed050c6709972b0794e13450e568f87b0afe731df5958287702eaeaf5bb92385d5dd674c9c767cc631127bb88004c6aa88",
              },
            ]),
          }),
        }),
      }),
      countDocuments: sinon.stub().resolves(1),
    }),
  }),
};

let transactionsHandler;
let transactionsModule;

test.beforeEach(async () => {
  sinon.restore();
  sinon.stub(logger, "info");
  sinon.stub(logger, "error");

  // Use mock-require to replace the actual imports with mocks
  mockRequire("../../helpers/encryptionHelper.js", { decrypt: mockDecrypt });

  // Import the module after mocking the dependencies
  transactionsModule = await import("../../routes/transactions.js");
  transactionsHandler = transactionsModule.transactionsHandler(mockClient);

  console.log("transactionsHandler loaded");
});

test.afterEach.always(() => {
  sinon.restore();
  mockRequire.stopAll();
});

test("transactionsHandler retrieves and decrypts transactions correctly", async (t) => {
  const req = {
    query: {
      page: 1,
      pageSize: 10,
      search: "",
    },
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  console.log("Before handler call, mockDecrypt called:", mockDecrypt.called);
  console.log("Before handler call, logger.info called:", logger.info.called);

  // Reset the mockDecrypt before each test
  mockDecrypt.resetHistory();

  await transactionsHandler(req, res);

  console.log("After handler call, mockDecrypt called:", mockDecrypt.called);
  console.log("After handler call, logger.info called:", logger.info.called);

  t.true(
    mockDecrypt.calledOnceWith(
      "bcf3bbef07eaefbe461ccceccc6ce9c4099b32ad34ca5bafe3a0a175e1341b5ec5cef9dd66d9cddcaf816e55700172ec64fe10658669462db4200829122e8010e07e93fad09100a2ccbfb69e7333595e1dbd0e4ea3df52084458e435a2a2c73ee7687409db61e5543d3342df8e9e66b16ee35a4eece5cafc8f50c9d473623a0cd5ed35c4d6dfca2b7dd87375573182013368152f390ddbba0469ccb6e1aac829b3cbe221efbaf2a010f9dbb6f3f775f4a6c60640d23c5b64dfc8dd5c2d56bb68dd09b2f7e90c6b909edbc2da76cb815bda124dbf081e4d59b0522f1b093d7ca8604837be3f7092401e0a74aa90cebac0db9bff8bfdb093cce73b99c65b8acdc922bb71ddbceb8fd2ddce20ba4e58cb5d2f580183fb896c738f89e917a997934277af14ff16035cd80d484aafaea71c614a833701697e6e3cfce0bae85a885a9bf9b3ec0574733fea362482daa6573fed050c6709972b0794e13450e568f87b0afe731df5958287702eaeaf5bb92385d5dd674c9c767cc631127bb88004c6aa88"
    )
  );
  t.true(res.status.calledOnceWith(200));
  t.true(
    res.json.calledOnceWith({
      transactions: [
        {
          _id: "1",
          account_holder_name: "John Doe",
          reference: "Ref123",
          merchant_account_id: "acc123",
          amount_in_minor: 1000,
          currency: "GBP",
          account_identifier: { type: "iban", iban: "GB33BUKB20201555555555" },
          payoutId: "payout123",
          created_at: new Date().toISOString(),
        },
      ],
      total: 1,
    })
  );
  t.true(logger.info.calledOnceWith("Decrypted transaction:", sinon.match.any));
});

test("transactionsHandler handles errors correctly", async (t) => {
  const req = {
    query: {
      page: 1,
      pageSize: 10,
      search: "",
    },
  };
  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  };

  const mockClientWithError = {
    db: () => ({
      collection: () => ({
        find: sinon.stub().returns({
          skip: sinon.stub().returns({
            limit: sinon.stub().returns({
              toArray: sinon.stub().rejects(new Error("Test error")),
            }),
          }),
        }),
        countDocuments: sinon.stub().resolves(1),
      }),
    }),
  };

  console.log("Before handler call, logger.error called:", logger.error.called);

  const handler = transactionsModule.transactionsHandler(mockClientWithError);
  await handler(req, res);

  console.log("After handler call, logger.error called:", logger.error.called);

  t.true(res.status.calledOnceWith(500));
  t.true(res.json.calledOnceWith({ message: "Failed to fetch transactions" }));
  t.true(
    logger.error.calledOnceWith(
      "Error fetching transactions:",
      sinon.match.instanceOf(Error)
    )
  );
});

export default test;
