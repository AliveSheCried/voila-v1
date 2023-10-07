import PropTypes from "prop-types";
import Tokens from "../../components/Tokens/Tokens";
import Welcome from "../../components/Welcome/Welcome";

const Header = ({ name }) => {
  return (
    <header>
      <Welcome name={name} />
      <Tokens />
    </header>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Header;
