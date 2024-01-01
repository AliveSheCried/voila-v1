import { useLazyQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { MerchantAccountTransactionContext } from "../../contexts/MerchantAccountTransactionContext";
import { TokenContext } from "../../contexts/TokenContext";
import { GET_MERCHANT_ACCOUNT_TRANSACTIONS } from "../../graphql/queries/getMerchantAccountTransactions";
import Card from "../Card/Card";
import Start from "../Start/Start";

const GetTransactions = () => {
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const { setMerchantAccountTransactions, merchantAccountTransactions } =
    useContext(MerchantAccountTransactionContext);
  const { tokenData } = useContext(TokenContext);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [getMerchantAccountTransactions, { loading, data, error }] =
    useLazyQuery(GET_MERCHANT_ACCOUNT_TRANSACTIONS, {
      context: {
        headers: {
          Authorization: `${tokenData.accessToken}`,
        },
      },
    });

  const handleGetTransactions = () => {
    getMerchantAccountTransactions({
      variables: {
        merchantAccountId: selectedAccountId,
        fromDate: dateFrom,
        toDate: dateTo,
      },
    }).then((response) => {
      const data = response.data.items;
      setMerchantAccountTransactions(data);
      console.log("GetTransactions", data);
    });
  };

  const handleAccountChange = (event) => {
    setSelectedAccountId(event.target.value);
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  if (!merchantAccounts.length) {
    return <Start type={"routes"} title={"Merchant account transactions"} />;
  }

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p>An error occurred: {error.message}</p>;

  if (merchantAccounts.length) {
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> Merchant account
          transactions
        </div>

        <div className="token__container">
          <div className="token__title">
            <span
              className={`material-symbols-outlined token__icon token__icon--bank`}
            >
              manage_search
            </span>
            Transaction search
          </div>
          <div className="merchant-account__search-container">
            <div className="test sp-right-md">
              <div className="content__label sp-top-sm">Merchant account</div>
              <div>
                <select
                  value={selectedAccountId}
                  onChange={handleAccountChange}
                >
                  <option value="">-- Select merchant account --</option>
                  {merchantAccounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {"CURRENCY: " + account.currency + " - ID: " + account.id}
                      {/* Change to IBAN / Account Number*/}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="test">
              <div className="content__label sp-top-sm">
                Date range - from & to
              </div>
              <div className="input__merchant-account merchant-account__search-dates text-sm">
                <div>
                  <div>
                    <input
                      type="date"
                      id="dateFrom"
                      value={dateFrom}
                      onChange={handleDateFromChange}
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <input
                      type="date"
                      id="dateTo"
                      value={dateTo}
                      onChange={handleDateToChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right sp-top-negative-md">
            <button
              className="btn btn--tertiary"
              onClick={handleGetTransactions}
            >
              Get Transactions
            </button>
          </div>
        </div>

        {!merchantAccountTransactions.length && (
          <Card>
            <div className="content__key">No transactions found</div>
          </Card>
        )}
      </div>
    );
  }
};

export default GetTransactions;
