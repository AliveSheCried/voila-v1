import PropTypes from "prop-types";
import Avatar from "../../components/Avatar/Avatar";
import Welcome from "../../components/Welcome/Welcome";

const Header = ({ name }) => {
  return (
    <header>
      <Welcome name={name} />
      <Avatar />
    </header>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
