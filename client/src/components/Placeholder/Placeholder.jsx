const Placeholder = () => {
  return (
    <div className="placeholder__container">
      <div className="placeholder__title">
        <span className={`material-symbols-outlined placeholder__icon`}>
          star
        </span>
        placeholder item
      </div>
      {/* <div className="placeholder__text">No active placeholder</div>
      <div className="placeholder__button">
        <button className="btn btn--secondary" onClick={() => {}}>
          Create
        </button>
      </div> */}
    </div>
  );
};

export default Placeholder;
