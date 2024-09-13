export const initialUserDetailsFormState = {
  name: "",
  phone: "",
  date_of_birth: "",
  address: {
    address_line1: "",
    city: "",
    state: "",
    zip: "",
    country_code: "",
  },
  nameIsValid: false,
  phoneIsValid: false,
  dateOfBirthIsValid: false,
  addressIsValid: false,
  formIsValid: false,
};

export const userDetailsFormReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      // Update the field and its validity
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        // Handle special case for date_of_birth field
        ...(action.payload.field === "date_of_birth"
          ? { dateOfBirthIsValid: action.payload.isValid }
          : { [`${action.payload.field}IsValid`]: action.payload.isValid }),
      };
    case "UPDATE_ADDRESS_FIELD":
      return {
        ...state,
        address: {
          ...state.address,
          [action.payload.field]: action.payload.value,
        },
        addressIsValid: action.payload.isValid,
      };
    case "VALIDATE_FORM":
      return {
        ...state,
        formIsValid: action.payload.formIsValid,
      };
    case "RESET_FORM":
      return initialUserDetailsFormState;
    default:
      return state;
  }
};
