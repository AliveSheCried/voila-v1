import { ArrowRight } from "lucide-react";
import PropTypes from "prop-types";

const UserDetailsForm = ({
  userData,
  handleUserDataChange,
  handleNextClick,
}) => {
  return (
    <div className="user-details-form">
      <h2 className="form-title">Your Details</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleUserDataChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={userData.phone}
          onChange={handleUserDataChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date_of_birth">Date of Birth</label>
        <input
          type="date"
          id="date_of_birth"
          name="date_of_birth"
          value={userData.date_of_birth}
          onChange={handleUserDataChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="address_line1">Address Line 1</label>
        <input
          type="text"
          id="address_line1"
          name="address.address_line1"
          value={userData.address.address_line1}
          onChange={handleUserDataChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="address.city"
          value={userData.address.city}
          onChange={handleUserDataChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="address.state"
          value={userData.address.state}
          onChange={handleUserDataChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="zip">ZIP Code</label>
        <input
          type="text"
          id="zip"
          name="address.zip"
          value={userData.address.zip}
          onChange={handleUserDataChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="country_code">Country Code</label>
        <input
          type="text"
          id="country_code"
          name="address.country_code"
          value={userData.address.country_code}
          onChange={handleUserDataChange}
          required
        />
      </div>
      <button className="next-button" onClick={handleNextClick}>
        Next <ArrowRight size={16} />
      </button>
    </div>
  );
};

UserDetailsForm.propTypes = {
  userData: PropTypes.object,
  handleUserDataChange: PropTypes.func,
  handleNextClick: PropTypes.func,
};

export default UserDetailsForm;
