import PropTypes from "prop-types";
import Card from "../Card/Card";

const PaymentSuccess = ({ data }) => {
  return (
    <Card data={data} className="card card__merchant-account--detail">
      <div className="merchant-account__title">
        <span className="material-symbols-outlined merchant-account__icon">
          {data.currency === "GBP" ? "currency_pound" : "euro"}
        </span>
        Payment Successful
      </div>
      <div>
        <table className="merchant-account">
          <tbody>
            <tr>
              <th className="content__key">Account Holder Name</th>
              <td className="content__value">{data.accountHolderName}</td>
            </tr>
            <tr>
              <th className="content__key">Reference</th>
              <td className="content__value">{data.reference}</td>
            </tr>

            <>
              {data.accountIdentifier.type === "sort_code_account_number" ? (
                <>
                  <tr>
                    <th className="content__key">Sort Code</th>
                    <td className="content__value">
                      {data.accountIdentifier.sort_code}
                    </td>
                  </tr>
                  <tr>
                    <th className="content__key">Account Number</th>
                    <td className="content__value">
                      {data.accountIdentifier.account_number}
                    </td>
                  </tr>
                </>
              ) : (
                <tr>
                  <th className="content__key">IBAN</th>
                  <td className="content__value">
                    {data.accountIdentifier.iban}
                  </td>
                </tr>
              )}
            </>
            <tr>
              <th className="content__key">Payment date</th>
              <td className="content__value">{new Date().toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={2} className="blank-row"></td>
            </tr>
            <tr>
              <th className="content__key">Currency</th>
              <td className="content__value">{data.currency}</td>
            </tr>
            <tr className="merchant-account--balance-white">
              <th className="content__key--white">Payment amount</th>
              <td className="content__value--white sp-bottom-md ">
                <span className="content__value--white-highlight">
                  {(data.amountInMinor / 100).toFixed(2)}
                </span>
              </td>
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

PaymentSuccess.propTypes = {
  data: PropTypes.object,
};

export default PaymentSuccess;
