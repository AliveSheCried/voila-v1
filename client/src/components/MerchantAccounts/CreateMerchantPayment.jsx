import { useContext, useEffect, useState } from "react";
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
  const [amountIsValid, setAmountIsValid] = useState(true);
  const [payeeNameIsValid, setPayeeNameIsValid] = useState(true);
  const [referenceIsValid, setReferenceIsValid] = useState(true);
  const [sortCodeIsValid, setSortCodeIsValid] = useState(true);
  const [accountNumberIsValid, setAccountNumberIsValid] = useState(true);
  const [ibanIsValid, setIbanIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  //form validation
  const validatePaymentAmount = (amount) => {
    const regex = /^\d+\.\d{2}$/;
    return regex.test(amount);
  };

  const validatePayeeName = (name) => {
    if (selectedCurrency === "GBP") {
      const regex = /^[a-zA-Z0-9/-?:().,’+\s#=!"%&*<>;{@\r\n]*$/;
      return regex.test(name);
    } else {
      const regex = /^[a-zA-Z0-9/-?:().,'+ éèêëïîôöüûçñõãýÿáíóúàòìùäöüß\s]*$/;
      return regex.test(name);
    }
  };

  const validateReference = (reference) => {
    if (selectedCurrency === "GBP") {
      const regex = /^[a-zA-Z0-9/-?:().,’+\s#=!"%&*<>;{@\r\n]*$/;
      return regex.test(reference);
    } else {
      const regex = /^[a-zA-Z0-9/-?:().,'+ éèêëïîôöüûçñõãýÿáíóúàòìùäöüß\s]*$/;
      return regex.test(reference);
    }
  };

  const validateSortCode = (sortCode) => {
    const regex = /^[0-9]{6}$/;
    return regex.test(sortCode);
  };

  const validateAccountNumber = (accountNumber) => {
    const regex = /^[0-9]{8}$/;
    return regex.test(accountNumber);
  };

  const validateIban = (iban) => {
    const regex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/;
    return regex.test(iban);
  };

  //form validation - all fields
  useEffect(() => {
    setFormIsValid(
      amountIsValid &&
        payeeNameIsValid &&
        referenceIsValid &&
        sortCodeIsValid &&
        accountNumberIsValid &&
        ibanIsValid
    );
  }, [
    amountIsValid,
    payeeNameIsValid,
    referenceIsValid,
    sortCodeIsValid,
    accountNumberIsValid,
    ibanIsValid,
  ]);

  //handlers
  const handleCreatePayment = () => {
    if (!formIsValid) {
      console.error("Form is not valid");
      return;
    }
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

        {/* Disbursement account, currency and amount */}

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
            <div
              className={`input__payout ${
                !amountIsValid ? "input__payout--error" : ""
              }`}
            >
              <input
                className="input-amount"
                type="number"
                id="amountInMinor"
                pattern="\d*" //only allow numbers
                min="0"
                max="50000"
                onChange={(e) => {
                  if (!validatePaymentAmount(e.target.value)) {
                    console.error("Invalid input");
                    setAmountIsValid(false);
                  } else {
                    setAmountIsValid(true);
                  }
                }}
                required
                inputMode="numeric"
                style={{ appearance: "textfield" }}
              />
            </div>
            {!amountIsValid && (
              <div className="input__field--error-message text-xxs right">
                Enter a valid amount
              </div>
            )}
          </div>
        </div>

        {/* Payee name and reference */}

        <div className="payout__search-container sp-left-lg">
          <div className="sp-right-md">
            <div className="content__label">Payee name</div>
            <div
              className={`input__payout ${
                !payeeNameIsValid ? "input__payout--error" : ""
              }`}
            >
              <input
                className="input-reference"
                type="text"
                id="accountHolderName"
                maxLength={selectedCurrency === "GBP" ? 140 : 70}
                onChange={(e) => {
                  if (!validatePayeeName(e.target.value)) {
                    console.error("Invalid input");
                    setPayeeNameIsValid(false);
                  } else {
                    setPayeeNameIsValid(true);
                  }
                }}
                required
              />
            </div>
            {!payeeNameIsValid && (
              <div className="input__field--error-message text-xxs">
                Enter a valid name
              </div>
            )}
          </div>
          <div className="sp-right-md">
            <div className="content__label">Payee reference</div>
            <div
              className={`input__payout ${
                !referenceIsValid ? "input__payout--error" : ""
              }`}
            >
              <input
                className="input-reference"
                type="text"
                id="reference"
                maxLength={selectedCurrency === "GBP" ? 18 : 140}
                onChange={(e) => {
                  if (!validateReference(e.target.value)) {
                    console.error("Invalid input");
                    setReferenceIsValid(false);
                  } else {
                    setReferenceIsValid(true);
                  }
                }}
                required
              />
            </div>
            {!referenceIsValid && (
              <>
                {selectedCurrency === "GBP" ? (
                  <div className="input__field--error-message text-xxs">
                    Max reference length is 18 characters
                  </div>
                ) : (
                  <div className="input__field--error-message text-xxs">
                    Max reference length is 140 characters
                  </div>
                )}
              </>
            )}
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
                <div
                  className={`input__payout ${
                    !sortCodeIsValid ? "input__payout--error" : ""
                  }`}
                >
                  <input
                    className="input-sort-code"
                    type="number"
                    pattern="\d*"
                    id="reference"
                    onChange={(e) => {
                      if (!validateSortCode(e.target.value)) {
                        console.error("Invalid input");
                        setSortCodeIsValid(false);
                      } else {
                        setSortCodeIsValid(true);
                      }
                    }}
                    required
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    minLength={6}
                    maxLength={6}
                  />
                </div>
                {!sortCodeIsValid && (
                  <div className="input__field--error-message text-xxs">
                    Enter a valid sort code
                  </div>
                )}
              </div>
              <div className="sp-right-md">
                <div className="content__label">Account number</div>
                <div
                  className={`input__payout ${
                    !accountNumberIsValid ? "input__payout--error" : ""
                  }`}
                >
                  <input
                    className="input-account-number"
                    type="number"
                    pattern="\d*"
                    id="accountNumber"
                    onChange={(e) => {
                      if (!validateAccountNumber(e.target.value)) {
                        console.error("Invalid input");
                        setAccountNumberIsValid(false);
                      } else {
                        setAccountNumberIsValid(true);
                      }
                    }}
                    required
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    minLength={8}
                    maxLength={8}
                  />
                </div>
                {!accountNumberIsValid && (
                  <div className="input__field--error-message text-xxs">
                    Enter a valid account number
                  </div>
                )}
              </div>
            </div>
          ) : method === "IBAN" ? (
            <div className="payout__search-container--method">
              <div className="sp-right-md">
                <div className="content__label">IBAN</div>
                <div
                  className={`input__payout ${
                    !ibanIsValid ? "input__payout--error" : ""
                  }`}
                >
                  <input
                    className="input-reference"
                    type="number"
                    pattern="\d*"
                    id="iban"
                    onChange={(e) => {
                      if (!validateIban(e.target.value)) {
                        console.error("Invalid input");
                        setIbanIsValid(false);
                      } else {
                        setIbanIsValid(true);
                      }
                    }}
                    required
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    maxLength={30}
                  />
                </div>
                {!ibanIsValid && (
                  <div className="input__field--error-message text-xxs">
                    Enter a valid IBAN
                  </div>
                )}
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
