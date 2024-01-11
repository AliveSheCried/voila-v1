import { useLazyQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { MerchantAccountTransactionContext } from "../../contexts/MerchantAccountTransactionContext";
import { TokenContext } from "../../contexts/TokenContext";
import { GET_MERCHANT_ACCOUNT_TRANSACTIONS } from "../../graphql/queries/getMerchantAccountTransactions";
//components
import Start from "../Start/Start";
import TransactionList from "./TransactionList";
import TransactionSearch from "./TransactionSearch";

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
      const data = response.data.merchantAccountTransactions;
      setMerchantAccountTransactions(data);
    });
  };

  //Form handlers
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

  if (loading)
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> Merchant account
          transactions
        </div>
        <div>Loading transactions...</div>
      </div>
    );

  if (error)
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> Merchant account
          transactions
        </div>
        <div>An error occurred: {error.message}</div>
      </div>
    );

  if (merchantAccounts.length) {
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> Merchant account
          transactions
        </div>

        <TransactionSearch
          onAccountChange={handleAccountChange}
          onDateFromChange={handleDateFromChange}
          onDateToChange={handleDateToChange}
          onGetTransactions={handleGetTransactions}
          dateFrom={dateFrom}
          dateTo={dateTo}
          selectedAccountId={selectedAccountId}
          merchantAccounts={merchantAccounts}
        />

        {merchantAccountTransactions.length > 0 && (
          <TransactionList
            transctions={merchantAccountTransactions}
            selectedAccountId={selectedAccountId}
          />
        )}
      </div>
    );
  }
};

export default GetTransactions;
