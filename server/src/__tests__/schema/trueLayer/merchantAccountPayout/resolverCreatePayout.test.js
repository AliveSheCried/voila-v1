// resolverCreatePayout.test.js
import test from "ava";
import sinon from "sinon";
import { createPayoutExternalAccount } from "../../../../schema/TrueLayer/MerchantAccountPayout/resolverCreatePayout.js";

test.beforeEach((t) => {
  // Create a sandbox for stubbing
  t.context.sandbox = sinon.createSandbox();

  // Mock the logger methods
  const logger = {
    info: t.context.sandbox.stub(),
    error: t.context.sandbox.stub(),
  };

  // Mock the encrypt function
  const encrypt = t.context.sandbox.stub().returns("encryptedData");

  // Mock the validator
  const validator = {
    isUppercase: t.context.sandbox.stub().returns(true),
  };

  // Mock the dbClient
  global.dbClient = {
    db: t.context.sandbox.stub().returns({
      collection: t.context.sandbox.stub().returns({
        insertOne: t.context.sandbox.stub().resolves("insertResult"),
      }),
    }),
  };

  // Add the stubbed functions to the context
  t.context.context = {
    logger,
    encrypt,
    validator,
    dataSources: {
      tlPayoutAPI: {
        createMerchantAccountPayout: t.context.sandbox
          .stub()
          .resolves({ id: "payoutId" }),
      },
    },
  };
});

test.afterEach.always((t) => {
  // Restore the sandbox after each test
  t.context.sandbox.restore();
});

test("createPayoutExternalAccount resolver", async (t) => {
  // Mock arguments
  const args = {
    reference: "reference",
    account_holder_name: "Wayne Enterprises",
    merchant_account_id: "merchant_account_id",
    amount_in_minor: 100,
    currency: "USD",
    account_identifier: { type: "iban", iban: "GB82WEST12345698765432" },
  };

  // Call the resolver
  const result = await createPayoutExternalAccount(
    null,
    args,
    t.context.context
  );

  // Check if the expected output is returned
  t.deepEqual(result, { id: "payoutId" });
});
