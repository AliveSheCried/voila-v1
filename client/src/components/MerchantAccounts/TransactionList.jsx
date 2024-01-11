import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";

//components
import Transaction from "./Transaction";

//pagination
const ITEMS_PER_PAGE = 10;

const TransactionList = ({ transctions, selectedAccountId }) => {
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const [currentPage, setCurrentPage] = useState(0);

  const paginatedTransactions = [...transctions]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .filter((transaction) => transaction.__typename === "Payout")
    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const selectedAccountData = merchantAccounts.find(
    (account) => account.id === selectedAccountId
  );
  console.log("selectedAccountId", selectedAccountId);
  console.log("merchantAccounts", merchantAccounts);
  console.log("selectedAccountData", selectedAccountData);
  let selectedAccountAvailableBalance;
  let selectedAccountCurrency;

  if (selectedAccountData) {
    selectedAccountAvailableBalance =
      selectedAccountData.available_balance_in_minor;
    selectedAccountCurrency = selectedAccountData.currency;
  }

  return (
    <>
      <div className="merchant-account__container sp-bottom-sm">
        <table className="merchant-account--table">
          <tbody>
            <tr>
              <th className="content__key--table">Type</th>
              <th className="content__key--table">Status</th>
              <th className="content__key--table right">Created date</th>
              <th className="content__key--table">Currency</th>
              <th className="content__key--table right">Amount</th>
              <th className="content__key--table">Account holder name</th>
              <th className="content__key--table">Payment reference</th>
              <th className="content__key--table">Details</th>
            </tr>
            {paginatedTransactions.map((transaction) => (
              <Transaction transaction={transaction} key={transaction.id} />
            ))}

            <tr>
              <td colSpan={3}></td>
              <td className="content__key--table">Available balance</td>

              <td className="content__value--table--white-highlight right">
                {`${selectedAccountCurrency}  ${new Intl.NumberFormat(
                  "en-GB"
                ).format(selectedAccountAvailableBalance)}`}
              </td>
              <td colSpan={3}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="sp-top-sm right">
        <button
          className="btn btn--quaternary sp-right-sm "
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className="btn btn--quaternary"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={
            (currentPage + 1) * ITEMS_PER_PAGE >= transctions.length ||
            paginatedTransactions.length === 0
          }
        >
          Next
        </button>
      </div>
    </>
  );
};

TransactionList.propTypes = {
  transctions: PropTypes.array.isRequired,
  selectedAccountId: PropTypes.string.isRequired,
};

export default TransactionList;
