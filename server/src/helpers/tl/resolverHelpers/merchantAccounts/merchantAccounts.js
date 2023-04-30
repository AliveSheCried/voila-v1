import { v4 as uuid_v4 } from "uuid";

export function mapMerchantAccountData(
  apiData,
  createNewIds = true,
  existingAccountIdentifiers = []
) {
  const existingAccountIdentifier =
    existingAccountIdentifiers.length > 0
      ? existingAccountIdentifiers[0]
      : null;
  const accountId = createNewIds
    ? uuid_v4()
    : existingAccountIdentifier?.parent_account_id;

  const sortCodeAccountNumberIdentifier = apiData.account_identifiers.find(
    (item) => item.type === "sort_code_account_number"
  );

  const ibanIdentifier = apiData.account_identifiers.find(
    (item) => item.type === "iban"
  );

  const accountIdentifierData = {
    id: createNewIds ? uuid_v4() : existingAccountIdentifier?.id || null,
    parent_account_id: accountId,
    type: sortCodeAccountNumberIdentifier?.type || ibanIdentifier?.type,
    account_number: sortCodeAccountNumberIdentifier?.account_number || null,
    iban: ibanIdentifier?.iban || null,
    swift: null,
    branch_number: sortCodeAccountNumberIdentifier?.sort_code || null,
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
