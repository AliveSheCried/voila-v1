const createPayoutExternalAccount = async (
  _,
  {
    reference,
    account_holder_name,
    merchant_account_id,
    amount_in_minor,
    currency,
    account_identifier,
  },
  { token, dataSources, validator, logger, encrypt }
) => {
  // Validate currency is 3 characters long and only contains uppercase letters
  if (!validator.isUppercase(currency) || currency.length !== 3) {
    logger.error("Currency must be a 3 character uppercase code");
    throw new Error("Currency must be a 3 character uppercase code");
  }

  // Validate amount_in_minor is a positive integer
  if (!Number.isInteger(amount_in_minor) || amount_in_minor < 0) {
    logger.error("amount_in_minor must be a positive integer");
    throw new Error("amount_in_minor must be a positive integer");
  }

  // Validate account holder name against the provided regex
  const nameRegex = /^[a-zA-Z0-9\/\-?:().,'+\s#=!"%&*<>;{@\r\n]*$/;
  if (!nameRegex.test(account_holder_name)) {
    logger.error("Invalid characters in account_holder_name");
    throw new Error("Invalid characters in account_holder_name");
  }

  //validate account_identifier is an object
  if (typeof account_identifier !== "object") {
    logger.error("account_identifier must be an object");
    throw new Error("account_identifier must be an object");
  }

  // Validate account_identifier based on its type
  if (account_identifier.type.toLowerCase() === "iban") {
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;
    if (!ibanRegex.test(account_identifier.iban)) {
      logger.error("Invalid IBAN");
      throw new Error("Invalid IBAN");
    }
  } else if (
    account_identifier.type.toLowerCase() === "sort_code_account_number"
  ) {
    const sortCodeRegex = /^[0-9]{6}$/;
    const accountNumberRegex = /^[0-9]{8}$/;

    if (!sortCodeRegex.test(account_identifier.sort_code)) {
      logger.error("Invalid sort code");
      throw new Error("Invalid sort code");
    }
    if (!accountNumberRegex.test(account_identifier.account_number)) {
      logger.error("Invalid account number");
      throw new Error("Invalid account number");
    }
  } else {
    logger.error("Invalid account identifier type");
    throw new Error("Invalid account identifier type");
  }

  try {
    const responseData =
      await dataSources.tlPayoutAPI.createMerchantAccountPayout(
        reference,
        account_holder_name,
        merchant_account_id,
        amount_in_minor,
        currency,
        account_identifier,
        token
      );

    // Confirm connection to MongoDB
    const { dbClient } = global;
    if (!dbClient) {
      logger.error("No database client");
      throw new Error("No database client");
    }

    const myDb = dbClient.db("VoilaDev");
    const myCollection = myDb.collection("MerchantPayouts");

    // Prepare and encrypt data to be saved in MongoDB in one step
    const encryptedDocument = encrypt({
      reference,
      account_holder_name,
      merchant_account_id,
      amount_in_minor,
      currency,
      account_identifier,
      payoutId: responseData.id,
      created_at: new Date(), // Record the time of the transaction
    });

    // Log encrypted data
    logger.info("Encrypted document:", encryptedDocument);

    // Insert document into MongoDB
    const result = await myCollection.insertOne(encryptedDocument);
    logger.info("MongoDB insert result:", result);

    return responseData;
  } catch (error) {
    logger.error("Error in createPayoutExternalAccount:", error);

    throw new Error("Failed to create payout");
  }
};

export { createPayoutExternalAccount };
