import PropTypes from "prop-types";

const PageHead = ({ pageTitle, icon, subTitle }) => {
  return (
    <>
      <div className="content__head">
        <span className="content__arrow">&raquo;</span> {pageTitle}
      </div>
      <div className="token__container">
        <div className="token__title">
          <span
            className={`material-symbols-outlined token__icon token__icon--bank`}
          >
            {icon}
          </span>
          {subTitle}
        </div>
      </div>
    </>
  );
};

PageHead.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
};

export default PageHead;
