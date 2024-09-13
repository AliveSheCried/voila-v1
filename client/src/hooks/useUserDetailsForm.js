import { useCallback, useEffect, useReducer } from "react";
import {
  initialUserDetailsFormState,
  userDetailsFormReducer,
} from "../reducers/userPaymentFormReducer";

const useUserDetailsForm = () => {
  const [state, dispatch] = useReducer(
    userDetailsFormReducer,
    initialUserDetailsFormState
  );

  // Function to validate individual fields
  const validateField = useCallback((field, value) => {
    let isValid = false;
    switch (field) {
      case "name":
        // Check if the name is not empty
        isValid = value.trim().length > 0;
        break;
      case "phone":
        // Check if the phone number is between 10 and 15 digits
        isValid = /^[0-9]{10,15}$/.test(value);
        break;
      case "date_of_birth":
        // Check if the date of birth is in the format YYYY-MM-DD
        isValid = /^\d{4}-\d{2}-\d{2}$/.test(value);
        break;
      default:
        // Default validation for other fields: check if not empty
        isValid = value.trim().length > 0;
    }
    return isValid;
  }, []);

  // Function to handle field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const isValid = validateField(name, value);
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      dispatch({
        type: "UPDATE_ADDRESS_FIELD",
        payload: { field: child, value, isValid },
      });
    } else {
      dispatch({
        type: "UPDATE_FIELD",
        payload: { field: name, value, isValid },
      });
    }
  };

  // Function to validate the entire form
  const validateForm = useCallback(() => {
    const formIsValid =
      state.nameIsValid &&
      state.phoneIsValid &&
      state.dateOfBirthIsValid &&
      state.addressIsValid;
    dispatch({ type: "VALIDATE_FORM", payload: { formIsValid } });
  }, [
    state.nameIsValid,
    state.phoneIsValid,
    state.dateOfBirthIsValid,
    state.addressIsValid,
  ]);

  // Effect to validate the form whenever individual field validity changes
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return {
    state,
    handleFieldChange,
  };
};

export default useUserDetailsForm;
