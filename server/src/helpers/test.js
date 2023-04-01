try {
  await prisma.accounts.create({
    data: item,
  });
} catch (err) {
  if (err.code === "P2002") {
    // unique constraint violation error
    // handle the error here
  } else if (err.code === "P2003") {
    // data validation error
    // handle the error here
  } else {
    // handle other database-related errors here
  }
}

///
// errorHandling.js
const handleDatabaseError = (error) => {
  if (error.code === "P2000") {
    // Column length
    throw new Error("A unique constraint has been violated");
  } else {
    throw new Error("An error occurred while accessing the database");
  }
};

export { handleDatabaseError };

// resolver.js
  import { handleDatabaseError } from "./errorHandling.js";

const queries = {
  // ...
  merchantAccounts: async (_, __, { token, dataSources }) => {
    try {
      await prisma.$transaction(async () => {
        // ...
        for (const item of merchantAccountsDb) {
          await prisma.accounts
            .create({
              data: item,
            })
            .catch((error) => handleDatabaseError(error));
        }
      });
    } catch (error) {
      console.log(error);
    }
    // ...
  },
  // ...
};

export const resolvers = { queries };

---
{
	"items": [
		{
			"type": "payout",
			"id": "dec32c60-a0eb-4355-9741-fa3cba291cac",
			"currency": "GBP",
			"amount_in_minor": 50000,
			"status": "executed",
			"created_at": "2022-12-27T11:11:38.636461Z",
			"executed_at": "2022-12-27T11:11:40.103Z",
			"beneficiary": {
				"type": "external_account",
				"account_holder_name": "VoilaTestMerchant",
				"account_identifier": {
					"type": "sort_code_account_number",
					"sort_code": "040668",
					"account_number": "00000871"
				},
				"account_identifiers": [
					{
						"type": "sort_code_account_number",
						"sort_code": "040668",
						"account_number": "00000871"
					},
					{
						"type": "iban",
						"iban": "GB75CLRB04066800000871"
					}
				],
				"reference": "TestPayout 02"
			},
			"context_code": "withdrawal",
			"payout_id": "dec32c60-a0eb-4355-9741-fa3cba291cac"
		},
		{
			"type": "payout",
			"id": "1676d320-efd7-43af-a336-133b73c074b9",
			"currency": "GBP",
			"amount_in_minor": 27,
			"status": "executed",
			"created_at": "2022-12-27T10:55:07.701277Z",
			"executed_at": "2022-12-27T10:55:09.067Z",
			"beneficiary": {
				"type": "external_account",
				"account_holder_name": "John Smith",
				"account_identifier": {
					"type": "sort_code_account_number",
					"sort_code": "040668",
					"account_number": "00000871"
				},
				"account_identifiers": [
					{
						"type": "sort_code_account_number",
						"sort_code": "040668",
						"account_number": "00000871"
					},
					{
						"type": "iban",
						"iban": "GB75CLRB04066800000871"
					}
				],
				"reference": "Reference Exmample"
			},
			"context_code": "withdrawal",
			"payout_id": "1676d320-efd7-43af-a336-133b73c074b9"
		},
		{
			"type": "payout",
			"id": "9b029b59-7612-4bce-a839-3e58c504e2a3",
			"currency": "GBP",
			"amount_in_minor": 27,
			"status": "executed",
			"created_at": "2022-12-13T20:49:05.973936Z",
			"executed_at": "2022-12-13T20:49:08.030Z",
			"beneficiary": {
				"type": "external_account",
				"account_holder_name": "John Smith",
				"account_identifier": {
					"type": "sort_code_account_number",
					"sort_code": "040668",
					"account_number": "00000871"
				},
				"account_identifiers": [
					{
						"type": "sort_code_account_number",
						"sort_code": "040668",
						"account_number": "00000871"
					},
					{
						"type": "iban",
						"iban": "GB75CLRB04066800000871"
					}
				],
				"reference": "Reference Exmample"
			},
			"context_code": "withdrawal",
			"payout_id": "9b029b59-7612-4bce-a839-3e58c504e2a3"
		},
		{
			"type": "payout",
			"id": "0f67d2cf-012b-4ab4-9846-6b15c9e3f016",
			"currency": "GBP",
			"amount_in_minor": 27,
			"status": "executed",
			"created_at": "2022-10-30T20:29:17.990381Z",
			"executed_at": "2022-10-30T20:29:19.977Z",
			"beneficiary": {
				"type": "external_account",
				"account_holder_name": "John Smith",
				"account_identifier": {
					"type": "sort_code_account_number",
					"sort_code": "040668",
					"account_number": "00000871"
				},
				"account_identifiers": [
					{
						"type": "sort_code_account_number",
						"sort_code": "040668",
						"account_number": "00000871"
					},
					{
						"type": "iban",
						"iban": "GB75CLRB04066800000871"
					}
				],
				"reference": "Reference Exmample"
			},
			"context_code": "withdrawal",
			"payout_id": "0f67d2cf-012b-4ab4-9846-6b15c9e3f016"
		},
		{
			"type": "merchant_account_payment",
			"id": "f943fdb1-a25b-4842-8f19-8cc060f8edc4",
			"currency": "GBP",
			"amount_in_minor": 1,
			"status": "settled",
			"settled_at": "2022-10-29T18:02:01.640Z",
			"payment_source": {
				"id": "080ad87d-0d14-40cf-99c9-efb23b3d589a",
				"account_holder_name": "JOHN SANDBRIDGE",
				"account_identifiers": [
					{
						"type": "sort_code_account_number",
						"sort_code": "040668",
						"account_number": "00000871"
					},
					{
						"type": "iban",
						"iban": "GB75CLRB04066800000871"
					}
				],
				"user_id": "4ebf6f44-f8a7-4647-8a39-a546a0b4d962"
			},
			"payment_id": "ce02bcbb-0b9d-49ad-a5bf-5da20a75c9ea"
		},
		{
			"type": "external_payment",
			"id": "22759cf6-b942-4157-a195-8e42f8646bde",
			"currency": "GBP",
			"amount_in_minor": 100000,
			"status": "settled",
			"settled_at": "2022-10-29T17:12:17.747Z",
			"remitter": {
				"account_holder_name": "TRUELAYER",
				"account_identifier": {
					"type": "sort_code_account_number",
					"sort_code": "040668",
					"account_number": "00000683"
				},
				"account_identifiers": [
					{
						"type": "sort_code_account_number",
						"sort_code": "040668",
						"account_number": "00000683"
					},
					{
						"type": "iban",
						"iban": "GB10CLRB04066800000683"
					}
				],
				"reference": "Internal topup."
			}
		}
	]
}