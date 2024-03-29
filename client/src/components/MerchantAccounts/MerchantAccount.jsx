import PropTypes from "prop-types";
import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import Card from "../Card/Card";

const MerchantAccount = ({ id, data, className }) => {
  const selectedAccountAvailableBalance = data.available_balance_in_minor;
  const selectedAccountCurrentBalance = data.current_balance_in_minor;
  const selectedAccountCurrency = data.currency;

  const { formattedAvailableBalance, formattedCurrentBalance } = formatCurrency(
    selectedAccountCurrency,
    selectedAccountAvailableBalance,
    selectedAccountCurrentBalance
  );

  return (
    <Card id={id} data={data} className={className}>
      <div className="merchant-account__title">
        <span className="material-symbols-outlined merchant-account__icon">
          account_balance
        </span>
        {data.id}
      </div>
      <div>
        <table className="merchant-account">
          <tbody>
            <tr>
              <th className="content__key">Account Holder Name</th>
              <td className="content__value">{data.account_holder_name}</td>
            </tr>
            <tr>
              <th className="content__key">Currency</th>
              <td className="content__value">{selectedAccountCurrency}</td>
            </tr>
            {data.account_identifiers.map((identifier, index) => (
              <React.Fragment key={index}>
                {identifier.type === "sort_code_account_number" ? (
                  <>
                    <tr>
                      <th className="content__key">Sort Code</th>
                      <td className="content__value">{identifier.sort_code}</td>
                    </tr>
                    <tr>
                      <th className="content__key">Account Number</th>
                      <td className="content__value">
                        {identifier.account_number}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr>
                    <th className="content__key">IBAN</th>
                    <td className="content__value">{identifier.iban}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            <tr>
              <td colSpan={2} className="blank-row"></td>
            </tr>

            <tr className="merchant-account--balance">
              <th className="content__key--white">Available</th>
              <td className="content__value--white">
                <span className="content__value--white-highlight">
                  {formattedAvailableBalance}
                </span>
              </td>
            </tr>
            <tr className="merchant-account--balance">
              <th className="content__key--white">Current</th>
              <td className="content__value--white">
                <span className="content__value--white-highlight">
                  {formattedCurrentBalance}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

MerchantAccount.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
  className: PropTypes.string,
};

export default MerchantAccount;
