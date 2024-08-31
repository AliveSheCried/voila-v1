import React from "react";
import { GET_DATA_ACCOUNTS_STANDING_ORDERS } from "../../graphql/queries/getDataAccountsStandingOrders";
import GetBankAccountData from "./GetBankAccountData";

const renderStandingOrders = (standingOrders) => {
  return standingOrders.map((standingOrder) => (
    <div
      key={standingOrder.meta.provider_standing_order_id}
      className="data-account"
    >
      <div className="data-account__item">
        <span className="data-account__label">Frequency:</span>
        <span className="data-account__value">{standingOrder.frequency}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Status:</span>
        <span className="data-account__value">{standingOrder.status}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Timestamp:</span>
        <span className="data-account__value">{standingOrder.timestamp}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Currency:</span>
        <span className="data-account__value">{standingOrder.currency}</span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">
          Provider transaction category:
        </span>
        <span className="data-account__value">
          {standingOrder.meta.provider_transaction_category}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Provider account ID:</span>
        <span className="data-account__value">
          {standingOrder.meta.provider_account_id}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">
          Provider mandate identification:
        </span>
        <span className="data-account__value">
          {standingOrder.meta.provider_mandate_identification}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Provider standing order ID:</span>
        <span className="data-account__value">
          {standingOrder.meta.provider_standing_order_id}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Next payment date:</span>
        <span className="data-account__value">
          {standingOrder.next_payment_date}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Next payment amount:</span>
        <span className="data-account__value">
          {standingOrder.next_payment_amount}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">First payment date:</span>
        <span className="data-account__value">
          {standingOrder.first_payment_date}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">First payment amount:</span>
        <span className="data-account__value">
          {standingOrder.first_payment_amount}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Final payment date:</span>
        <span className="data-account__value">
          {standingOrder.final_payment_date}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Final payment amount:</span>
        <span className="data-account__value">
          {standingOrder.final_payment_amount}
        </span>
      </div>
      <div className="data-account__item">
        <span className="data-account__label">Reference:</span>
        <span className="data-account__value">{standingOrder.reference}</span>
      </div>
    </div>
  ));
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
