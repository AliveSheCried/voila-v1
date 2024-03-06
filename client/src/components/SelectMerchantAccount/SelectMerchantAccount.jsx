import PropTypes from "prop-types";

const SelectMerchantAccount = ({
  label,
  selectedAccountId,
  onAccountChange,
  merchantAccounts,
}) => {
  return (
    <>
      <div className="content__label">{label}</div>
      <div>
        <select
          value={selectedAccountId}
          onChange={(e) => {
            const selectedAccount = merchantAccounts.find(
              (account) => account.id === e.target.value
            );
            onAccountChange(selectedAccount);
          }}
        >
          <option value="">-- Select account --</option>
          {merchantAccounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.id}
              {/* Change to IBAN / Account Number*/}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

SelectMerchantAccount.propTypes = {
  label: PropTypes.string,
  selectedAccountId: PropTypes.string.isRequired,
  onAccountChange: PropTypes.func.isRequired,
  merchantAccounts: PropTypes.array.isRequired,
};

export default SelectMerchantAccount;
