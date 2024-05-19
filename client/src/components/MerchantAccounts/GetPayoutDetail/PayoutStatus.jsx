import PropTypes from "prop-types";
import React from "react";
import payoutError from "../../../data/payoutError";

const PayoutStatus = ({
  data: {
    payoutDetail: {
      amount_in_minor: paymentAmount,
      currency: paymentCurrency,
      created_at: createdAt,
      executed_at: executedAt,
      id: paymentId,
      status: payoutStatus,
      beneficiary: {
        account_holder_name: beneficiary,
        reference,
        account_identifiers,
      },
      failure_reason: failureReason,
    },
  },
}) => {
  return (
    <div>
      <table className="merchant-account">
        <tbody>
          <tr>
            <th className="content__key--payout-status-key">Payout status</th>
            <td
              className={`content__key--payout-status-${
                payoutStatus === "failed" ? "fail" : "success"
              }`}
            >
              {payoutStatus.charAt(0).toUpperCase() + payoutStatus.slice(1)}
            </td>
            <td
              className={`content__key--payout-status-${
                payoutStatus === "failed" ? "fail" : "success"
              }`}
            >
              Error message
            </td>
          </tr>
          <tr>
            <td colSpan={3} className="blank-row"></td>
          </tr>
          <tr>
            <th className="content__key">Account Holder Name</th>
            <td className="content__value--payout">{beneficiary}</td>
            <td
              rowSpan={3}
              style={{ verticalAlign: "top" }}
              className={`content__value--payout${
                payoutStatus === "failed" ? "" : "-inactive"
              }`}
            >
              {payoutStatus === "failed"
                ? payoutError[failureReason]
                : "Payment successful - no error message"}
            </td>
          </tr>
          <tr>
            <th className="content__key--white">Reference</th>
            <td className="content__value--payout">{reference}</td>
          </tr>
          <tr>
            <th className="content__key">Currency</th>
            <td className="content__value--payout">{paymentCurrency}</td>
          </tr>
          {account_identifiers?.map((identifier, index) => (
            <React.Fragment key={index}>
              {identifier.type === "sort_code_account_number" ? (
                <>
                  <tr>
                    <th className="content__key">Sort Code</th>
                    <td className="content__value--payout">
                      {identifier.sort_code}
                    </td>
                    <td className="blank-cell"></td>
                  </tr>
                  <tr>
                    <th className="content__key">Account Number</th>
                    <td className="content__value--payout">
                      {identifier.account_number}
                    </td>
                    <td className="blank-cell"></td>
                  </tr>
                </>
              ) : (
                <tr>
                  <th className="content__key">IBAN</th>
                  <td className="content__value--payout">{identifier.iban}</td>
                  <td className="blank-cell"></td>
                </tr>
              )}
            </React.Fragment>
          ))}

          <tr>
            <th className="content__key--white">Payment amount</th>
            <td className="content__value--payout">
              {(paymentAmount / 100).toFixed(2)}
            </td>
            <td className="blank-cell"></td>
          </tr>

          <tr>
            <td colSpan={3} className="blank-row"></td>
          </tr>
          <tr>
            <th className="content__key--white">Created at</th>
            <td className="content__value--payout">
              {typeof createdAt === "string"
                ? createdAt.split("T")[0]
                : createdAt instanceof Date
                ? createdAt.toISOString().split("T")[0]
                : createdAt}
            </td>
            <td className="blank-cell"></td>
          </tr>
          <tr>
            <th className="content__key--white">Executed at</th>
            <td className="content__value--payout">
              {!executedAt
                ? "Not executed"
                : typeof executedAt === "string"
                ? executedAt.split("T")[0]
                : executedAt instanceof Date
                ? executedAt.toISOString().split("T")[0]
                : executedAt}
            </td>
            <td className="blank-cell"></td>
          </tr>
          <tr>
            <th className="content__key--white">Payout ID</th>
            <td className="content__value--payout">{paymentId}</td>
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
