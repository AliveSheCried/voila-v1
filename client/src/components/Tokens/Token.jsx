import PropTypes from "prop-types";

const Token = ({ name = "data" }) => {
  return (
    <div className="token__container">
      <div className="token__title">
        <span className="material-symbols-outlined token__icon">token</span>
        {name} token
      </div>
      <div className="token__text">No active token</div>
      <div className="token__button">
        <button className="btn btn--secondary">Create</button>
      </div>
    </div>
  );
};

Token.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Token;
