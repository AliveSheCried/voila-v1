import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import Card from "../Card/Card";
import Start from "../Start/Start";

const GetMerchantAccount = () => {
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const [selectedAccountId, setSelectedAccountId] = useState("");

  const handleAccountChange = (event) => {
    setSelectedAccountId(event.target.value);
  };

  if (!merchantAccounts.length) {
    return <Start type={"routes"} title={"Merchant account detail"} />;
  }

  const selectedAccount = merchantAccounts.find(
    (account) => account.id === selectedAccountId
  );

  return (
    <div>
      <div className="content__head">
        <span className="content__arrow">&raquo;</span> Merchant account detail
      </div>
      <div>
        <select value={selectedAccountId} onChange={handleAccountChange}>
          <option value="">-- Select merchant account --</option>
          {merchantAccounts.map((account) => (
            <option key={account.id} value={account.id}>
              ID: {account.id} - Currency: {account.currency}
            </option>
          ))}
        </select>
      </div>
      {selectedAccount && (
        <Card
          key={selectedAccount.id}
          data={selectedAccount}
          style="sp-right-sm sp-bottom-md"
        >
          <div className="merchant-account__title">
            <span className="material-symbols-outlined merchant-account__icon">
              account_balance
            </span>
            {selectedAccount.id}
          </div>
          <div>
            <table className="merchant-account">
              <tbody>
                <tr>
                  <th className="content__key">Account Holder Name</th>
                  <td className="content__value">
                    {selectedAccount.account_holder_name}
                  </td>
                </tr>
                <tr>
                  <th className="content__key">Currency</th>
                  <td className="content__value">{selectedAccount.currency}</td>
                </tr>
                {selectedAccount.account_identifiers.map(
                  (identifier, index) => (
                    <>
                      {identifier.type === "sort_code_account_number" ? (
                        <>
                          <tr key={`sort-${index}`}>
                            <th className="content__key">Sort Code</th>
                            <td className="content__value">
                              {identifier.sort_code}
                            </td>
                          </tr>
                          <tr key={`account-${index}`}>
                            <th className="content__key">Account Number</th>
                            <td className="content__value">
                              {identifier.account_number}
                            </td>
                          </tr>
                        </>
                      ) : (
                        <tr key={`iban-${index}`}>
                          <th className="content__key">IBAN</th>
                          <td className="content__value">{identifier.iban}</td>
                        </tr>
                      )}
                    </>
                  )
                )}
                <tr>
                  <td colSpan={2} className="blank-row"></td>
                </tr>

                <tr className="merchant-account--balance">
                  <th className="content__key--white">Available</th>
                  <td className="content__value--white">
                    <span className="content__value--white-highlight">
                      {new Intl.NumberFormat("en-GB").format(
                        selectedAccount.current_balance_in_minor
                      )}
                    </span>
                  </td>
                </tr>
                <tr className="merchant-account--balance">
                  <th className="content__key--white">Current</th>
                  <td className="content__value--white">
                    <span className="content__value--white-highlight">
                      {new Intl.NumberFormat("en-GB").format(
                        selectedAccount.current_balance_in_minor
                      )}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default GetMerchantAccount;
