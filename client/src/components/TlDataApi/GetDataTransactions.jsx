import React from "react";
import { GET_DATA_ACCOUNT_TRANSACTIONS } from "../../graphql/queries/getDataAccountTransactions";
import GetBankAccountData from "./GetBankAccountData";

const renderTransactions = (transactions) => {
  return transactions.map((transaction) => (
    <div key={transaction.transaction_id} className="data-account">
      <div className="data-account__item">
        <span className="data-account__label">Timestamp:</span>
        <span className="data-account__value">{transaction.timestamp}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Description:</span>
        <span className="data-account__value">{transaction.description}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Transaction Type:</span>
        <span className="data-account__value">
          {transaction.transaction_type}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Transaction Category:</span>
        <span className="data-account__value">
          {transaction.transaction_category}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Amount:</span>
        <span className="data-account__value">{transaction.amount}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Currency:</span>
        <span className="data-account__value">{transaction.currency}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Running Balance:</span>
        <span className="data-account__value">
          {transaction.running_balance.currency}{" "}
          {transaction.running_balance.amount}
        </span>
      </div>
    </div>
  ));
};

const GetDataTransactions = () => {
  return (
    <GetBankAccountData
      query={GET_DATA_ACCOUNT_TRANSACTIONS}
      dataType="transactions"
      renderData={renderTransactions}
    />
  );
};

export default GetDataTransactions;
