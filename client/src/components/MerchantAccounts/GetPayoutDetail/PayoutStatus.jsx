import PropTypes from "prop-types";
import React from "react";

const PayoutStatus = ({ data }) => {
  const paymentAmount = data.payoutDetail.amount_in_minor;
  const paymentCurrency = data.payoutDetail.currency;
  const beneficiary = data.payoutDetail.beneficiary.account_holder_name;

  return (
    <div>
      <table className="merchant-account">
        <tbody>
          <tr>
            <th className="content__key--payout-status-key">Payout status</th>
            <td className="content__key--payout-status-success">
              {data.payoutDetail.status}
            </td>
            <td className="blank-cell"></td>
          </tr>
          <tr>
            <td colSpan={3} className="blank-row"></td>
          </tr>
          <tr>
            <th className="content__key">Account Holder Name</th>
            <td className="content__value">{beneficiary}</td>
            <td className="blank-cell"></td>
          </tr>
          <tr>
            <th className="content__key">Currency</th>
            <td className="content__value">{paymentCurrency}</td>
            <td className="blank-cell"></td>
          </tr>
          {data.payoutDetail.beneficiary.account_identifiers.map(
            (identifier, index) => (
              <React.Fragment key={index}>
                {identifier.type === "sort_code_account_number" ? (
                  <>
                    <tr>
                      <th className="content__key">Sort Code</th>
                      <td className="content__value">{identifier.sort_code}</td>
                      <td className="blank-cell"></td>
                    </tr>
                    <tr>
                      <th className="content__key">Account Number</th>
                      <td className="content__value">
                        {identifier.account_number}
                      </td>
                      <td className="blank-cell"></td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <th className="content__key">IBAN</th>
                    <td className="content__value">{identifier.iban}</td>
                    <td className="blank-cell"></td>
                  </tr>
                )}
              </React.Fragment>
            )
          )}

          <tr>
            <th className="content__key--white">Payment amount</th>
            <td className="content__value--white">{paymentAmount}</td>
            <td className="blank-cell"></td>
          </tr>
          <tr>
            <td colSpan={3} className="blank-row"></td>
          </tr>
          <tr className="merchant-account--balance">
            <th className="content__key--white">Status</th>
            <td className="content__value--white">
              <span className="content__value--white-highlight">
                {data.payoutDetail.status}
              </span>
            </td>
            <td className="blank-cell"></td>
          </tr>
          <tr>
            <td colSpan={3} className="blank-row"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

PayoutStatus.propTypes = {
  data: PropTypes.object,
};

export default PayoutStatus;
