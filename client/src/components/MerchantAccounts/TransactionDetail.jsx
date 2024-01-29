import PropTypes from "prop-types";

const TransactionDetail = ({ accountNumber, sortCode, iban }) => {
  return (
    <tr>
      <td colSpan="5"></td>
      <td>
        <div className="merchant-account__transaction--detail">
          <div className="text-xxs">
            <strong>Account number</strong>
          </div>
          <div className="text-xxs">
            <strong>Sort code</strong>
          </div>
          <div className="text-xxs">
            <strong>IBAN</strong>
          </div>
        </div>
      </td>
      <td colSpan="2">
        <div className="merchant-account__transaction--detail padding-right-sm">
          <div className="text-xxs">{accountNumber}</div>
          <div className="text-xxs">{sortCode}</div>
          <div className="text-xxs">{iban}</div>
        </div>
      </td>
    </tr>
  );
};

TransactionDetail.propTypes = {
  accountNumber: PropTypes.string,
  sortCode: PropTypes.string,
  iban: PropTypes.string,
};

export default TransactionDetail;
