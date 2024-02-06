import { useLazyQuery } from "@apollo/client"; // Notice useLazyQuery instead of useQuery
import { useContext, useEffect } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { TokenContext } from "../../contexts/TokenContext";
import { GET_MERCHANT_ACCOUNTS } from "../../graphql/queries/getMerchantAccounts";
import Start from "../Start/Start";
import MerchantAccount from "./MerchantAccount";

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
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> All merchant accounts
        </div>

        <div className="merchant-account__container">
          {data.merchantAccounts.map((account) => (
            <MerchantAccount
              key={account.id}
              data={account}
              style="sp-right-sm sp-bottom-md"
            />
          ))}
        </div>
      </div>
    );
  }

  // If there's no data yet, you can return null or some placeholder
  return null;
};

export default GetMerchantAccounts;
