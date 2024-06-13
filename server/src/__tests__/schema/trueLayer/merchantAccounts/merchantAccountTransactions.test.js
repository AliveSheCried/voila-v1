import test from "ava";
import sinon from "sinon";
import { merchantAccountTransactions } from "../../../../schema/TrueLayer/MerchantAccounts/resolverMerchantAccountTransactions.js";

test("merchantAccountTransactions resolver", async (t) => {
  const mockResponse = {
    items: [
      {
        type: "payout",
        id: "a53df9ca-64e8-4aa5-8838-17578bf06ede",
        currency: "EUR",
        amount_in_minor: 112,
        status: "executed",
        created_at: "2024-05-26T19:42:46.344362Z",
        executed_at: "2024-05-26T19:42:47.243Z",
        beneficiary: {
          account_holder_name: "TheDuke",
          reference: "26052024 02",
          account_identifiers: [
            {
              type: "iban",
              sort_code: null,
              account_number: null,
              iban: "GB75CLRB04066800000871",
              __typename: "AccountIdentifier",
            },
          ],
          __typename: "Beneficiary",
        },
        __typename: "Payout",
      },
    ],
  };

  const dataSources = {
    tlMerchantAccountAPI: {
      getMerchantAccountTransactions: sinon.stub().returns(mockResponse),
    },
  };

  const logger = {
    info: sinon.stub(),
    error: sinon.stub(),
  };

  const result = await merchantAccountTransactions(
    null,
    { id: "testId", fromDate: "2022-01-01", toDate: "2025-01-31" },
    { token: "testToken", dataSources, logger }
  );

  t.true(
    dataSources.tlMerchantAccountAPI.getMerchantAccountTransactions.calledOnce
  );
  t.deepEqual(result, mockResponse.items);
  t.true(logger.info.called);
});

test("merchantAccountTransactions resolver handles errors", async (t) => {
  const dataSources = {
    tlMerchantAccountAPI: {
      getMerchantAccountTransactions: sinon
        .stub()
        .throws(
          new Error(
            "Failed to retrieve merchant account transactions with ID 1"
          )
        ),
    },
  };

  const logger = {
    info: sinon.stub(),
    error: sinon.stub(),
  };

  await t.throwsAsync(
    async () => {
      await merchantAccountTransactions(
        null,
        { id: "1", fromDate: "2022-01-01", toDate: "2025-01-31" },
        { token: "testToken", dataSources, logger }
      );
    },
    { message: "Failed to retrieve merchant account transactions with ID 1" }
  );

  t.true(logger.error.called);
});
