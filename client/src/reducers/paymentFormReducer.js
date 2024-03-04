export const initialPaymentFormState = {
  selectedAccountId: "",
  selectedCurrency: "",
  method: "",
  amountIsValid: true,
  payeeNameIsValid: true,
  referenceIsValid: true,
  sortCodeIsValid: true,
  accountNumberIsValid: true,
  ibanIsValid: true,
  formIsValid: false,
  sortCode: "",
  accountNumber: "",
  iban: "",
  amount: "",
  payeeName: "",
  reference: "",
};

export const paymentFormReducer = (state, action) => {
  //console.log("before", state);

  switch (action.type) {
    case "SELECT_ACCOUNT":
      return {
        ...state,
        selectedAccountId: action.payload.selectedAccountId,
        selectedCurrency: action.payload.selectedCurrency,
      };
    case "SELECT_METHOD":
      return {
        ...state,
        method: action.payload.method,
        // Reset the bank details when the method changes
        sortCode: "",
        accountNumber: "",
        iban: "",
        sortCodeIsValid: true,
        accountNumberIsValid: true,
        ibanIsValid: true,
      };
    case "UPDATE_AMOUNT":
      return {
        ...state,
        amount: action.payload.amount,
        amountIsValid: action.payload.amountIsValid,
      };
    case "UPDATE_PAYEE_NAME":
      return {
        ...state,
        payeeName: action.payload.payeeName,
        payeeNameIsValid: action.payload.payeeNameIsValid,
      };
    case "UPDATE_REFERENCE":
      return {
        ...state,
        reference: action.payload.reference,
        referenceIsValid: action.payload.referenceIsValid,
      };
    case "UPDATE_SORT_CODE":
      return {
        ...state,
        sortCode: action.payload.sortCode,
        sortCodeIsValid: action.payload.sortCodeIsValid,
      };
    case "UPDATE_ACCOUNT_NUMBER":
      return {
        ...state,
        accountNumber: action.payload.accountNumber,
        accountNumberIsValid: action.payload.accountNumberIsValid,
      };
    case "UPDATE_IBAN":
      return {
        ...state,
        iban: action.payload.iban,
        ibanIsValid: action.payload.ibanIsValid,
      };
    case "VALIDATE_FORM":
      return {
        ...state,
        formIsValid: action.payload.formIsValid,
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
