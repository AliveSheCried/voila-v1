import { v4 as uuid_v4 } from "uuid";

export function mapMerchantAccountData(apiData) {
  const accountId = uuid_v4();

  const accountIdentifierData = {
    id: uuid_v4(),
    parent_account_id: accountId,
    type: "sort_code_account_number",
    account_number:
      apiData.account_identifiers.find(
        (item) => item.type === "sort_code_account_number"
      )?.account_number || null,
    iban:
      apiData.account_identifiers.find((item) => item.type === "iban")?.iban ||
      null,
    swift: null,
    branch_number:
      apiData.account_identifiers.find(
        (item) => item.type === "sort_code_account_number"
      )?.sort_code || null,
  };

  const accountData = {
    id: accountId,
    asset_id: "533ed8dd-e28e-4526-87ab-158b51b22c16",
    display_name: apiData.account_holder_name,
    description: null,
    currency: apiData.currency,
    available_balance_in_minor: apiData.available_balance_in_minor,
    current_balance_in_minor: apiData.current_balance_in_minor,
    account_id: apiData.id,
    provider_id: "106fe591-83df-4ccc-a48c-e6404e47cdb0",
  };

  return { accountData, accountIdentifierData };
}
