export const initialPaymentFormState = {
  selectedAccountId: "",
  selectedCurrency: "",
  method: "",
  amountIsValid: false,
  payeeNameIsValid: false,
  referenceIsValid: false,
  sortCodeIsValid: false,
  accountNumberIsValid: false,
  ibanIsValid: false,
  formIsValid: false,
  sortCode: "",
  accountNumber: "",
  iban: "",
  amount: "",
  payeeName: "",
  reference: "",
  amountIsTouched: false,
  payeeNameIsTouched: false,
  referenceIsTouched: false,
  sortCodeIsTouched: false,
  accountNumberIsTouched: false,
  ibanIsTouched: false,
  submitting: false,
  error: null,
  submissionData: null,
};

export const paymentFormReducer = (state, action) => {
  //console.log("before", state);

  switch (action.type) {
    case "SELECT_ACCOUNT":
      return {
        ...state,
        selectedAccountId: action.payload.selectedAccountId,
        selectedCurrency: action.payload.selectedCurrency,
        selectedIban: action.payload.selectedIban,
      };
    case "SELECT_METHOD":
      return {
        ...state,
        method: action.payload.method,
        // Reset the bank details when the method changes
        sortCode: "",
        accountNumber: "",
        iban: "",
        sortCodeIsValid: false,
        accountNumberIsValid: false,
        ibanIsValid: false,
      };
    case "UPDATE_AMOUNT":
      return {
        ...state,
        amount: action.payload.amount,
        amountIsValid: action.payload.amountIsValid,
        amountIsTouched: action.payload.amountIsTouched,
      };
    case "RESET_AMOUNT":
      return {
        ...state,
        amount: initialPaymentFormState.amount,
        amountIsValid: initialPaymentFormState.amountIsValid,
        amountIsTouched: initialPaymentFormState.amountIsTouched,
      };
    case "UPDATE_PAYEE_NAME":
      return {
        ...state,
        payeeName: action.payload.payeeName,
        payeeNameIsValid: action.payload.payeeNameIsValid,
        payeeNameIsTouched: action.payload.payeeNameIsTouched,
      };
    case "UPDATE_REFERENCE":
      return {
        ...state,
        reference: action.payload.reference,
        referenceIsValid: action.payload.referenceIsValid,
        referenceIsTouched: action.payload.referenceIsTouched,
      };
    case "UPDATE_SORT_CODE":
      return {
        ...state,
        sortCode: action.payload.sortCode,
        sortCodeIsValid: action.payload.sortCodeIsValid,
        sortCodeIsTouched: action.payload.sortCodeIsTouched,
      };
    case "UPDATE_ACCOUNT_NUMBER":
      return {
        ...state,
        accountNumber: action.payload.accountNumber,
        accountNumberIsValid: action.payload.accountNumberIsValid,
        accountNumberIsTouched: action.payload.accountNumberIsTouched,
      };
    case "UPDATE_IBAN":
      return {
        ...state,
        iban: action.payload.iban,
        ibanIsValid: action.payload.ibanIsValid,
        ibanIsTouched: action.payload.ibanIsTouched,
      };
    case "VALIDATE_FORM":
      return {
        ...state,
        formIsValid: action.payload.formIsValid,
      };
    //Action types for form submission
    case "SUBMIT_START":
      return {
        ...state,
        submitting: true,
        error: null,
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        submitting: false,
        submissionData: action.payload.submissionData,
        error: null,
      };
    case "SUBMIT_FAILURE":
      return {
        ...state,
        submitting: false,
        error: action.payload.error,
      };

    case "RESET_FORM":
      return {
        ...state,
        ...initialPaymentFormState,
      };

    default:
      return state;
  }
};
