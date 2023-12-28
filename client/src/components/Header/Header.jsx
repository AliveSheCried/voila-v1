import PropTypes from "prop-types";
import Avatar from "../Avatar/Avatar";
import Welcome from "../Welcome/Welcome";

const Header = ({ name, email }) => {
  return (
    <header>
      <Welcome name={name} />
      <Avatar name={name} email={email} />
    </header>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Header;
