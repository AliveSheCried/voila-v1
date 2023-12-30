import PropTypes from "prop-types";

const Start = ({ type, title }) => {
  if (type === "home") {
    return (
      <div className="start">
        to start, create a <br />
        payment token <span className="start__arrow">&raquo;</span>
      </div>
    );
  }

  if (type === "routes") {
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow">&raquo;</span>
          {` ${title}`}
        </div>
        <div className="start__route">
          to start, create a <br />
          payment token <span className="start__arrow">&raquo;</span>
        </div>
      </div>
    );
  }
};

Start.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default Start;
