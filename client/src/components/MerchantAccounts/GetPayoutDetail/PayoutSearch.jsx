//import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";

const PayoutSearch = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState({
    amount: "",
    currency: "",
    createdDate: "",
    payoutId: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/transactions")
      .then((response) => setTransactions(response.data.transactions))
      .catch((error) => setError(error));
  }, []);

  // console.log("error", error);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    if (value.length > 0) {
      const filtered = transactions.filter((tx) =>
        tx.account_holder_name.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  if (error) return <div>Something went wrong. D'oh!</div>;

  return (
    <div className="token__container">
      <div className="token__title">
        <span
          className={`material-symbols-outlined token__icon token__icon--bank`}
        >
          manage_search
        </span>
        Payout search
      </div>
      <div className="merchant-account__search-container">
        <div>
          <div className="content__label">Payee</div>
          <div className="input__merchant-account text-sm">
            <div>
              <div>
                <input
                  className="input-payee-name"
                  type="text"
                  id="payeeName"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type account holder name"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="content__label">Currency</div>
          <div className="input__merchant-account text-sm">
            <div>
              <div>
                <input
                  className="input-currency"
                  type="text"
                  id="currency"
                  value={search.currency}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="content__label">Payout amount</div>
          <div className="input__merchant-account text-sm">
            <div>
              <div>
                <input
                  type="text"
                  id="payoutAmount"
                  value={(search.amount / 100).toFixed(2)}
                  readOnly={true}
                  placeholder="Payout amount"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="content__label">Created date</div>
          <div className="input__merchant-account text-sm">
            <div>
              <div>
                <input
                  className="input-created-date"
                  type="text"
                  id="createdDate"
                  value={
                    search.createdDate
                      ? new Date(search.createdDate).toISOString().split("T")[0]
                      : ""
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="btn__align-bottom">
          <button
            className={`btn ${
              !search.payoutId ? "btn--tertiary-inactive" : "btn--tertiary"
            }`}
            onClick={() => {
              console.log("Search transactions");
            }}
          >
            Search transactions
          </button>
        </div>
      </div>
      <div className="merchant-account__search-container">
        <ul className={`text-sm ${suggestions.length != 0 ? "test1" : ""}`}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion._id}
              onClick={() => {
                setInput(suggestion.account_holder_name);
                setSearch((prevSearch) => ({
                  ...prevSearch,
                  currency: suggestion.currency,
                  createdDate: suggestion.created_at,
                  amount: suggestion.amount_in_minor,
                  payoutId: suggestion.payoutId,
                }));
                setSuggestions([]);
              }}
            >
              <span className="test2">{suggestion.account_holder_name}</span>
              <span className="test3">{suggestion.currency}</span>
              <span className="test4">
                {(suggestion.amount_in_minor / 100).toFixed(2)}
              </span>

              {suggestion.created_at
                ? new Date(suggestion.created_at).toISOString().split("T")[0]
                : ""}
            </li>
          ))}
        </ul>
      </div>
      <div className="merchant-account__search-container"></div>
    </div>
  );
};

export default PayoutSearch;