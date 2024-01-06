import { useLazyQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { MerchantAccountTransactionContext } from "../../contexts/MerchantAccountTransactionContext";
import { TokenContext } from "../../contexts/TokenContext";
import { GET_MERCHANT_ACCOUNT_TRANSACTIONS } from "../../graphql/queries/getMerchantAccountTransactions";
import Start from "../Start/Start";

const ITEMS_PER_PAGE = 4;

const GetTransactions = () => {
  const [currentPage, setCurrentPage] = useState(0);
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

  const paginatedTransactions = merchantAccountTransactions
    .filter((transaction) => transaction.__typename === "Payout")
    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const handleGetTransactions = () => {
    getMerchantAccountTransactions({
      variables: {
        merchantAccountId: selectedAccountId,
        fromDate: dateFrom,
        toDate: dateTo,
      },
    }).then((response) => {
      //const data = response.data.items;
      //console.log(response);
      const data = response.data.merchantAccountTransactions;
      setMerchantAccountTransactions(data);
      //console.log("GetTransactions", data);
    });
  };

  //console.log("Transactions", merchantAccountTransactions);

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

        {paginatedTransactions.length > 0 && (
          <div className="sp-bottom-sm">
            <table className="merchant-account--table">
              <tbody>
                <tr>
                  <th className="content__key--table">Type</th>
                  <th className="content__key--table">Status</th>
                  <th className="content__key--table">Created date</th>
                  <th className="content__key--table">Currency</th>
                  <th className="content__key--table">Amount</th>
                  <th className="content__key--table">Account holder name</th>
                </tr>
                {paginatedTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className="content__value">{transaction.type}</td>
                    <td className="content__value">{transaction.status}</td>
                    <td className="content__value">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="content__value">{transaction.currency}</td>
                    <td className="content__value">
                      {transaction.amount_in_minor}
                    </td>
                    <td className="content__value">
                      {transaction.beneficiary.account_holder_name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
};

export default GetTransactions;

{
  /* {paginatedTransactions.length > 0 && (
          <div>
            {paginatedTransactions.map((transaction, index) => (
              <div className="sp-bottom-sm" key={index}>
                <table className="merchant-account">
                  <tbody>
                    <tr>
                      <th className="content__key">Transaction ID</th>
                      <td className="content__value">{transaction.id}</td>
                    </tr>
                    <tr>
                      <th className="content__key">Transaction Type</th>
                      <td className="content__value">{transaction.type}</td>
                    </tr>
                    <tr>
                      <th className="content__key">Transaction Status</th>
                      <td className="content__value">{transaction.status}</td>
                    </tr>
                    <tr>
                      <th className="content__key">Created date</th>
                      <td className="content__value">
                        {transaction.created_at}
                      </td>
                    </tr>
                    <tr>
                      <th className="content__key">Executed date</th>
                      <td className="content__value">
                        {transaction.executed_at}
                      </td>
                    </tr>
                    <tr>
                      <th className="content__key">Currency</th>
                      <td className="content__value">{transaction.currency}</td>
                    </tr>
                    <tr>
                      <th className="content__key">Amount</th>
                      <td className="content__value">
                        {transaction.amount_in_minor}
                      </td>
                    </tr>
                    <tr>
                      <th className="content__key">Account holder name</th>
                      <td className="content__value">
                        {transaction.beneficiary.account_holder_name}
                      </td>
                    </tr>
                    <tr>
                      <th className="content__key">Payment reference</th>
                      <td className="content__value">
                        {transaction.beneficiary.reference}
                      </td>
                    </tr>
                    {transaction.beneficiary.account_identifiers.map(
                      (identifier, index) => (
                        <>
                          {identifier.type === "sort_code_account_number" ? (
                            <>
                              <tr key={`sort-${index}`}>
                                <th className="content__key">Sort Code</th>
                                <td className="content__value">
                                  {identifier.sort_code}
                                </td>
                              </tr>
                              <tr key={`account-${index}`}>
                                <th className="content__key">Account Number</th>
                                <td className="content__value">
                                  {identifier.account_number}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <tr key={`iban-${index}`}>
                              <th className="content__key">IBAN</th>
                              <td className="content__value">
                                {identifier.iban}
                              </td>
                            </tr>
                          )}
                        </>
                      )
                    )}
                    <tr>
                      <td colSpan={2} className="blank-row"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
            <button
              className="btn btn--tertiary sp-right-sm "
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <button
              className="btn btn--tertiary"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                (currentPage + 1) * ITEMS_PER_PAGE >=
                merchantAccountTransactions.length
              }
            >
              Next
            </button>
          </div>
        )} */
}
