import { useLazyQuery } from "@apollo/client";
import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { MerchantAccountTransactionContext } from "../../contexts/MerchantAccountTransactionContext";
import { TokenContext } from "../../contexts/TokenContext";
import { GET_MERCHANT_ACCOUNT_TRANSACTIONS } from "../../graphql/queries/getMerchantAccountTransactions";
import Start from "../Start/Start";

//modal test//
import Modal from "react-modal";

const ITEMS_PER_PAGE = 10;

const GetTransactions = () => {
  //modal test//
  const [modalPosition, setModalPosition] = useState({
    top: "50%",
    left: "50%",
  });
  const [modalIsOpen, setIsOpen] = useState(false);

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

  //modal test//
  // let subtitle;

  const customStyles = {
    content: {
      top: modalPosition.top,
      left: modalPosition.left,
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "150px",
      height: "150px",
      backgroundColor: "#ffffff",
    },
    overlay: {
      background: "transparent", //"rgba(255, 255, 255, 0.1)", // Set the background to white with 50% transparency
    },
  };

  function openModal(e) {
    const rect = e.target.getBoundingClientRect();
    setModalPosition({ top: `${rect.top}px`, left: `${rect.left}px` });
    console.log("rect", rect);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#000000";
  }

  const paginatedTransactions = [...merchantAccountTransactions]
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .filter((transaction) => transaction.__typename === "Payout")
    .slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  // console.log("object", currentPage, paginatedTransactions.length);

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

  // Filter merchant account context to get available balance and currency for selected account
  const selectedAccount = merchantAccounts.find(
    (account) => account.id === selectedAccountId
  );

  let selectedAccountAvailableBalance;
  let selectedAccountCurrency;

  if (selectedAccount) {
    selectedAccountAvailableBalance =
      selectedAccount.available_balance_in_minor;
    selectedAccountCurrency = selectedAccount.currency;
  }

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
          <>
            <div className="merchant-account__container sp-bottom-sm">
              <table className="merchant-account--table">
                <tbody>
                  <tr>
                    <th className="content__key--table">Type</th>
                    <th className="content__key--table">Status</th>
                    <th className="content__key--table right">Created date</th>
                    <th className="content__key--table">Currency</th>
                    <th className="content__key--table right">Amount</th>
                    <th className="content__key--table">Account holder name</th>
                    <th className="content__key--table">Payment reference</th>
                    <th className="content__key--table">Details</th>
                  </tr>
                  {paginatedTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="content__value--table">
                        {transaction.type}
                      </td>
                      <td className="content__value--table">
                        {transaction.status}
                      </td>
                      <td className="content__value--table right">
                        {new Date(transaction.created_at).toLocaleDateString()}
                      </td>
                      <td className="content__value--table">
                        {transaction.currency}
                      </td>
                      <td className="content__value--table right">
                        {transaction.amount_in_minor}
                      </td>
                      <td className="content__value--table">
                        {transaction.beneficiary.account_holder_name}
                      </td>
                      <td className="content__value--table">
                        {transaction.beneficiary.reference}
                      </td>
                      <td className="content__value--table" id="txDetail">
                        <Modal
                          parentSelector={() =>
                            document.querySelector("#txDetail")
                          }
                          isOpen={modalIsOpen}
                          onAfterOpen={afterOpenModal}
                          onRequestClose={closeModal}
                          style={customStyles}
                          contentLabel="Example Modal"
                          ariaHideApp={false}
                          // subtitle="Hello"
                        >
                          <button onClick={closeModal}>close</button>
                          <div>I am a modal</div>
                        </Modal>
                        <span className="material-symbols-outlined">
                          <a
                            className="a--table-icon"
                            href="#"
                            title="View transaction details"
                            onClick={openModal}
                          >
                            data_info_alert
                          </a>
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* <tr>
                  <td colSpan={6} className="blank-row"></td>
                </tr> */}
                  <tr>
                    <td colSpan={3}></td>
                    <td className="content__key--table">Available balance</td>

                    <td className="content__value--table--white-highlight right">
                      {`${selectedAccountCurrency}  ${new Intl.NumberFormat(
                        "en-GB"
                      ).format(selectedAccountAvailableBalance)}`}
                    </td>
                    <td colSpan={3}></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="sp-top-sm right">
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
                  (currentPage + 1) * ITEMS_PER_PAGE >=
                    merchantAccountTransactions.length ||
                  paginatedTransactions.length === 0
                }
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
};

export default GetTransactions;
