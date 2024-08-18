import { useLazyQuery } from "@apollo/client"; // Import useLazyQuery
import { useEffect, useState } from "react";
import { GET_DATA_ACCOUNTS } from "../../graphql/queries/getDataAccounts"; // Import the query
import { useDataToken } from "../../providers/DataTokenProvider";

import Start from "../Start/Start";

//pagination
const ITEMS_PER_PAGE = 2;

const GetDataAccounts = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fetchStatus, setFetchStatus] = useState("Idle");

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

  //New useEffect to manage intial response from the server that uses webhooks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDataAccounts();
        if (response.status === "Processing") {
          setFetchStatus("Processing");
          return;
        }
        //else {
        //   setAccounts(response);
        //   setFetchStatus("Success");
        // }
      } catch (error) {
        console.error("Error fetching data accounts", error);
        setFetchStatus("Error");
      }
    };

    fetchData();
  }, [getDataAccounts]);

  //old useEffect to manage the response from the server before refactoring to use webhooks
  // useEffect(() => {
  //   if (dataToken.accessToken) {
  //     getDataAccounts().then((response) => {
  //       const data = response.data.bankAccounts;
  //       setAccounts(data);
  //     });
  //   }
  // }, [dataToken.accessToken, getDataAccounts]);

  if (!loading && !error && !data) {
    return <Start type={"DataRoutes"} title={"User's bank accounts"} />;
  }
  // Old code before refactoring to use webhooks
  // if (loading)
  //   return (
  //     <div>
  //       <div className="content__head">
  //         <span className="content__arrow--yellow">&raquo;</span> User&apos;s
  //         accounts
  //       </div>
  //       <div>Loading user&apos;s bank accounts...</div>
  //     </div>
  //   );
  // if (error)
  //   return (
  //     <div>
  //       <div className="content__head">
  //         <span className="content__arrow--yellow">&raquo;</span> User&apos;s
  //         accounts
  //       </div>
  //       <div>An error occurred {error.message} </div>
  //     </div>
  //   );

  if (fetchStatus === "processing") {
    return <div>Data is being processed. Please wait...</div>;
  }

  if (fetchStatus === "error") {
    return (
      <div>There was an error fetching the data. Please try again later.</div>
    );
  }

  //Old code before refactoring to use webhooks
  // if (data) {
  //   return (
  //     <div>
  //       <div className="content__head">
  //         <span className="content__arrow--yellow">&raquo;</span> User&apos;s
  //         accounts
  //       </div>
  //       <div className="data-account__container">
  //         {paginatedTransactions.map((account) => (
  //           <DataAccount
  //             key={account.id}
  //             id={account.id}
  //             data={account}
  //             className="sp-right-sm sp-bottom-md"
  //           />
  //         ))}
  //       </div>
  //       <div className="sp-bottom-sm right-temp">
  //         <button
  //           className="btn btn--quaternary sp-right-sm "
  //           onClick={() => setCurrentPage(currentPage - 1)}
  //           disabled={currentPage === 0}
  //         >
  //           Previous
  //         </button>
  //         <button
  //           className="btn btn--quaternary"
  //           onClick={() => setCurrentPage(currentPage + 1)}
  //           disabled={
  //             (currentPage + 1) * ITEMS_PER_PAGE >= accounts.length ||
  //             paginatedTransactions.length === 0
  //           }
  //         >
  //           Next
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // return null;

  //New code after refactoring to use webhooks
  return (
    <div>
      {/* Render your accounts data here */}
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
            paginatedTransactions.length === 0
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetDataAccounts;
