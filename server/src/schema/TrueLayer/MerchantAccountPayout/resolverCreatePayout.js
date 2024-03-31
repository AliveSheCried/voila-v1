import validator from "validator";

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
  { token, dataSources }
) => {
  //logging
  console.log("createPayout resolver called");
  console.log("Arguments:", {
    reference,
    account_holder_name,
    merchant_account_id,
    amount_in_minor,
    currency,
    account_identifier,
  });

  // Validate currency is 3 characters long and only contains uppercase letters
  if (!validator.isUppercase(currency) || currency.length !== 3) {
    throw new Error("Currency must be a 3 character uppercase code");
  }

  // Validate amount_in_minor is a positive integer
  if (!Number.isInteger(amount_in_minor) || amount_in_minor < 0) {
    throw new Error("amount_in_minor must be a positive integer");
  }

  // Validate account holder name against the provided regex
  const nameRegex = /^[a-zA-Z0-9\/\-?:().,'+\s#=!"%&*<>;{@\r\n]*$/;
  if (!nameRegex.test(account_holder_name)) {
    throw new Error("Invalid characters in account_holder_name");
  }

  //validate account_identifier is an object
  if (typeof account_identifier !== "object") {
    throw new Error("account_identifier must be an object");
  }

  // Validate account_identifier based on its type
  if (account_identifier.type.toLowerCase() === "iban") {
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;
    if (!ibanRegex.test(account_identifier.iban)) {
      throw new Error("Invalid IBAN");
    }
  } else if (
    account_identifier.type.toLowerCase() === "sort_code_account_number"
  ) {
    const sortCodeRegex = /^[0-9]{6}$/;
    const accountNumberRegex = /^[0-9]{8}$/;

    if (!sortCodeRegex.test(account_identifier.sort_code)) {
      throw new Error("Invalid sort code");
    }
    if (!accountNumberRegex.test(account_identifier.account_number)) {
      throw new Error("Invalid account number");
    }
  } else {
    throw new Error("Invalid account identifier type");
  }

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

  return responseData;
};

export { createPayoutExternalAccount };
