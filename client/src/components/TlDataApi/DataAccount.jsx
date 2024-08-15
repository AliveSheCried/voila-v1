import PropTypes from "prop-types";
import Card from "../Card/Card";

const DataAccount = ({ id, data, className }) => {
  return (
    <Card id={id} data={data} className={className}>
      <div className="merchant-account__title">
        <span className="material-symbols-outlined merchant-account__icon">
          account_balance
        </span>
        {data.account_id}
      </div>
      <div>
        <table className="merchant-account">
          <tbody>
            <tr>
              <th className="content__key">Display Name</th>
              <td className="content__value">{data.display_name}</td>
            </tr>
            <tr>
              <th className="content__key">Currency</th>
              <td className="content__value">{data.currency}</td>
            </tr>
            <tr>
              <th className="content__key">Provider</th>
              <td className="content__value">{data.provider.display_name}</td>
            </tr>
            <tr>
              <td colSpan={2} className="blank-row"></td>
            </tr>
            <tr className="merchant-account--balance">
              <th className="content__key">Account number</th>
              <td className="content__value--white">
                <span className="content__value--white-highlight">
                  {data.account_number.number}
                </span>
              </td>
            </tr>
            <tr className="merchant-account--balance">
              <th className="content__key">SWIFT/BIC</th>
              <td className="content__value">
                {data.account_number.swift_bic}
              </td>
            </tr>
            <tr className="merchant-account--balance">
              <th className="content__key">Sort code</th>
              <td className="content__value">
                {data.account_number.sort_code}
              </td>
            </tr>
            <tr className="merchant-account--balance">
              <th className="content__key">IBAN</th>
              <td className="content__value">{data.account_number.iban}</td>
            </tr>
            <tr>
              <td colSpan={2} className="blank-row"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};

DataAccount.propTypes = {
  id: PropTypes.string,
  data: PropTypes.object,
  className: PropTypes.string,
};

export default DataAccount;
