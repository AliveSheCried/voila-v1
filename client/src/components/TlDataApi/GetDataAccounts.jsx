import { useLazyQuery } from "@apollo/client"; // Import useLazyQuery
import { useEffect, useState } from "react";
import { GET_DATA_ACCOUNTS } from "../../graphql/queries/getDataAccounts"; // Import the query
import { useDataToken } from "../../providers/DataTokenProvider";

import Start from "../Start/Start";
import DataAccount from "./DataAccount";

const GetDataAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { token: dataToken } = useDataToken();
  const [getDataAccounts, { loading, data, error }] = useLazyQuery(
    GET_DATA_ACCOUNTS,
    {
      context: {
        headers: {
          Authorization: `${dataToken.accessToken}`,
        },
      },
    }
  );

  useEffect(() => {
    if (dataToken.accessToken) {
      getDataAccounts().then((response) => {
        const data = response.data.bankAccounts;
        setAccounts(data);
      });
    }
  }, [dataToken.accessToken, getDataAccounts]);

  if (!loading && !error && !data) {
    return <Start type={"DataRoutes"} title={"User's bank accounts"} />;
  }
  if (loading)
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--yellow">&raquo;</span> User&apos;s
          accounts
        </div>
        <div>Loading user&apos;s bank accounts...</div>
      </div>
    );
  if (error)
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--yellow">&raquo;</span> User&apos;s
          accounts
        </div>
        <div>An error occurred {error.message} </div>
      </div>
    );

  if (data) {
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--yellow">&raquo;</span> User&apos;s
          accounts
        </div>
        <div className="merchant-account__container">
          {accounts.map((account) => (
            <DataAccount
              key={account.id}
              id={account.id}
              data={account}
              className="sp-right-sm sp-bottom-md"
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default GetDataAccounts;
