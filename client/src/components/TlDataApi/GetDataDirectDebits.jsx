import React from "react";
import { GET_DATA_ACCOUNTS_DIRECT_DEBITS } from "../../graphql/queries/getDataAccountsDirectDebits";

import GetBankAccountData from "./GetBankAccountData";

const renderDirectDebits = (directDebits) => {
  return (
    <div className="merchant-account__container sp-bottom-sm">
      <table className="merchant-account--table">
        <thead>
          <tr>
            <th className="content__key--table">Name</th>
            <th className="content__key--table">Curr</th>
            <th className="content__key--table absolute-right">Amount</th>
            <th className="content__key--table">Status</th>

            {/* <th className="content__key--table">Timestamp</th> */}
          </tr>
        </thead>
        <tbody>
          {directDebits.map((directDebit) => (
            <tr key={directDebit.direct_debit_id}>
              <td className="content__value--table padding-right-lg dd-cell-width--name">
                {directDebit.name}
              </td>
              <td className="content__value--table padding-right-lg">
                {directDebit.currency}
              </td>
              <td className="content__value--white dd-cell-width--amt absolute-right">
                <span className="content__value--white-highlight">
                  {directDebit.previous_payment_amount}
                </span>
              </td>

              <td className="content__value--table padding-right-lg">
                {directDebit.status}
              </td>
              {/* <td className="content__value--table">
              
                  {/* {new Date(directDebit.timestamp).toISOString().split("T")[0]} 
                </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const GetDataDirectDebits = () => {
  return (
    <GetBankAccountData
      query={GET_DATA_ACCOUNTS_DIRECT_DEBITS}
      dataType="directDebits"
      renderData={renderDirectDebits}
    />
  );
};

export default GetDataDirectDebits;
