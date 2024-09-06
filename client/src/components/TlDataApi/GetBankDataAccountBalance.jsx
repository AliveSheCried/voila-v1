import React from "react";
import { GET_DATA_ACCOUNT_BALANCE } from "../../graphql/queries/getDataAccountBalance";
import GetBankAccountData from "./GetBankAccountData";

const renderAccountBalance = (balances) => {
  return balances.map((balance, index) => (
    <div key={index} className="data-account__container">
      <table className="merchant-account">
        <tbody>
          <tr>
            <th className="content__key">Currency</th>
            <td className="content__value">{balance.currency}</td>
          </tr>
          <tr>
            <th className="content__key">Available</th>
            <td className="content__value">{balance.available}</td>
          </tr>
          <tr>
            <th className="content__key">Current</th>
            <td className="content__value">{balance.current}</td>
          </tr>
          <tr>
            <th className="content__key">Overdraft</th>
            <td className="content__value">{balance.overdraft}</td>
          </tr>
          <tr>
            <th className="content__key">Update Timestamp</th>
            <td className="content__value">
              {new Date(balance.update_timestamp).toISOString().split("T")[0]}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  ));
};

const GetBankDataAccountBalance = () => {
  return (
    <GetBankAccountData
      query={GET_DATA_ACCOUNT_BALANCE}
      dataType="bankAccountBalance"
      renderData={renderAccountBalance}
    />
  );
};

export default GetBankDataAccountBalance;
