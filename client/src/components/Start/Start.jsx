import PropTypes from "prop-types";

const Start = ({ type, title }) => {
  if (type === "home") {
    return (
      <div className="start">
        to start, create a <br />
        payment token <span className="start__arrow--pink">&raquo;</span>
      </div>
    );
  }

  if (type === "MerchantAccountRoutes") {
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--pink">&raquo;</span>
          {` ${title}`}
        </div>
        <div className="start__route--merchant">
          to start, create a <br />
          payment token <span className="start__arrow--pink">&raquo;</span>
        </div>
      </div>
    );
  }

  if (type === "DataRoutes") {
    return (
      <div>
        <div className="content__head">
          <span className="content__arrow--yellow">&raquo;</span>
          {` ${title}`}
        </div>
        <div className="start__route--data">
          <span className="start__arrow--yellow">&raquo;</span>
          <br />
          to start, give permission <br />
          to access your data{" "}
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
