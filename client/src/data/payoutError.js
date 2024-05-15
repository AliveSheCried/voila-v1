const payoutError = {
  blocked:
    "The refund was blocked due to a regulatory requirement. This may happen if the payee fails a sanctions check.",
  insufficient_funds: `The merchant account did not contain enough funds to make this refund.`,
  invalid_iban: `The IBAN that your user provided at the creation of the pay-in this refund is for was invalid.`,
  invalid_scan: `We could not convert the beneficiary’s sort code and account number to an IBAN.`,
  returned: `The refund was returned by the beneficiary bank after it entered the executed status.`,
  scheme_error: `There was an issue with the selected payment provider or payment scheme.`,
  server_error: `There was an issue with the server. Please try again later.`,
  unknown: `The refund failed for an unknown reason that does not belong to any of the other reasons. Please try again later.`,
};

export default payoutError;
