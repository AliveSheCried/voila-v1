import PropTypes from "prop-types";
import { useState } from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import TransactionDetail from "./TransactionDetail";

const Transaction = ({ transaction }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const { formattedTransactionAmount } = formatCurrency(
    transaction.currency,
    0,
    0,
    transaction.amount_in_minor
  );

  const toggleDetail = (e) => {
    e.preventDefault();
    setIsDetailVisible(!isDetailVisible);
  };

  const date = new Date(transaction.executed_at).toLocaleDateString();
  // Use optional chaining and provide default values as needed
  const accountNumber =
    transaction.beneficiary.account_identifiers?.[0]?.account_number ?? "N/A";
  const sortCode =
    transaction.beneficiary.account_identifiers?.[0]?.sort_code ?? "N/A";
  // Safely access the iban of the second account identifier, if it exists
  const iban =
    transaction.beneficiary.account_identifiers?.[
      transaction.beneficiary.account_identifiers.length - 1
    ]?.iban ?? "N/A";

  return (
    <>
      <tr key={transaction.id}>
        <td className="content__value--table">{transaction.type}</td>
        <td className="content__value--table">{transaction.status}</td>
        <td className="content__value--table right">{date}</td>
        <td className="content__value--table">{transaction.currency}</td>
        <td className="content__value--table--red right">
          {formattedTransactionAmount}
        </td>
        <td className="content__value--table">
          {transaction.beneficiary.account_holder_name}
        </td>
        <td className="content__value--table">
          {transaction.beneficiary.reference}
        </td>
        <td className="content__value--table absolute-right">
          <span className="material-symbols-outlined">
            <a
              className={`a--table-icon ${
                isDetailVisible ? "a--table-icon__selected" : ""
              }`}
              href="#"
              title="View transaction details"
              onClick={toggleDetail}
            >
              {isDetailVisible ? "expand_circle_up" : "expand_circle_down"}
            </a>
          </span>
        </td>
      </tr>

      {isDetailVisible && (
        <TransactionDetail
          accountNumber={accountNumber}
          sortCode={sortCode}
          iban={iban}
        />
      )}
    </>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    status: PropTypes.string,
    created_at: PropTypes.string,
    executed_at: PropTypes.string,
    settled_at: PropTypes.string,
    currency: PropTypes.string,
    amount_in_minor: PropTypes.number,
    beneficiary: PropTypes.shape({
      account_holder_name: PropTypes.string,
      reference: PropTypes.string,
      account_identifiers: PropTypes.arrayOf(
        PropTypes.shape({
          account_number: PropTypes.string,
          sort_code: PropTypes.string,
          iban: PropTypes.string,
        })
      ),
    }),
  }),
};

export default Transaction;
