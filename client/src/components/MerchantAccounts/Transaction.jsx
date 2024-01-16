import PropTypes from "prop-types";
import { useState } from "react";

const Transaction = ({ transaction }) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  const toggleDetail = (e) => {
    e.preventDefault();
    setIsDetailVisible(!isDetailVisible);
  };

  console.log(transaction);

  return (
    <>
      <tr key={transaction.id}>
        <td className="content__value--table">{transaction.type}</td>
        <td className="content__value--table">{transaction.status}</td>
        <td className="content__value--table right">
          {new Date(transaction.created_at).toLocaleDateString()}
        </td>
        <td className="content__value--table">{transaction.currency}</td>
        <td className="content__value--table right">
          {transaction.amount_in_minor}
        </td>
        <td className="content__value--table">
          {transaction.beneficiary.account_holder_name}
        </td>
        <td className="content__value--table">
          {transaction.beneficiary.reference}
        </td>
        <td className="content__value--table" id="txDetail">
          <span className="material-symbols-outlined">
            <a
              className="a--table-icon"
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
        <tr>
          <td colSpan="4"></td>
          <td colSpan="3">
            <div className="merchant-account__transaction--detail">
              <div className="merchant-account__transaction--detail--row ">
                <div className="text-xxs">
                  <strong>Account number</strong>
                </div>
                <div className="text-xxs">
                  {
                    transaction.beneficiary.account_identifiers[0]
                      .account_number
                  }
                </div>
              </div>
              <div className="merchant-account__transaction--detail--row ">
                <div className="text-xxs">
                  <strong>Sort code</strong>
                </div>
                <div className="text-xxs">
                  {transaction.beneficiary.account_identifiers[0].sort_code}
                </div>
              </div>
              <div className="merchant-account__transaction--detail--row ">
                <div className="text-xxs">
                  <strong>IBAN</strong>
                </div>
                <div className="text-xxs">
                  {transaction.beneficiary.account_identifiers[1].iban}
                </div>
              </div>
            </div>
          </td>
          <td></td>
        </tr>
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
    currency: PropTypes.string,
    amount_in_minor: PropTypes.number,
    beneficiary: PropTypes.shape({
      account_holder_name: PropTypes.string,
      reference: PropTypes.string,
    }),
  }),
};

export default Transaction;
