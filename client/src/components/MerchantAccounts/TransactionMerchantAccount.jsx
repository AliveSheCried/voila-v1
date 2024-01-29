import PropTypes from "prop-types";
import { useState } from "react";
import TransactionDetail from "./TransactionDetail";

const Transaction = ({ transaction }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const toggleDetail = (e) => {
    e.preventDefault();
    setIsDetailVisible(!isDetailVisible);
  };

  const date = new Date(transaction.settled_at).toLocaleDateString();
  const accountNumber =
    transaction.payment_source.account_identifiers[0].account_number;
  const sortCode = transaction.payment_source.account_identifiers[0].sort_code;
  const iban = transaction.payment_source.account_identifiers[1].iban;

  return (
    <>
      <tr key={transaction.id}>
        <td className="content__value--table">{transaction.type}</td>
        <td className="content__value--table">{transaction.status}</td>
        <td className="content__value--table right">{date}</td>
        <td className="content__value--table">{transaction.currency}</td>
        <td className="content__value--table right">
          {transaction.amount_in_minor}
        </td>
        <td className="content__value--table">
          {transaction.payment_source.account_holder_name}
        </td>
        <td className="content__value--table"> - </td>
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
    payment_source: PropTypes.shape({
      account_holder_name: PropTypes.string,
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
