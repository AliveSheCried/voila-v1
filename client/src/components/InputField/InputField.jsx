import PropTypes from "prop-types";

const InputField = ({
  label,
  type = "text",
  id,
  value,
  onChange,
  isValid = true,
  errorMessage = "",
  readOnly = false,
  pattern,
  min,
  max,
  required = false,
  inputMode,
  className = "",
  minLength,
  maxLength,
  isTouched,
}) => {
  return (
    <div className="sp-right-md">
      <div className={`content__label`}>{label}</div>
      <div className="input__payout">
        <input
          className={`${className} ${!isValid ? "error" : ""}`}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          pattern={pattern}
          min={min}
          max={max}
          required={required}
          inputMode={inputMode}
          style={{ appearance: "textfield" }} // Consider moving to CSS file
          minLength={minLength}
          maxLength={maxLength}
        />
      </div>
      <div
        className="input__payout--error-message text-xxs right"
        style={{ height: "20px" }}
      >
        {!isValid && isTouched && errorMessage}
      </div>
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  isValid: PropTypes.bool,
  errorMessage: PropTypes.string,
  readOnly: PropTypes.bool,
  pattern: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  required: PropTypes.bool,
  inputMode: PropTypes.string,
  className: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  isTouched: PropTypes.bool,
};

export default InputField;
