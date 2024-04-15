import { useCallback, useEffect, useReducer } from "react";
import {
  initialPaymentFormState,
  paymentFormReducer,
} from "../reducers/paymentFormReducer";

const usePaymentForm = () => {
  const [state, dispatch] = useReducer(
    paymentFormReducer,
    initialPaymentFormState
  );

  // Place your validation functions here
  const validatePaymentAmount = useCallback((amount) => {
    const regex = /^\d+\.\d{2}$/;
    return regex.test(amount);
  }, []);

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
    let formIsValid =
      state.amountIsValid &&
      state.payeeNameIsValid &&
      state.referenceIsValid &&
      state.method !== ""; // Ensure a payment method has been selected

    if (state.method === "SORT_CODE") {
      formIsValid =
        formIsValid && state.sortCodeIsValid && state.accountNumberIsValid;
    } else if (state.method === "IBAN") {
      formIsValid = formIsValid && state.ibanIsValid;
    }

    dispatch({ type: "VALIDATE_FORM", payload: { formIsValid } });
  }, [
    state.amountIsValid,
    state.payeeNameIsValid,
    state.referenceIsValid,
    state.sortCodeIsValid,
    state.accountNumberIsValid,
    state.ibanIsValid,
    state.method,
    dispatch,
  ]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Reset the state when the hook is disposed
  useEffect(() => {
    return () => dispatch({ type: "RESET_FORM" });
  }, []);

  // Expose the state and any action you need
  return {
    state,
    dispatch,
    validatePaymentAmount,
    validatePayeeName,
    validateReference,
    validateSortCode,
    validateAccountNumber,
    validateIban,
  };
};

export default usePaymentForm;
