import React from "react";
import { GET_DATA_ACCOUNTS_STANDING_ORDERS } from "../../graphql/queries/getDataAccountsStandingOrders";
import GetBankAccountData from "./GetBankAccountData";

// Function to render standing orders in a table
const renderStandingOrders = (standingOrders) => {
  return (
    <div className="merchant-account__container sp-bottom-sm">
      <table className="merchant-account--table">
        <thead>
          <tr>
            <th colSpan={5}></th>
            <th colSpan={2} className="content__key--table ss-cell-border">
              Next payment
            </th>
            <th colSpan={2} className="content__key--table ss-cell-border">
              First payment
            </th>
            <th colSpan={2} className="content__key--table ss-cell-border">
              Final payment
            </th>
          </tr>
          <tr>
            <th className="content__key--table">Frequency</th>
            <th className="content__key--table">Status</th>
            <th className="content__key--table">Created</th>
            <th className="content__key--table">Ref</th>
            <th className="content__key--table">Curr</th>
            {/* <th className="content__key--table">
              Provider Transaction Category
            </th>
             <th className="content__key--table">Provider Account ID</th> 
            <th className="content__key--table">
              Provider Mandate Identification
            </th>
            <th className="content__key--table">ID</th>*/}
            <th className="content__key--table  ss-cell-border">Date</th>
            <th className="content__key--table absolute-right">Amount</th>
            <th className="content__key--table  ss-cell-border">Date</th>
            <th className="content__key--table absolute-right">Amount</th>
            <th className="content__key--table  ss-cell-border">Date</th>
            <th className="content__key--table absolute-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {standingOrders.map((standingOrder) => (
            <tr key={standingOrder.meta.provider_standing_order_id}>
              <td className="content__value--table dd-cell-width--name">
                {standingOrder.frequency}
              </td>
              <td className="content__value--table">{standingOrder.status}</td>
              <td className="content__value--table">
                {new Date(standingOrder.timestamp).toISOString().split("T")[0]}
              </td>
              <td className="content__value--table ">
                {standingOrder.reference}
              </td>
              <td className="content__value--table">
                {standingOrder.currency}
              </td>
              {/* <td className="content__value--table">
                {standingOrder.meta.provider_transaction_category}
              </td> */}
              {/* <td className="content__value--table">
                {standingOrder.meta.provider_account_id}
              </td> */}
              {/* <td className="content__value--table">
                {standingOrder.meta.provider_mandate_identification}
              </td> 
              <td className="content__value--table">
                {standingOrder.meta.provider_standing_order_id}
              </td>*/}
              <td className="content__value--table  ss-cell-border">
                {
                  new Date(standingOrder.next_payment_date)
                    .toISOString()
                    .split("T")[0]
                }
              </td>
              <td className="content__value--table absolute-right dd-cell-width--amt">
                {standingOrder.next_payment_amount}
              </td>
              <td className="content__value--table  ss-cell-border">
                {
                  new Date(standingOrder.first_payment_date)
                    .toISOString()
                    .split("T")[0]
                }
              </td>
              <td className="content__value--table absolute-right dd-cell-width--amt">
                {standingOrder.first_payment_amount}
              </td>
              <td className="content__value--table  ss-cell-border">
                {
                  new Date(standingOrder.final_payment_date)
                    .toISOString()
                    .split("T")[0]
                }
              </td>
              <td className="content__value--table absolute-right dd-cell-width--amt">
                {standingOrder.final_payment_amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const GetDataStandingOrders = () => {
  return (
    <GetBankAccountData
      query={GET_DATA_ACCOUNTS_STANDING_ORDERS}
      dataType="standingOrders"
      renderData={renderStandingOrders}
    />
  );
};

export default GetDataStandingOrders;
