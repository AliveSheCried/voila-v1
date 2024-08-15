import { useLazyQuery } from "@apollo/client"; // Import useLazyQuery
import { useEffect, useState } from "react";
import { GET_DATA_ACCOUNTS } from "../../graphql/queries/getDataAccounts"; // Import the query
import { useDataToken } from "../../providers/DataTokenProvider";

import Start from "../Start/Start";
import DataAccount from "./DataAccount";

//pagination
const ITEMS_PER_PAGE = 2;

const GetDataAccounts = () => {
  const [currentPage, setCurrentPage] = useState(0);

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

  const paginatedTransactions = [...accounts].slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
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
        <div className="data-account__container">
          {paginatedTransactions.map((account) => (
            <DataAccount
              key={account.id}
              id={account.id}
              data={account}
              className="sp-right-sm sp-bottom-md"
            />
          ))}
        </div>
        <div className="sp-bottom-sm right-temp">
          <button
            className="btn btn--quaternary sp-right-sm "
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="btn btn--quaternary"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              (currentPage + 1) * ITEMS_PER_PAGE >= accounts.length ||
              paginatedTransactions.length === 0
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default GetDataAccounts;
