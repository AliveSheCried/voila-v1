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
            <th colSpan={2} className="content__key--payout-status-key">
              Payout status
            </th>
            <td
              className={`content__key--payout-status-${
                payoutStatus === "failed" ? "fail" : "success"
              }`}
            >
              {payoutStatus.charAt(0).toUpperCase() + payoutStatus.slice(1)}
            </td>
            <td className="content__key--payout-status-key right">
              {payoutStatus === "failed" ? (
                <span className="material-symbols-outlined token__icon token__icon--payout-fail">
                  error
                </span>
              ) : (
                <span className="material-symbols-outlined token__icon token__icon--payout-success">
                  check_circle
                </span>
              )}
            </td>
          </tr>
          <tr>
            <td colSpan={4} className="blank-row"></td>
          </tr>
          <tr>
            <th className="content__key cell-width--sm">Account Holder Name</th>
            <td className="content__value--payout cell-width--md">
              {beneficiary}
            </td>
            <th className="content__key--white cell-width--sm">Created at</th>
            <td className="content__value--payout cell-width--md">
              {typeof createdAt === "string"
                ? createdAt.split("T")[0]
                : createdAt instanceof Date
                ? createdAt.toISOString().split("T")[0]
                : createdAt}
            </td>
          </tr>
          <tr>
            <th className="content__key--white">Reference</th>
            <td className="content__value--payout">{reference}</td>
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
          </tr>
          <tr>
            <td colSpan={4} className="blank-row"></td>
          </tr>
          <tr>
            <th className="content__key">Currency</th>
            <td className="content__value--payout">{paymentCurrency}</td>
            <th className="content__key--white">Payout ID</th>
            <td className="content__value--payout">{paymentId}</td>
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
            <td colSpan={4} className="blank-row"></td>
          </tr>
          <tr>
            <th
              className={`content__key--white ${
                payoutStatus === "failed" ? "" : "payout-status--success"
              }`}
            >
              Payment amount
            </th>
            <td
              className={`content__key--white ${
                payoutStatus === "failed" ? "" : "payout-status--success"
              }`}
            >
              {(paymentAmount / 100).toFixed(2)}
            </td>
            <th
              className={`content__key--white${
                payoutStatus === "failed" ? " payout-status--fail" : "-inactive"
              }`}
            >
              {payoutStatus === "failed" ? "Failure reason" : ""}
            </th>
            <td
              className={`content__value--payout${
                payoutStatus === "failed" ? " payout-status--fail" : "-inactive"
              }`}
            >
              {payoutStatus === "failed" ? payoutError[failureReason] : ""}
            </td>
          </tr>
          <tr>
            <td colSpan={4} className="blank-row"></td>
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
