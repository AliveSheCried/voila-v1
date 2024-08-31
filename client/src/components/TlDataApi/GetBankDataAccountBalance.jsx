import React from "react";
import { GET_DATA_ACCOUNT_BALANCE } from "../../graphql/queries/getDataAccountBalance";
import GetBankAccountData from "./GetBankAccountData";

const renderAccountBalance = (balances) => {
  return balances.map((balance, index) => (
    <div key={index} className="data-account">
      <div className="data-account__item">
        <span className="data-account__label">Currency:</span>
        <span className="data-account__value">{balance.currency}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Available:</span>
        <span className="data-account__value">{balance.available}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Current:</span>
        <span className="data-account__value">{balance.current}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Overdraft:</span>
        <span className="data-account__value">{balance.overdraft}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Update Timestamp:</span>
        <span className="data-account__value">{balance.update_timestamp}</span>
      </div>
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
