import { useMutation } from "@apollo/client";
import { useContext } from "react";
import { MerchantAccountContext } from "../../../contexts/MerchantAccountContext";
import { PaymentTokenContext } from "../../../contexts/TokenContext";
import usePaymentForm from "../../../hooks/usePaymentForm";
import { formatToSnakeCase } from "../../../utils/formatToSnakeCase";
import InputField from "../../InputField/InputField";
import SelectMerchantAccount from "../../SelectMerchantAccount/SelectMerchantAccount";
import Start from "../../Start/Start";
import PaymentSuccess from "./PaymentSuccess";

import { CREATE_MERCHANT_ACCOUNT_PAYOUT } from "../../../graphql/mutations/createMerchantAccountPayout";

const CreateMerchantPayment = () => {
  const [createPayoutExternalAccount] = useMutation(
    CREATE_MERCHANT_ACCOUNT_PAYOUT
  );
  const { merchantAccounts } = useContext(MerchantAccountContext);
  const { token } = useContext(PaymentTokenContext);
  const {
    state,
    dispatch,
    validatePaymentAmount,
    validatePayeeName,
    validateReference,
    validateSortCode,
    validateAccountNumber,
    validateIban,
  } = usePaymentForm();

  //Form submission handler
  const handleCreatePayment = async () => {
    // Check if the form is valid
    if (!state.formIsValid) {
      console.error("Form is not valid");
      return;
    }

    //Start the submission process
    dispatch({
      type: "SUBMIT_START",
    });

    /////////////////////////////Prepare the data for submission///////////////////////////
    // Change the accountIdentifier object keys to snake_case from camelCase for use by GraphQL
    const accountIdentifier = formatToSnakeCase({
      type: state.method,
      iban: state.iban,
      sortCode: state.sortCode,
      accountNumber: state.accountNumber,
    });

    // Convert input value to a float, then to an integer representing minor units
    const amountInMinorUnits = Math.round(parseFloat(state.amount) * 100);

    //variable to hold the submission data
    const variables = {
      merchantAccountId: state.selectedAccountId,
      amountInMinor: amountInMinorUnits,
      currency: state.selectedCurrency,
      type: "external_account",
      reference: state.reference,
      accountHolderName: state.payeeName,
      accountIdentifier,
    };

    /////////////////////////////Submit the payment data///////////////////////////
    try {
      const response = await createPayoutExternalAccount({
        variables,
        context: {
          headers: {
            authorization: `${token.accessToken}`, // Ensure you are accessing the token correctly
          },
        },
      });

      // Check if the mutation was successful and response contains the necessary data
      if (
        response.data.createPayoutExternalAccount &&
        response.data.createPayoutExternalAccount.id
      ) {
        dispatch({
          type: "SUBMIT_SUCCESS",
          payload: {
            submissionData: variables,
          },
        });
      } else {
        dispatch({
          type: "SUBMIT_FAILURE",
          payload: {
            error: "Server responded without the expected data.",
          },
        });
      }
    } catch (error) {
      // Extracting error message from the response
      let errorMessage = "An error occurred while processing the payment";
      if (error.response && error.response.data && error.response.data.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }

      dispatch({
        type: "SUBMIT_FAILURE",
        payload: {
          error: errorMessage,
          // error.message || "An error occurred while processing the payment",
        },
      });
    }
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

  if (state.error) {
    return (
      <>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> Merchant account
          payout
        </div>
        <div className="token__container">
          <div className="token__title sp-bottom-sm">
            <span
              className={`material-symbols-outlined token__icon token__icon--bank`}
            >
              attach_money
            </span>
            Merchant account payout - external
          </div>
          <div className="payout__search-container payout-status--fail sp-left-lg">
            <div>Error: {state.error}</div>;
          </div>
        </div>
      </>
    );
  }

  if (state.submissionData) {
    return (
      <>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span> Merchant account
          payout
        </div>
        <div className="token__container">
          <div className="token__title sp-bottom-sm">
            <span
              className={`material-symbols-outlined token__icon token__icon--bank`}
            >
              attach_money
            </span>
            Merchant account payout - external
          </div>
          <div className="payout__search-container sp-left-lg">
            <PaymentSuccess data={state.submissionData} />
          </div>
        </div>
      </>
    );
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
          <div className="sp-right-sm">
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
            type="text"
            id="amountInMinor"
            pattern="^\d+(\.\d{2})?$"
            min="0"
            max="50000"
            value={state.amount}
            onChange={(e) => {
              const inputValue = e.target.value;

              //Check if the input is not a number
              if (isNaN(inputValue)) {
                console.error("Invalid input");
                dispatch({
                  type: "RESET_AMOUNT",
                });
                return;
              }

              //Validate the string for currency amount
              const isValid = validatePaymentAmount(inputValue);
              if (!isValid) {
                console.error("Invalid input");
                dispatch({
                  type: "RESET_AMOUNT",
                });
              }

              // Update the state with the new amount
              dispatch({
                type: "UPDATE_AMOUNT",
                payload: {
                  amount: inputValue,
                  amountIsValid: isValid,
                  amountIsTouched: true,
                },
              });
            }}
            isValid={state.amountIsValid}
            errorMessage="Must be a number with 2 decimal places"
            required={true}
            inputMode="decimal"
            className="input-amount"
            isTouched={state.amountIsTouched}
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
                  payeeNameIsTouched: true,
                },
              });
            }}
            isValid={state.payeeNameIsValid}
            errorMessage="Enter a valid name"
            required={true}
            className="input-name"
            isTouched={state.payeeNameIsTouched}
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
                  referenceIsTouched: true,
                },
              });
            }}
            isValid={state.referenceIsValid}
            errorMessage="GBP 18 characters, other currencies 140 characters"
            required={true}
            className="input-reference"
            isTouched={state.referenceIsTouched}
          />
        </div>

        {/***************  Payee method selection and subsequent fields ************/}

        <div className="payout__search-container sp-left-lg">
          <div className="sp-right-md">
            <div className="content__label">Payment method</div>
            <div className="input__payout">
              <select id="paymentMethod" onChange={togglePaymentMethod}>
                <option value="">-- Select payment method --</option>
                <option value="sort_code_account_number">Sort code</option>
                <option value="iban">IBAN</option>
              </select>
            </div>
          </div>
          <div style={{ minHeight: "95px" }}>
            {state.method === "sort_code_account_number" ? (
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
                        sortCodeIsTouched: true,
                      },
                    });
                  }}
                  isValid={state.sortCodeIsValid}
                  errorMessage="6 digits only"
                  required={true}
                  inputMode="numeric"
                  className="input-sort-code"
                  isTouched={state.sortCodeIsTouched}
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
                        accountNumberIsTouched: true,
                      },
                    });
                  }}
                  isValid={state.accountNumberIsValid}
                  errorMessage="8 digits only"
                  required={true}
                  inputMode="numeric"
                  className="input-account-number"
                  isTouched={state.accountNumberIsTouched}
                />
              </div>
            ) : state.method === "iban" ? (
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
                        ibanIsTouched: true,
                      },
                    });
                  }}
                  isValid={state.ibanIsValid}
                  errorMessage="Enter a valid IBAN"
                  required={true}
                  inputMode="numeric"
                  className="input-iban"
                  isTouched={state.ibanIsTouched}
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
