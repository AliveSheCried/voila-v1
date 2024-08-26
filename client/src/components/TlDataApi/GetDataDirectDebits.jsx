import { useLazyQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { GET_DATA_ACCOUNTS_DIRECT_DEBITS } from "../../graphql/queries/getDataAccountsDirectDebits";
import { useDataToken } from "../../providers/DataTokenProvider";
import { UserBankDataContext } from "../../providers/UserBankDataProvider";

import SelectUserAccount from "../SelectUserAccount/SelectUserAccount";
import Start from "../Start/Start";

const GetDataDirectDebits = () => {
  const { token: dataToken } = useDataToken();
  const { userBankData, setUserBankData } = useContext(UserBankDataContext);
  const [fetchStatus, setFetchStatus] = useState("Idle");
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [directDebits, setDirectDebits] = useState([]);
  const [getBankAccountDirectDebits] = useLazyQuery(
    GET_DATA_ACCOUNTS_DIRECT_DEBITS,
    {
      context: {
        headers: {
          Authorization: `${dataToken.accessToken}`,
        },
      },
    }
  );

  const handleGetDirectDebits = () => {
    getBankAccountDirectDebits({
      variables: { id: selectedAccountId },
    });
    setFetchStatus("processing");
  };

  // Poll the server for data retrieved by the webhook
  useEffect(() => {
    if (fetchStatus === "processing") {
      const intervalId = setInterval(async () => {
        try {
          const response = await fetch(
            "http://localhost:4000/webhooks/truelayer/retrieve?dataType=directDebits"
          );
          if (response.status === 200) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
              setUserBankData((prevData) => ({
                ...prevData,
                directDebits: data,
              }));
              setDirectDebits(data);
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

  const accountsList = userBankData.bankAccounts.map((account) => ({
    id: account.account_id,
    number: account.account_number.number,
  }));

  const handleAccountChange = (event) => {
    const selectedAccountNumber = event.target.value;
    const selectedAccount = accountsList.find(
      (account) => account.number === selectedAccountNumber
    );
    setSelectedAccountId(selectedAccount ? selectedAccount.id : "");
    console.log("Selected Account ID:", selectedAccountId);
  };

  if (!dataToken || !userBankData.bankAccounts.length) {
    return <Start type={"DataRoutes"} title={"Account's direct debits"} />;
  }

  if (fetchStatus === "processing") {
    return <div>Data is being processed. Please wait...</div>;
  }

  if (fetchStatus === "error") {
    return (
      <div>There was an error fetching the data. Please try again later.</div>
    );
  }

  return (
    <>
      <div className="token__container">
        <div className="token__title">
          <span
            className={`material-symbols-outlined token__icon token__icon--bank`}
          >
            manage_search
          </span>
          Direct debit search
        </div>
        <div className="merchant-account__search-container">
          <div>
            <SelectUserAccount
              accounts={accountsList}
              selectedAccountId={selectedAccountId}
              onAccountChange={handleAccountChange}
              onGetDirectDebits={handleGetDirectDebits}
            />
          </div>
        </div>
      </div>

      {directDebits.length > 0 ? (
        <div className="data-account__container">
          {directDebits.map((directDebit) => (
            <div key={directDebit.direct_debit_id} className="data-account">
              <div className="data-account__item">
                <span className="data-account__label">Direct Debit ID:</span>
                <span className="data-account__value">
                  {directDebit.direct_debit_id}
                </span>
              </div>
              <div className="data-account__item">
                <span className="data-account__label">Timestamp:</span>
                <span className="data-account__value">
                  {directDebit.timestamp}
                </span>
              </div>
              <div className="data-account__item">
                <span className="data-account__label">Name:</span>
                <span className="data-account__value">{directDebit.name}</span>
              </div>
              <div className="data-account__item">
                <span className="data-account__label">Status:</span>
                <span className="data-account__value">
                  {directDebit.status}
                </span>
              </div>
              <div className="data-account__item">
                <span className="data-account__label">
                  Previous payment amount:
                </span>
                <span className="data-account__value">
                  {directDebit.previous_payment_amount}
                </span>
              </div>
              <div className="data-account__item">
                <span className="data-account__label">Currency:</span>
                <span className="data-account__value">
                  {directDebit.currency}
                </span>
              </div>
              <div className="data-account__item">
                <span className="data-account__label">
                  Provider transaction category:
                </span>
                <span className="data-account__value">
                  {directDebit.meta.provider_transaction_category}
                </span>
              </div>
              <div className="data-account__item">
                <span className="data-account__label">
                  Provider account ID:
                </span>
                <span className="data-account__value">
                  {directDebit.meta.provider_account_id}
                </span>
              </div>
              <div className="data-account__item">
                <span className="data-account__label">
                  Provider mandate identification:
                </span>
                <span className="data-account__value">
                  {directDebit.meta.provider_mandate_identification}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No accounts available</p>
      )}
    </>
  );
};

export default GetDataDirectDebits;
