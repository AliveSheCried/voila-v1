import { useLazyQuery } from "@apollo/client"; // Import useLazyQuery
import { useContext, useEffect, useState } from "react";
import { GET_DATA_ACCOUNTS } from "../../graphql/queries/getDataAccounts"; // Import the query
import { useDataToken } from "../../providers/DataTokenProvider";
import { UserBankDataContext } from "../../providers/UserBankDataProvider";
import DataAccount from "./DataAccount";

import Start from "../Start/Start";

//pagination
const ITEMS_PER_PAGE = 2;

const GetDataAccounts = () => {
  const { token: dataToken } = useDataToken();
  const [currentPage, setCurrentPage] = useState(0);
  const [fetchStatus, setFetchStatus] = useState("Idle");
  const [accounts, setAccounts] = useState([]);
  const { userBankData, setUserBankData } = useContext(UserBankDataContext);

  const [getDataAccounts] = useLazyQuery(GET_DATA_ACCOUNTS, {
    context: {
      headers: {
        Authorization: `${dataToken.accessToken}`,
      },
    },
  });

  // If !userBankData.bankAccounts.length && dataToken fetch the data
  useEffect(() => {
    if (!userBankData.bankAccounts.length && dataToken.accessToken) {
      getDataAccounts();
      setFetchStatus("processing");
    } else if (userBankData.bankAccounts.length) {
      setAccounts(userBankData.bankAccounts);
      setFetchStatus("success");
    }
  }, [getDataAccounts, userBankData, dataToken]);

  useEffect(() => {
    if (fetchStatus === "processing") {
      const intervalId = setInterval(async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/webhooks/truelayer/retrieve?dataType=bankAccounts"
          );
          if (response.status === 200) {
            const responseData = await response.json();

            const { allAccounts } = responseData; // Extract the data array
            // console.log("Accounts", data);
            if (Array.isArray(allAccounts) && allAccounts.length > 0) {
              setUserBankData((prevData) => ({
                ...prevData,
                bankAccounts: allAccounts, // Update the state with the data array
              }));
              setAccounts(allAccounts);
              setFetchStatus("success");
              clearInterval(intervalId); // Stop polling after successful fetch
            }
          }
        } catch (error) {
          console.error("Error fetching data from webhook:", error);
          setFetchStatus("error");
          clearInterval(intervalId); // Stop polling on error
        }
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [fetchStatus, setUserBankData]);

  const paginatedAccounts = [...accounts].slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  if (!dataToken.accessToken) {
    return <Start type={"DataRoutes"} title={"User's bank accounts"} />;
  }

  if (fetchStatus === "processing") {
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--yellow">&raquo;</span>
          {` User's bank accounts`}
        </div>
        <div>Data is being processed. Please wait...</div>
      </div>
    );
  }

  if (fetchStatus === "error") {
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--yellow">&raquo;</span>
          {` User's bank accounts`}
        </div>
        <div>There was an error fetching the data. Please try again later.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="content__head">
        <span className="content__arrow--yellow">&raquo;</span>
        {` User's bank accounts`}
      </div>
      <div className="data-account__container">
        {accounts.length > 0 ? (
          paginatedAccounts.map((account) => (
            <DataAccount
              key={account.account_id}
              id={account.account_id}
              data={account}
              className="sp-right-sm sp-bottom-md"
            />
          ))
        ) : (
          <p>No accounts available</p>
        )}
      </div>
      <div className="sp-bottom-sm right-temp">
        <button
          className="btn btn--quaternary sp-right-sm"
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
            paginatedAccounts.length === 0
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetDataAccounts;
