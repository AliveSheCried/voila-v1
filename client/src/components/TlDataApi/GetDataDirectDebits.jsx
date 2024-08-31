import React from "react";
import { GET_DATA_ACCOUNTS_DIRECT_DEBITS } from "../../graphql/queries/getDataAccountsDirectDebits";
import GetBankAccountData from "./GetBankAccountData";

const renderDirectDebits = (directDebits) => {
  return directDebits.map((directDebit) => (
    <div key={directDebit.direct_debit_id} className="data-account">
      <div className="data-account__item">
        <span className="data-account__label">Direct Debit ID:</span>
        <span className="data-account__value">
          {directDebit.direct_debit_id}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Timestamp:</span>
        <span className="data-account__value">{directDebit.timestamp}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Name:</span>
        <span className="data-account__value">{directDebit.name}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Status:</span>
        <span className="data-account__value">{directDebit.status}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Previous payment amount:</span>
        <span className="data-account__value">
          {directDebit.previous_payment_amount}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Currency:</span>
        <span className="data-account__value">{directDebit.currency}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">
          Provider transaction category:
        </span>
        <span className="data-account__value">
          {directDebit.meta.provider_transaction_category}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Provider account ID:</span>
        <span className="data-account__value">
          {directDebit.meta.provider_account_id}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">
          Provider mandate identification:
        </span>
        <span className="data-account__value">
          {directDebit.meta.provider_mandate_identification}
        </span>
      </div>
    </div>
  ));
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
