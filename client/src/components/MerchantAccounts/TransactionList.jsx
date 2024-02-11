import PropTypes from "prop-types";
import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";

//components
import TransactionExternal from "./TransactionExternal";
import TransactionMerchantAccount from "./TransactionMerchantAccount";
import TransactionPayout from "./TransactionPayout";

//pagination
const ITEMS_PER_PAGE = 10;

const TransactionList = ({ transctions, availableBalance, currency }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const paginatedTransactions = [...transctions]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    // .filter((transaction) => transaction.__typename === "Payout")
    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const { formattedAvailableBalance } = formatCurrency(
    currency,
    availableBalance,
    0
  );

  return (
    <>
      <div className="merchant-account__container sp-bottom-sm">
        <table className="merchant-account--table">
          <tbody>
            <tr>
              <th className="content__key--table">Type</th>
              <th className="content__key--table">Status</th>
              <th className="content__key--table right">Transaction date</th>
              <th className="content__key--table">Currency</th>
              <th className="content__key--table right">Amount</th>
              <th className="content__key--table">Party</th>
              <th className="content__key--table">Transaction reference</th>
              <th className="content__key--table absolute-right">Details</th>
            </tr>
            {paginatedTransactions.map((transaction) => {
              if (transaction.type === "payout") {
                return (
                  <TransactionPayout
                    key={transaction.id}
                    transaction={transaction}
                  />
                );
              } else if (transaction.type === "external_payment") {
                return (
                  <TransactionExternal
                    key={transaction.id}
                    transaction={transaction}
                  />
                );
              } else if (transaction.type === "merchant_account_payment") {
                return (
                  <TransactionMerchantAccount
                    key={transaction.id}
                    transaction={transaction}
                  />
                );
              } else {
                return null;
              }
            })}

            <tr>
              <td colSpan={2}></td>
              <td className="content__key--table right">Available balance</td>
              <td className="content__value--table--white-highlight padding-left-xs">
                <strong>{currency}</strong>
              </td>
              <td className="content__value--table--white-highlight right">
                <strong>{formattedAvailableBalance}</strong>
              </td>
              <td colSpan={3}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="sp-top-sm sp-bottom-sm right">
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
  availableBalance: PropTypes.string,
  currency: PropTypes.string,
};

export default TransactionList;
