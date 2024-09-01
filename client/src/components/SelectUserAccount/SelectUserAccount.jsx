import propTypes from "prop-types";

const SelectUserAccount = ({
  accounts,
  selectedAccountId,
  onAccountChange,
  onGetData,
  dataType,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
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
      {dataType === "transactions" && (
        <div className="merchant-account__search-container">
          <div>
            <div className="content__label">Date range - from & to</div>
            <div className="input__merchant-account merchant-account__search-dates text-sm">
              <div>
                <div>
                  <input
                    type="date"
                    id="dateFrom"
                    value={dateFrom}
                    onChange={onDateFromChange}
                  />
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="date"
                    id="dateTo"
                    value={dateTo}
                    onChange={onDateToChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="absolute-right sp-top-sm">
        <button
          className={`btn ${
            !selectedAccountId ? "btn--tertiary-inactive" : "btn--tertiary"
          }`}
          onClick={onGetData}
        >
          Get {dataType}
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
  onGetData: propTypes.func.isRequired,
  dataType: propTypes.string.isRequired,
  dateFrom: propTypes.string,
  dateTo: propTypes.string,
  onDateFromChange: propTypes.func,
  onDateToChange: propTypes.func,
};
