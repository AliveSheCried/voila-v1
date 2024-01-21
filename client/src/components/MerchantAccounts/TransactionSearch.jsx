import PropTypes from "prop-types";

const TransactionSearch = ({
  onAccountChange,
  onDateFromChange,
  onDateToChange,
  onGetTransactions,
  dateFrom,
  dateTo,
  selectedAccountId,
  merchantAccounts,
}) => {
  return (
    <div className="token__container">
      <div className="token__title">
        <span
          className={`material-symbols-outlined token__icon token__icon--bank`}
        >
          manage_search
        </span>
        Transaction search
      </div>
      <div className="merchant-account__search-container">
        <div className="sp-right-md">
          <div className="content__label sp-top-sm">Merchant account</div>
          <div>
            <select value={selectedAccountId} onChange={onAccountChange}>
              <option value="">-- Select merchant account --</option>
              {merchantAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {"CURRENCY: " + account.currency + " - ID: " + account.id}
                  {/* Change to IBAN / Account Number*/}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="content__label sp-top-sm">Date range - from & to</div>
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
          <div className="absolute-right sp-top-sm">
            <button className="btn btn--tertiary" onClick={onGetTransactions}>
              Search transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

TransactionSearch.propTypes = {
  onAccountChange: PropTypes.func.isRequired,
  onDateFromChange: PropTypes.func.isRequired,
  onDateToChange: PropTypes.func.isRequired,
  onGetTransactions: PropTypes.func.isRequired,
  dateFrom: PropTypes.string.isRequired,
  dateTo: PropTypes.string.isRequired,
  selectedAccountId: PropTypes.string.isRequired,
  merchantAccounts: PropTypes.array.isRequired,
};

export default TransactionSearch;
