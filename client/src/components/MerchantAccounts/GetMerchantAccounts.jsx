import { useLazyQuery } from "@apollo/client"; // Notice useLazyQuery instead of useQuery
import { useContext, useEffect } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { TokenContext } from "../../contexts/TokenContext";
import { GET_MERCHANT_ACCOUNTS } from "../../graphql/queries/getMerchantAccounts";
import Card from "../Card/Card";
import Start from "../Start/Start";

const GetMerchantAccounts = () => {
  const { tokenData } = useContext(TokenContext);
  const { setMerchantAccounts } = useContext(MerchantAccountContext);
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
      getMerchantAccounts().then((response) => {
        const data = response.data.merchantAccounts;
        setMerchantAccounts(data);
      });
    }
  }, [tokenData.accessToken, getMerchantAccounts, setMerchantAccounts]);

  if (!loading && !error && !data) {
    return <Start type={"routes"} title={"All merchant accounts"} />;
  }
  if (loading)
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> All merchant accounts
        </div>
        <div>Loading merchant accounts...</div>
      </div>
    );
  if (error)
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> All merchant accounts
        </div>
        <div>An error occurred {error.message} </div>
      </div>
    );
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
        <div className="merchant-account__container">
          {data.merchantAccounts.map((account) => (
            <Card
              key={account.id}
              data={account}
              style="sp-right-sm sp-bottom-md"
            >
              <div className="merchant-account__title">
                <span className="material-symbols-outlined merchant-account__icon">
                  account_balance
                </span>
                {account.id}
              </div>
              <div>
                <table className="merchant-account">
                  <tbody>
                    <tr>
                      <th className="content__key">Account Holder Name</th>
                      <td className="content__value">
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
                      <th className="content__key--white">Available</th>
                      <td className="content__value--white">
                        <span className="content__value--white-highlight">
                          {new Intl.NumberFormat("en-GB").format(
                            account.current_balance_in_minor
                          )}
                        </span>
                      </td>
                    </tr>
                    <tr className="merchant-account--balance">
                      <th className="content__key--white">Current</th>
                      <td className="content__value--white">
                        <span className="content__value--white-highlight">
                          {new Intl.NumberFormat("en-GB").format(
                            account.current_balance_in_minor
                          )}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
