import { useLazyQuery } from "@apollo/client";
import propTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { useDataToken } from "../../providers/DataTokenProvider";
import { UserBankDataContext } from "../../providers/UserBankDataProvider";
import SelectUserAccount from "../SelectUserAccount/SelectUserAccount";
import Start from "../Start/Start";

const GetBankAccountData = ({ query, dataType, renderData }) => {
  const { token: dataToken } = useDataToken();
  const { userBankData, setUserBankData } = useContext(UserBankDataContext);
  const [fetchStatus, setFetchStatus] = useState("Idle");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [getBankAccountData] = useLazyQuery(query, {
    context: {
      headers: {
        Authorization: `${dataToken.accessToken}`,
      },
    },
  });

  const handleGetData = () => {
    if (!(selectedAccountId in userBankData[dataType])) {
      const variables = { id: selectedAccountId };
      if (dataType === "transactions") {
        variables.fromDate = dateFrom;
        variables.toDate = dateTo;
      }
      getBankAccountData({
        variables,
      });
      setFetchStatus("processing");
    }
  };

  useEffect(() => {
    if (fetchStatus === "processing") {
      const intervalId = setInterval(async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/webhooks/truelayer/retrieve?dataType=${dataType}`
          );
          if (response.status === 200) {
            const responseData = await response.json();
            const data = responseData[selectedAccountId];

            if (Array.isArray(data) && data.length === 0) {
              setFetchStatus("success");
              setData([]);
              clearInterval(intervalId);
            }

            if (Array.isArray(data) && data.length > 0) {
              setUserBankData((prevData) => ({
                ...prevData,
                [dataType]: {
                  ...prevData[dataType],
                  [selectedAccountId]: data,
                },
              }));
              setData(data);
              setFetchStatus("success");
              clearInterval(intervalId);
            }
          }
        } catch (error) {
          console.error("Error fetching data from webhook:", error);
          setFetchStatus("error");
          clearInterval(intervalId);
        }
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [fetchStatus, setUserBankData]);

  let accountsList = [];
  if (userBankData.bankAccounts.length) {
    accountsList = userBankData.bankAccounts.map((account) => ({
      id: account.account_id,
      number: account.account_number.number,
    }));
  }

  const handleAccountChange = (event) => {
    const selectedAccountNumber = event.target.value;
    const selectedAccount = accountsList.find(
      (account) => account.number === selectedAccountNumber
    );
    setSelectedAccountId(selectedAccount ? selectedAccount.id : "");
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  if (!dataToken.accessToken || !userBankData.bankAccounts.length) {
    return <Start type={"DataRoutes"} title={`Account's ${dataType}`} />;
  }

  if (fetchStatus === "processing") {
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--yellow">&raquo;</span>
          {dataType === "transactions"
            ? ` Account's transactions`
            : dataType === "directDebits"
            ? ` Account's direct debits`
            : dataType === "standingOrders"
            ? ` Account's standing orders`
            : dataType === "bankAccountBalance"
            ? ` Account's balances`
            : null}
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
          {dataType === "transactions"
            ? ` Account's transactions`
            : dataType === "directDebits"
            ? ` Account's direct debits`
            : dataType === "standingOrders"
            ? ` Account's standing orders`
            : dataType === "bankAccountBalance"
            ? ` Account's balances`
            : null}
        </div>
        <div>There was an error fetching the data. Please try again later.</div>
      </div>
    );
  }

  return (
    <>
      <div className="content__head">
        <span className="content__arrow--yellow">&raquo;</span>
        {dataType === "transactions"
          ? ` Account's transactions`
          : dataType === "directDebits"
          ? ` Account's direct debits`
          : dataType === "standingOrders"
          ? ` Account's standing orders`
          : dataType === "bankAccountBalance"
          ? ` Account's balances`
          : null}
      </div>

      <SelectUserAccount
        accounts={accountsList}
        selectedAccountId={selectedAccountId}
        onAccountChange={handleAccountChange}
        onGetData={handleGetData}
        dataType={dataType}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={handleDateFromChange}
        onDateToChange={handleDateToChange}
      />

      {data.length > 0 ? (
        <div className="data-ddSo__container  ">{renderData(data)}</div>
      ) : (
        <p></p>
      )}
    </>
  );
};

export default GetBankAccountData;

GetBankAccountData.propTypes = {
  query: propTypes.object.isRequired,
  dataType: propTypes.string.isRequired,
  renderData: propTypes.func.isRequired,
};
