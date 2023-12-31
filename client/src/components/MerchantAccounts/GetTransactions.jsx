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
  const { merchantAccountTransactions } = useContext(
    MerchantAccountTransactionContext
  );
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
    });

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

    if (data) {
      return (
        <div>
          <div className="content__head">
            <span className="content__arrow">&raquo;</span> Merchant account
            transactions
          </div>
          <div>
            <select value={selectedAccountId} onChange={handleAccountChange}>
              <option value="">-- Select merchant account --</option>
              {merchantAccounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {"CURRENCY: " + account.currency + " - ID: " + account.id}
                  {/* Change to IBAN / Account Number*/}
                </option>
              ))}
            </select>
            <div>
              <label htmlFor="dateFrom">Date From:</label>
              <input
                type="date"
                id="dateFrom"
                value={dateFrom}
                onChange={handleDateFromChange}
              />
            </div>
            <div>
              <label htmlFor="dateTo">Date To:</label>
              <input
                type="date"
                id="dateTo"
                value={dateTo}
                onChange={handleDateToChange}
              />
            </div>
          </div>
          {merchantAccountTransactions.length ===
            0(
              <Card>
                <div className="content__key">No transactions found</div>
              </Card>
            )}
        </div>
      );
    }
  };
};

export default GetTransactions;
