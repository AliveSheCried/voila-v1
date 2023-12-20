import PropTypes from "prop-types";

const Card = ({ children, style }) => {
  return <div className={`card ${style ? style : ""}`}>{children}</div>;
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.string, // Optional
};

export default Card;
