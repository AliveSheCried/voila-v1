import { useLazyQuery } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { MerchantAccountContext } from "../../../contexts/MerchantAccountContext";
import { MerchantAccountTransactionContext } from "../../../contexts/MerchantAccountTransactionContext";
import { GET_MERCHANT_ACCOUNT_TRANSACTIONS } from "../../../graphql/queries/getMerchantAccountTransactions";
import { useMerchantAccountDataToken } from "../../../providers/MerchantAccountDataTokenProvider";
//components
import ErrorBoundary from "../../../utils/ErrorBoundary";
import Start from "../../Start/Start";
import TransactionList from "./TransactionList";
import TransactionSearch from "./TransactionSearch";

const GetTransactions = () => {
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const { setMerchantAccountTransactions, merchantAccountTransactions } =
    useContext(MerchantAccountTransactionContext);
  const { token: merchantToken } = useMerchantAccountDataToken();
  // const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedIban, setSelectedIban] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [availableBalance, setAvailableBalance] = useState(0);
  const [currency, setCurrency] = useState("");

  const [getMerchantAccountTransactions, { loading, data, error }] =
    useLazyQuery(GET_MERCHANT_ACCOUNT_TRANSACTIONS, {
      context: {
        headers: {
          Authorization: `${merchantToken.accessToken}`,
        },
      },
    });

  //Reset the state when component unmounts
  useEffect(() => {
    // This function is called when the component is unmounted
    return () => {
      // Reset the state here...
      setAvailableBalance(0);
      setCurrency("");
      //setSelectedAccountId("");
      setSelectedIban("");
      setDateFrom("");
      setDateTo("");
      setMerchantAccountTransactions([]);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  const handleGetTransactions = () => {
    const selectedAccount = merchantAccounts.find((account) =>
      account.account_identifiers.find(
        (identifier) =>
          identifier.type === "iban" && identifier.iban === selectedIban // replace selectedAccountId with selectedIban
      )
    );
    if (!selectedAccount) {
      console.error("No account found with the selected IBAN");
      return;
    }

    setCurrency(selectedAccount.currency);
    setAvailableBalance(selectedAccount.available_balance_in_minor);

    getMerchantAccountTransactions({
      variables: {
        merchantAccountId: selectedAccount.id,
        fromDate: dateFrom,
        toDate: dateTo,
      },
    }).then((response) => {
      const data = response.data.merchantAccountTransactions;
      setMerchantAccountTransactions(data);
    });
  };

  //Form handlers
  const handleAccountChange = (selectedAccount) => {
    if (!selectedAccount) {
      console.error("No account selected");
      return;
    }

    const ibanIdentifier = selectedAccount.account_identifiers.find(
      (identifier) => identifier.type === "iban"
    );

    if (!ibanIdentifier) {
      console.error("Selected account does not have an IBAN");
      return;
    }

    setSelectedIban(ibanIdentifier.iban);
  };

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  if (!merchantAccounts.length) {
    return (
      <Start
        type={"MerchantAccountRoutes"}
        title={"Merchant account transactions"}
      />
    );
  }

  if (loading)
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--pink">&raquo;</span> Merchant account
          transactions
        </div>
        <div>Loading transactions...</div>
      </div>
    );

  if (error)
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--pink">&raquo;</span> Merchant account
          transactions
        </div>
        <div>An error occurred: {error.message}</div>
      </div>
    );

  if (merchantAccounts.length) {
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--pink">&raquo;</span> Merchant account
          transactions
        </div>

        <TransactionSearch
          onAccountChange={handleAccountChange}
          onDateFromChange={handleDateFromChange}
          onDateToChange={handleDateToChange}
          onGetTransactions={handleGetTransactions}
          dateFrom={dateFrom}
          dateTo={dateTo}
          // selectedAccountId={selectedAccountId}
          selectedIban={selectedIban}
          merchantAccounts={merchantAccounts}
        />

        {merchantAccountTransactions.length > 0 && (
          <ErrorBoundary>
            <TransactionList
              transctions={merchantAccountTransactions}
              availableBalance={availableBalance}
              currency={currency}
            />
          </ErrorBoundary>
        )}
      </div>
    );
  }
};

export default GetTransactions;
