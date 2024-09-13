import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import useUserDetailsForm from "../../hooks/useUserDetailsForm";

const UserDetailsForm = ({ handleNextClick }) => {
  const { state, handleFieldChange } = useUserDetailsForm();
  console.log("form state", state);

  return (
    <div className="user-details-form">
      <h2 className="form-title">Your Details</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={state.name}
          onChange={handleFieldChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={state.phone}
          onChange={handleFieldChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date_of_birth">Date of Birth</label>
        <input
          type="date"
          id="date_of_birth"
          name="date_of_birth"
          value={state.date_of_birth}
          onChange={handleFieldChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address_line1">Address Line 1</label>
        <input
          type="text"
          id="address_line1"
          name="address.address_line1"
          value={state.address.address_line1}
          onChange={handleFieldChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="address.city"
          value={state.address.city}
          onChange={handleFieldChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="address.state"
          value={state.address.state}
          onChange={handleFieldChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="zip">ZIP Code</label>
        <input
          type="text"
          id="zip"
          name="address.zip"
          value={state.address.zip}
          onChange={handleFieldChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="country_code">Country Code</label>
        <input
          type="text"
          id="country_code"
          name="address.country_code"
          value={state.address.country_code}
          onChange={handleFieldChange}
          required
        />
      </div>
      <button
        className="next-button"
        onClick={handleNextClick}
        disabled={!state.formIsValid}
      >
        Next <ArrowRight size={16} />
      </button>
    </div>
  );
};

UserDetailsForm.propTypes = {
  handleNextClick: PropTypes.func,
};

export default UserDetailsForm;
