import PropTypes from "prop-types";

const Welcome = ({ name = "rob" }) => {
  return <div className="welcome">welcome, {name}</div>;
};

Welcome.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Welcome;
