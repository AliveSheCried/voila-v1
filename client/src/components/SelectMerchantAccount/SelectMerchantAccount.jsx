import PropTypes from "prop-types";

const SelectMerchantAccount = ({
  label,
  //selectedAccountId,
  selectedIban,
  onAccountChange,
  merchantAccounts,
}) => {
  //console.log("Merchant Accounts: ", merchantAccounts);
  return (
    <>
      <div className="content__label">{label}</div>
      <div>
        <select
          value={selectedIban}
          onChange={(e) => {
            const selectedIban = e.target.value;
            let selectedAccount;
            for (const account of merchantAccounts) {
              const identifier = account.account_identifiers.find(
                (identifier) =>
                  identifier.type === "iban" && identifier.iban === selectedIban
              );
              if (identifier) {
                selectedAccount = account;
                break;
              }
            }
            onAccountChange(selectedAccount);
          }}
        >
          <option value="">-- Select account --</option>
          {merchantAccounts.map((account) =>
            account.account_identifiers
              .filter((identifier) => identifier.type === "iban")
              .map((identifier, index) => (
                <option key={`iban-${index}`} value={identifier.iban}>
                  {identifier.iban}
                </option>
              ))
          )}
        </select>
      </div>
    </>
  );
};

SelectMerchantAccount.propTypes = {
  label: PropTypes.string,
  //selectedAccountId: PropTypes.string.isRequired,
  selectedIban: PropTypes.string.isRequired,
  onAccountChange: PropTypes.func.isRequired,
  merchantAccounts: PropTypes.array.isRequired,
};

export default SelectMerchantAccount;
