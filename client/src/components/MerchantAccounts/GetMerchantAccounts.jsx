import { useLazyQuery } from "@apollo/client"; // Notice useLazyQuery instead of useQuery
import React, { useContext, useEffect } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import { GET_MERCHANT_ACCOUNTS } from "../../graphql/queries/getMerchantAccounts";

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
    const jsonString = JSON.stringify(data, null, 2);
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> All merchant accounts
        </div>
        <pre className="text-xs">{jsonString}</pre>
        {/* <div className="merchant-accounts">
          {data.merchantAccounts.map((account) => (
            <div key={account.id} className="merchant-account">
              <h3>Account Holder: {account.account_holder_name}</h3>
              <p>ID: {account.id}</p>
              <p>Currency: {account.currency}</p>
              <p>Available Balance: {account.available_balance_in_minor}</p>
              <p>Current Balance: {account.current_balance_in_minor}</p>
              <div className="account-identifiers">
                {account.account_identifiers.map((identifier, index) => (
                  <div key={index}>
                    <p>Type: {identifier.type}</p>
                    <p>Sort Code: {identifier.sort_code}</p>
                    <p>Account Number: {identifier.account_number}</p>
                    <p>IBAN: {identifier.iban}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div> */}
      </div>
    );
  }

  // If there's no data yet, you can return null or some placeholder
  return null;
};

export default GetMerchantAccounts;
