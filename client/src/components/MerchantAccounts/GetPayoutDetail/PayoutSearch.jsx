//import PropTypes from "prop-types";

const PayoutSearch = () => {
  return (
    <div className="token__container">
      <div className="token__title">
        <span
          className={`material-symbols-outlined token__icon token__icon--bank`}
        >
          manage_search
        </span>
        Payout search
      </div>
      <div className="merchant-account__search-container">
        <div>
          <div className="content__label">Disbursement account</div>
          <select>
            <option value="">-- Select account --</option>
          </select>
        </div>
        <div>
          <div className="content__label">Payee</div>
          <div className="input__merchant-account merchant-account__search-dates text-sm">
            <div>
              <div>
                <input type="text" id="payeeName" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="content__label">Date range - from & to</div>
          <div className="input__merchant-account merchant-account__search-dates text-sm">
            <div>
              <div>
                <input type="date" id="dateFrom" />
              </div>
            </div>
            <div>
              <div>
                <input type="date" id="dateTo" />
              </div>
            </div>
          </div>
          <div className="absolute-right sp-top-sm">
            <button
              className="btn btn--tertiary"
              // className={`btn ${
              //   !selectedIban || !dateFrom || !dateTo
              //     ? "btn--tertiary-inactive"
              //     : "btn--tertiary"
              // }`}
              onClick={() => {
                console.log("Search transactions");
              }}
            >
              Search transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// PayoutSearch.propTypes = {
//   onAccountChange: PropTypes.func.isRequired,
//   onDateFromChange: PropTypes.func.isRequired,
//   onDateToChange: PropTypes.func.isRequired,
//   onGetTransactions: PropTypes.func.isRequired,
//   dateFrom: PropTypes.string.isRequired,
//   dateTo: PropTypes.string.isRequired,
//   //selectedAccountId: PropTypes.string.isRequired,
//   selectedIban: PropTypes.string.isRequired,
//   merchantAccounts: PropTypes.array.isRequired,
// };

export default PayoutSearch;
