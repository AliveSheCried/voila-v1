import { useLazyQuery } from "@apollo/client"; // Notice useLazyQuery instead of useQuery
import React, { useContext, useEffect } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import { GET_MERCHANT_ACCOUNTS } from "../../graphql/queries/getMerchantAccounts";
import Card from "../Card/Card";

const GetMerchantAccounts = () => {
  const { tokenData } = useContext(TokenContext);
  const [getMerchantAccounts, { loading, data, error }] = useLazyQuery(
    GET_MERCHANT_ACCOUNTS,
    {
      context: {
        headers: {
          Authorization: `${tokenData.accessToken}`,
        },
      },
    }
  );

  useEffect(() => {
    if (tokenData.accessToken) {
      getMerchantAccounts();
    }
  }, [tokenData.accessToken, getMerchantAccounts]);

  if (loading) return <p>Loading accounts...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;
  if (data) {
    // Render your merchant accounts data
    //console.log("GetMerchantAccounts", data);
    // const jsonString = JSON.stringify(data, null, 2);
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> All merchant accounts
        </div>
        {/* <pre className="text-xs">{jsonString}</pre> */}
        <div className="text-sm">
          {data.merchantAccounts.map((account) => (
            <Card
              key={account.id}
              data={account}
              style="sp-right-sm sp-bottom-md"
            >
              <div className="content__title content__container">
                <span className="material-symbols-outlined content__icon">
                  account_balance
                </span>
                {account.id}
              </div>
              <div>
                <table className="merchant-account">
                  <tbody>
                    <tr>
                      <th className="content__key test">Account Holder Name</th>
                      <td className="content__value test">
                        {account.account_holder_name}
                      </td>
                    </tr>
                    <tr>
                      <th className="content__key">Currency</th>
                      <td className="content__value">{account.currency}</td>
                    </tr>
                    {account.account_identifiers.map((identifier, index) => (
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
                            <td className="content__value">
                              {identifier.iban}
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                    <tr>
                      <td colSpan={2} className="blank-row"></td>
                    </tr>
                    {/* <tr>
                      <th colSpan={2} className="merchant-account--balance">
                        Balances
                      </th>
                    </tr> */}

                    <tr className="merchant-account--balance">
                      <th className="content__key">Available</th>
                      <td className="content__value">
                        {account.available_balance_in_minor}
                      </td>
                    </tr>
                    <tr className="merchant-account--balance">
                      <th className="content__key test2">Current</th>
                      <td className="content__value test2">
                        {account.current_balance_in_minor}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* <div className="content__merchant-account">
                <div className="content__merchant-account--meta">
                  <span className="content__key">Account Holder Name:</span>
                  <span className="content__value">
                    {account.account_holder_name}
                  </span>
                  <br />
                  <span className="content__key">Currency:</span>
                  <span className="content__value">{account.currency}</span>

                  <div className="account-identifiers">
                    {account.account_identifiers.map((identifier, index) => (
                      <div key={index}>
                        {identifier.type === "sort_code_account_number" ? (
                          <>
                            <span className="content__key">Sort Code:</span>
                            <span className="content__value">
                              {identifier.sort_code}
                            </span>
                            <br />
                            <span className="content__key">
                              Account Number:
                            </span>
                            <span className="content__value">
                              {identifier.account_number}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="content__key">IBAN:</span>
                            <span className="content__value">
                              {identifier.iban}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                    <div className="content__merchant-account--balance">
                      <span className="content__key">Available Balance:</span>
                      <span className="content__value">
                        {account.available_balance_in_minor}
                      </span>
                      <br />

                      <span className="content__key">Current Balance:</span>
                      <span className="content__value">
                        {account.current_balance_in_minor}
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // If there's no data yet, you can return null or some placeholder
  return null;
};

export default GetMerchantAccounts;
