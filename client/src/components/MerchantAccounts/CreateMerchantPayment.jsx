import { useCallback, useContext, useEffect, useReducer } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { TokenContext } from "../../contexts/TokenContext";
import {
  initialPaymentFormState,
  paymentFormReducer,
} from "../../reducers/paymentFormReducer";
//components
import SelectMerchantAccount from "../SelectMerchantAccount/SelectMerchantAccount";
import Start from "../Start/Start";

const CreateMerchantPayment = () => {
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const { tokenData } = useContext(TokenContext);
  const [state, dispatch] = useReducer(
    paymentFormReducer,
    initialPaymentFormState
  );

  //form validation
  const validatePaymentAmount = (amount) => {
    const regex = /^\d+\.\d{2}$/;
    return regex.test(amount);
  };

  const validatePayeeName = (name) => {
    if (state.selectedCurrency === "GBP") {
      const regex = /^[a-zA-Z0-9/-?:().,’+\s#=!"%&*<>;{@\r\n]*$/;
      return regex.test(name);
    } else {
      const regex = /^[a-zA-Z0-9/-?:().,'+ éèêëïîôöüûçñõãýÿáíóúàòìùäöüß\s]*$/;
      return regex.test(name);
    }
  };

  const validateReference = (reference) => {
    if (state.selectedCurrency === "GBP") {
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

  const validateForm = useCallback(() => {
    const formIsValid =
      state.amountIsValid &&
      state.payeeNameIsValid &&
      state.referenceIsValid &&
      state.sortCodeIsValid &&
      state.accountNumberIsValid &&
      state.ibanIsValid;
    dispatch({ type: "VALIDATE_FORM", payload: { formIsValid } });
  }, [
    state.amountIsValid,
    state.payeeNameIsValid,
    state.referenceIsValid,
    state.sortCodeIsValid,
    state.accountNumberIsValid,
    state.ibanIsValid,
    dispatch,
  ]);

  // Call validateForm whenever a field is updated
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  //handlers
  const handleCreatePayment = () => {
    if (!state.formIsValid) {
      console.error("Form is not valid");
      return;
    }
    console.log("Create payment");
  };

  const togglePaymentMethod = (e) => {
    dispatch({
      type: "SELECT_METHOD",
      payload: {
        method: e.target.value,
      },
    });
  };

  function handleAccountChange(account) {
    dispatch({
      type: "SELECT_ACCOUNT",
      payload: {
        selectedAccountId: account.id,
        selectedCurrency: account.currency,
      },
    });
  }

  //useEffect(() => {
  //   console.log(
  //     "bank data",
  //     state.method,
  //     state.sortCode,
  //     state.accountNumber,
  //     state.iban
  //   );
  // }, [state]);

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
            <SelectMerchantAccount
              label={"Select disbursement account"}
              selectedAccountId={state.selectedAccountId}
              onAccountChange={handleAccountChange}
              merchantAccounts={merchantAccounts}
            />
          </div>
          <div className="sp-right-md">
            <div className="content__label sp-top-sm">Currency</div>
            <div className="input__payout">
              <input
                className="input-currency"
                type="text"
                id="currency"
                value={state.selectedCurrency}
                readOnly
              />
            </div>
          </div>
          <div className="sp-right-md">
            <div className="content__label sp-top-sm right">Payment amount</div>
            <div className="input__payout">
              <input
                className={`input-amount ${
                  !state.amountIsValid ? "error" : ""
                }`}
                type="number"
                id="amountInMinor"
                pattern="\d*" //only allow numbers
                min="0"
                max="50000"
                value={state.amount}
                onChange={(e) => {
                  const isValid = validatePaymentAmount(e.target.value);
                  if (!isValid) {
                    console.error("Invalid input");
                  }
                  dispatch({
                    type: "UPDATE_AMOUNT",
                    payload: { amount: e.target.value, amountIsValid: isValid },
                  });
                }}
                required
                inputMode="numeric"
                style={{ appearance: "textfield" }}
              />
            </div>
            {!state.amountIsValid && (
              <div className="input__field--error-message text-xxs right">
                Must be a number with 2 decimal places
              </div>
            )}
          </div>
        </div>

        {/* Payee name and reference */}

        <div className="payout__search-container sp-left-lg">
          <div className="sp-right-md">
            <div className="content__label">Payee name</div>
            <div className="input__payout">
              <input
                className={`input-reference ${
                  !state.payeeNameIsValid ? "error" : ""
                }`}
                type="text"
                id="accountHolderName"
                maxLength={state.selectedCurrency === "GBP" ? 140 : 70}
                value={state.payeeName}
                onChange={(e) => {
                  const isValid = validatePayeeName(e.target.value);
                  if (!isValid) {
                    console.error("Invalid input");
                  }
                  dispatch({
                    type: "UPDATE_PAYEE_NAME",
                    payload: {
                      payeeName: e.target.value,
                      payeeNameIsValid: isValid,
                    },
                  });
                }}
                required
              />
            </div>
            {!state.payeeNameIsValid && (
              <div className="input__field--error-message text-xxs">
                Enter a valid name
              </div>
            )}
          </div>
          <div className="sp-right-md">
            <div className="content__label">Payee reference</div>
            <div className="input__payout">
              <input
                className={`input-reference ${
                  !state.referenceIsValid ? "error" : ""
                }`}
                type="text"
                id="reference"
                maxLength={state.selectedCurrency === "GBP" ? 18 : 140}
                value={state.reference}
                onChange={(e) => {
                  const isValid = validateReference(e.target.value);
                  if (!isValid) {
                    console.error("Invalid input");
                  }
                  dispatch({
                    type: "UPDATE_REFERENCE",
                    payload: {
                      reference: e.target.value,
                      referenceIsValid: isValid,
                    },
                  });
                }}
                required
              />
            </div>
            {!state.referenceIsValid && (
              <>
                {state.selectedCurrency === "GBP" ? (
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

          {state.method === "SORT_CODE" ? (
            <div className="payout__search-container--method">
              <div className="sp-right-md">
                <div className="content__label">Sort code</div>
                <div className="input__payout">
                  <input
                    className={`input-sort-code ${
                      !state.sortCodeIsValid ? "error" : ""
                    }`}
                    type="number"
                    pattern="\d*"
                    id="reference"
                    value={state.sortCode}
                    onChange={(e) => {
                      const isValid = validateSortCode(e.target.value);
                      if (!isValid) {
                        console.error("Invalid input");
                      }
                      dispatch({
                        type: "UPDATE_SORT_CODE",
                        payload: {
                          sortCode: e.target.value,
                          sortCodeIsValid: isValid,
                        },
                      });
                    }}
                    required
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    minLength={6}
                    maxLength={6}
                  />
                </div>
                {!state.sortCodeIsValid && (
                  <div className="input__field--error-message text-xxs">
                    6 digits only
                  </div>
                )}
              </div>
              <div className="sp-right-md">
                <div className="content__label">Account number</div>
                <div className="input__payout">
                  <input
                    className={`input-account-number ${
                      !state.accountNumberIsValid ? "error" : ""
                    }`}
                    type="number"
                    pattern="\d*"
                    id="accountNumber"
                    value={state.accountNumber}
                    onChange={(e) => {
                      const isValid = validateAccountNumber(e.target.value);
                      if (!isValid) {
                        console.error("Invalid input");
                      }
                      dispatch({
                        type: "UPDATE_ACCOUNT_NUMBER",
                        payload: {
                          accountNumber: e.target.value,
                          accountNumberIsValid: isValid,
                        },
                      });
                    }}
                    required
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    minLength={8}
                    maxLength={8}
                  />
                </div>
                {!state.accountNumberIsValid && (
                  <div className="input__field--error-message text-xxs">
                    Enter a valid account number
                  </div>
                )}
              </div>
            </div>
          ) : state.method === "IBAN" ? (
            <div className="payout__search-container--method">
              <div className="sp-right-md">
                <div className="content__label">IBAN</div>
                <div className="input__payout">
                  <input
                    className={`input-reference ${
                      !state.ibanIsValid ? "error" : ""
                    }`}
                    type="text"
                    pattern="\d*"
                    id="iban"
                    value={state.iban}
                    onChange={(e) => {
                      const isValid = validateIban(e.target.value);
                      if (!isValid) {
                        console.error("Invalid input");
                      }
                      dispatch({
                        type: "UPDATE_IBAN",
                        payload: {
                          iban: e.target.value,
                          ibanIsValid: isValid,
                        },
                      });
                    }}
                    required
                    inputMode="numeric"
                    style={{ appearance: "textfield" }}
                    maxLength={30}
                  />
                </div>
                {!state.ibanIsValid && (
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
