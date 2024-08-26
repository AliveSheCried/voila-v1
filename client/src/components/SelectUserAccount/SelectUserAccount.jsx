import propTypes from "prop-types";

const SelectUserAccount = ({
  accounts,
  selectedAccountId,
  onAccountChange,
  onGetDirectDebits,
}) => {
  return (
    <>
      <div className="content__label">Select user account</div>
      <div>
        <select id="accountSelect" onChange={onAccountChange}>
          <option value="">-- Select account --</option>
          {accounts.map((account) => (
            <option key={account.id} value={account.number}>
              {account.number}
            </option>
          ))}
        </select>
      </div>
      <div className="absolute-right sp-top-sm">
        <button
          className={`btn ${
            !selectedAccountId ? "btn--tertiary-inactive" : "btn--tertiary"
          }`}
          onClick={onGetDirectDebits}
        >
          Get Direct Debits
        </button>
      </div>
    </>
  );
};

export default SelectUserAccount;

SelectUserAccount.propTypes = {
  accounts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ).isRequired,
  selectedAccountId: propTypes.string.isRequired,
  onAccountChange: propTypes.func.isRequired,
  onGetDirectDebits: propTypes.func.isRequired,
};
