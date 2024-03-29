import { useCallback, useContext, useEffect, useReducer } from "react";
import { MerchantAccountContext } from "../../contexts/MerchantAccountContext";
import { PaymentTokenContext } from "../../contexts/TokenContext";
import {
  initialPaymentFormState,
  paymentFormReducer,
} from "../../reducers/paymentFormReducer";
//components
import InputField from "../InputField/InputField";
import SelectMerchantAccount from "../SelectMerchantAccount/SelectMerchantAccount";
import Start from "../Start/Start";

const CreateMerchantPayment = () => {
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const { token } = useContext(PaymentTokenContext);
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

  //Reset the state when component unmounts
  useEffect(() => {
    // This function is called when the component is unmounted
    return () => {
      // Reset the state here...
      dispatch({ type: "RESET_FORM" });
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

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
    const selectedIban = account.account_identifiers.find(
      (identifier) => identifier.type === "iban"
    ).iban;
    dispatch({
      type: "SELECT_ACCOUNT",
      payload: {
        selectedAccountId: account.id,
        selectedCurrency: account.currency,
        selectedIban: selectedIban,
      },
    });
  }

  if (!token.accessToken || !merchantAccounts.length) {
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

        {/*******  Disbursement account, currency and amount *******/}

        <div className="payout__search-container sp-left-lg sp-top-sm">
          <div className="sp-right-md">
            <SelectMerchantAccount
              label={"Select disbursement account"}
              //selectedAccountId={state.selectedAccountId}
              selectedIban={state.selectedIban}
              onAccountChange={handleAccountChange}
              merchantAccounts={merchantAccounts}
            />
          </div>

          <InputField
            label="Currency"
            id="currency"
            value={state.selectedCurrency}
            readOnly={true}
            className="input-currency"
          />
          <InputField
            label="Payment amount"
            type="number"
            id="amountInMinor"
            pattern="\d*"
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
            isValid={state.amountIsValid}
            errorMessage="Must be a number with 2 decimal places"
            required={true}
            inputMode="numeric"
            className="input-amount"
          />
        </div>

        {/***************  Payee name and reference ************/}

        <div className="payout__search-container sp-left-lg">
          <InputField
            label="Payee name"
            type="text"
            id="accountHolderName"
            value={state.payeeName}
            onChange={(e) => {
              const inputValue = e.target.value;
              let isValid = false;
              if (inputValue !== null && inputValue !== "") {
                isValid = validatePayeeName(inputValue);
              }
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
            isValid={state.payeeNameIsValid}
            errorMessage="Enter a valid name"
            required={true}
            className="input-name"
          />
          <InputField
            label="Payee reference"
            type="text"
            id="reference"
            value={state.reference}
            onChange={(e) => {
              const inputValue = e.target.value;
              let isValid = false;
              if (inputValue !== null && inputValue !== "") {
                isValid = validateReference(inputValue);
              }
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
            isValid={state.referenceIsValid}
            errorMessage="GBP 18 characters, other currencies 140 characters"
            required={true}
            className="input-reference"
          />
        </div>

        {/***************  Payee method selection and subsequent fields ************/}

        <div className="payout__search-container sp-left-lg">
          <div className="sp-right-md">
            <div className="content__label">Payment method</div>
            <div className="input__payout">
              <select id="paymentMethod" onChange={togglePaymentMethod}>
                <option value="">-- Select payment method --</option>
                <option value="SORT_CODE">Sort code</option>
                <option value="IBAN">IBAN</option>
              </select>
            </div>
          </div>
          <div style={{ minHeight: "95px" }}>
            {state.method === "SORT_CODE" ? (
              <div className="payout__search-container--method">
                <InputField
                  label="Sort code"
                  type="number"
                  id="sortCode"
                  minLength={6}
                  maxLength={6}
                  pattern="\d*"
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
                  isValid={state.sortCodeIsValid}
                  errorMessage="6 digits only"
                  required={true}
                  inputMode="numeric"
                  className="input-sort-code"
                />
                <InputField
                  label="Account number"
                  type="number"
                  id="accountNumber"
                  minLength={8}
                  maxLength={8}
                  pattern="\d*"
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
                  isValid={state.accountNumberIsValid}
                  errorMessage="8 digits only"
                  required={true}
                  inputMode="numeric"
                  className="input-account-number"
                />
              </div>
            ) : state.method === "IBAN" ? (
              <div className="payout__search-container--method">
                <InputField
                  label="IBAN"
                  type="text"
                  id="iban"
                  maxLength={30}
                  pattern="\d*"
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
                  isValid={state.ibanIsValid}
                  errorMessage="Enter a valid IBAN"
                  required={true}
                  inputMode="numeric"
                  className="input-iban"
                />
              </div>
            ) : (
              <div style={{ height: "81px" }}></div>
            )}
          </div>
        </div>
        <div className="payout__search-container--right sp-left-lg">
          <div className="right">
            <button
              className={`btn ${
                !state.formIsValid ? "btn--tertiary-inactive" : "btn--tertiary"
              }`}
              onClick={handleCreatePayment}
            >
              Create payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMerchantPayment;
