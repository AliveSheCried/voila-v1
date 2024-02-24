import { useContext, useState } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { TokenContext } from "../../contexts/TokenContext";
//components
import Start from "../Start/Start";

const CreateMerchantPayment = () => {
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const { tokenData } = useContext(TokenContext);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [method, setMethod] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);

  const validatePaymentAmount = (amount) => {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(input);
  };

  //handlers
  const handleCreatePayment = () => {
    console.log("Create payment");
  };

  const togglePaymentMethod = (e) => {
    setMethod(e.target.value);
  };

  function handleAccountChange(account) {
    setSelectedAccountId(account.id);
    setSelectedCurrency(account.currency);
  }

  if (!tokenData.accessToken || !merchantAccounts.length) {
    return <Start type={"routes"} title={"Merchant account payout"} />;
  }

  return (
    <>
      <div className="content__head">
        <span className="content__arrow">&raquo;</span> Merchant account payout
      </div>
      <div className="token__container">
        <div className="token__title">
          <span
            className={`material-symbols-outlined token__icon token__icon--bank`}
          >
            attach_money
          </span>
          Merchant account payout - external
        </div>
        <div className="payout__search-container sp-left-lg">
          <div className="sp-right-md">
            <div className="content__label sp-top-sm">
              Select disbursement account
            </div>
            <div>
              <select
                value={selectedAccountId}
                onChange={(event) =>
                  handleAccountChange(
                    merchantAccounts.find(
                      (account) => account.id === event.target.value
                    )
                  )
                }
              >
                <option value="">-- Select merchant account --</option>
                {merchantAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.id}
                    {/* Change to IBAN / Account Number*/}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="sp-right-md">
            <div className="content__label sp-top-sm">Currency</div>
            <div className="input__payout">
              <input
                className="input-currency"
                type="text"
                id="currency"
                value={selectedCurrency}
                readOnly
              />
            </div>
          </div>
          <div className="sp-right-md">
            <div className="content__label sp-top-sm right">Payment amount</div>
            <div className="input__payout">
              <input
                className="input-amount"
                type="number"
                id="amountInMinor"
                pattern="\d*" //only allow numbers
                min="0"
                onChange={(e) => {
                  if (!validatePaymentAmount(e.target.value)) {
                    console.error("Invalid input");
                  }
                }}
                required
                inputMode="numeric"
                style={{ appearance: "textfield" }}
              />
            </div>
          </div>
        </div>

        <div className="payout__search-container sp-left-lg">
          <div className="sp-right-md">
            <div className="content__label">Payee name</div>
            <div className="input__payout">
              <input
                className="input-reference"
                type="text"
                id="accountHolderName"
              />
            </div>
          </div>
          <div className="sp-right-md">
            <div className="content__label">Payee reference</div>
            <div className="input__payout">
              <input className="input-reference" type="text" id="reference" />
            </div>
          </div>
        </div>

        <div className="payout__search-container sp-left-lg">
          <div className="sp-right-md">
            <div className="content__label">Payment method</div>
            <div className="input__payout">
              <select id="paymentMethod" onClick={togglePaymentMethod}>
                <option value="">-- Select payment method --</option>
                <option value="SORT_CODE">Sort code</option>
                <option value="IBAN">IBAN</option>
              </select>
            </div>
          </div>

          {method === "SORT_CODE" ? (
            <div className="payout__search-container--method">
              <div className="sp-right-md">
                <div className="content__label">Sort code</div>
                <div className="input__payout">
                  <input
                    className="input-sort-code"
                    type="number"
                    pattern="\d*"
                    id="reference"
                    required
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                  />
                </div>
              </div>
              <div className="sp-right-md">
                <div className="content__label">Account number</div>
                <div className="input__payout">
                  <input
                    className="input-account-number"
                    type="number"
                    pattern="\d*"
                    id="accountNumber"
                    required
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                  />
                </div>
              </div>
            </div>
          ) : method === "IBAN" ? (
            <div className="payout__search-container--method">
              <div className="sp-right-md">
                <div className="content__label">IBAN</div>
                <div className="input__payout">
                  <input
                    className="input-reference"
                    type="number"
                    pattern="\d*"
                    id="iban"
                    required
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: "81px" }}></div>
          )}
        </div>
        <div className="payout__search-container--right sp-left-lg">
          <div className="right">
            <button className="btn btn--tertiary" onClick={handleCreatePayment}>
              Create payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMerchantPayment;

{
  /* <div>
            <div className="content__label sp-top-sm">Currency</div>
            <div className="input__merchant-account merchant-account__search-dates text-sm">
              <div>
                <div>
                  <input
                    type="text"
                    id="currency"
                    value={selectedCurrency}
                    readOnly
                  />
                </div>
              </div>
              <div>
                <div>
                  <input
                    type="date"
                    id="dateTo"
                    // value={dateTo}
                    // onChange={onDateToChange}
                  />
                </div>
              </div>
            </div>
            <div className="absolute-right sp-top-sm">
              <button
                className="btn btn--tertiary"
                onClick={handleCreatePayment}
              >
                Create payment
              </button>
            </div>
          </div> */
}
