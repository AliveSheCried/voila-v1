import { createPayoutExternalAccount } from "../../../../schema/TrueLayer/MerchantAccountPayout/resolverCreatePayout.js";

jest.mock("../../../../datasources/trueLayer/tlPayout_api.js", () => ({
  tlPayoutAPI: {
    createMerchantAccountPayout: jest.fn(),
  },
}));

describe("createPayout resolver", () => {
  let mockToken, mockDataSources;

  beforeAll(() => {
    mockToken = "test-token";
    mockDataSources = {
      tlPayoutAPI: require("../../../../datasources/trueLayer/tlPayout_api.js")
        .tlPayoutAPI,
    };
  });

  // Happy path test with account_identifier: sort_code_account_number
  it("creates a payout using the provided data (account_identifier: sort_code_account_number); returns the payout id", async () => {
    mockDataSources.tlPayoutAPI.createMerchantAccountPayout.mockImplementation(
      () =>
        Promise.resolve({
          id: 999,
        })
    );

    const result = await createPayoutExternalAccount(
      {},
      {
        reference: "sort_code_account_number test",
        account_holder_name: "UK vendor",
        merchant_account_id: 1,
        amount_in_minor: 123,
        currency: "GBP",
        account_identifier: {
          type: "sort_code_account_number",
          sort_code: "123456",
          account_number: "12345678",
        },
      },
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(
      mockDataSources.tlPayoutAPI.createMerchantAccountPayout
    ).toHaveBeenCalledWith(
      "sort_code_account_number test",
      "UK vendor",
      1,
      123,
      "GBP",
      {
        account_number: "12345678",
        sort_code: "123456",
        type: "sort_code_account_number",
      },
      mockToken
    );
    expect(result).toEqual({ id: 999 });
  });

  // Happy path test with account_identifier: iban
  it("creates a payout using the provided data (account_identifier: iban); returns the payout id", async () => {
    mockDataSources.tlPayoutAPI.createMerchantAccountPayout.mockImplementation(
      () =>
        Promise.resolve({
          id: 998,
        })
    );

    const result = await createPayoutExternalAccount(
      {},
      {
        reference: "IBAN test",
        account_holder_name: "EU vendor",
        merchant_account_id: 1,
        amount_in_minor: 456,
        currency: "EUR",
        account_identifier: {
          type: "iban",
          iban: "FR33BUKB20201555555555",
        },
      },
      { token: mockToken, dataSources: mockDataSources }
    );

    expect(
      mockDataSources.tlPayoutAPI.createMerchantAccountPayout
    ).toHaveBeenCalledWith(
      "IBAN test",
      "EU vendor",
      1,
      456,
      "EUR",
      {
        iban: "FR33BUKB20201555555555",
        type: "iban",
      },
      mockToken
    );
    expect(result).toEqual({ id: 998 });
  });

  // Error path test where currency is not uppercase
  it("throws an error if currency is not uppercase", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "gbp",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Currency must be a 3 character uppercase code");
  });

  //Error path test where currency is not 3 characters
  it("throws an error if currency is not 3 characters", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GB",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Currency must be a 3 character uppercase code");
  });

  //Error path test where amount_in_minor is not an integer
  it("throws an error if amount_in_minor is not an integer", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: "123",
          currency: "GBP",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("amount_in_minor must be a positive integer");
  });

  //Error path test where amount_in_minor is not a positive integer
  it("throws an error if amount_in_minor is not a positive integer", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: -123,
          currency: "GBP",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("amount_in_minor must be a positive integer");
  });

  //Error path test where account_holder_name doesn't match regex
  it("throws an error if account_holder_name doesn't match regex", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "invalid`name",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GBP",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Invalid characters in account_holder_name");
  });

  //Error path test where iban doesn't match regex
  it("throws an error if iban doesn't match regex", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "EU vendor",
          merchant_account_id: 1,
          amount_in_minor: 456,
          currency: "EUR",
          account_identifier: {
            type: "iban",
            iban: "invalid",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Invalid IBAN");
  });

  //Error path test where sort_code is not 6 characters
  it("throws an error if sort_code is not 6 characters", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GBP",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "12345",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Invalid sort code");
  });

  //Error path test where account_number is not 8 characters
  it("throws an error if account_number is not 8 characters", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GBP",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "1234567",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Invalid account number");
  });

  //Error path test where account_identifier type is not valid
  it("throws an error if account_identifier type is not valid", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GBP",
          account_identifier: {
            type: "invalid",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Invalid account identifier type");
  });

  //Error path test where account_identifier type is not an object
  it("throws an error if account_identifier type is not an object", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GBP",
          account_identifier: "invalid",
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("account_identifier must be an object");
  });

  //Error path test where reference is not provided
  it("throws an error if reference is not provided", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GBP",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Reference is required");
  });

  //Error path test where account_holder_name is not provided
  it("throws an error if account_holder_name is not provided", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GBP",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Account holder name is required");
  });

  //Error path test where merchant_account_id is not provided
  it("throws an error if merchant_account_id is not provided", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          amount_in_minor: 123,
          currency: "GBP",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Merchant account ID is required");
  });

  //Error path test where currency is not provided
  it("throws an error if currency is not provided", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Currency is required");
  });

  //Error path test where account_identifier is not provided
  it("throws an error if account_identifier is not provided", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GBP",
        },
        { token: mockToken, dataSources: mockDataSources }
      )
    ).rejects.toThrow("Account identifier is required");
  });

  //Error path test where token is not provided
  it("throws an error if token is not provided", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GBP",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { dataSources: mockDataSources }
      )
    ).rejects.toThrow("Token is required");
  });

  //Error path test where dataSources is not provided
  it("throws an error if dataSources is not provided", async () => {
    await expect(
      createPayoutExternalAccount(
        {},
        {
          reference: "sort_code_account_number test",
          account_holder_name: "UK vendor",
          merchant_account_id: 1,
          amount_in_minor: 123,
          currency: "GBP",
          account_identifier: {
            type: "sort_code_account_number",
            sort_code: "123456",
            account_number: "12345678",
          },
        },
        { token: mockToken }
      )
    ).rejects.toThrow("DataSources is required");
  });
});
