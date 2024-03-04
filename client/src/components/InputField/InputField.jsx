import PropTypes from "prop-types";
import { useState } from "react";

const InputField = ({
  label,
  className,
  type,
  id,
  pattern,
  min,
  max,
  value,
  onChange,
  required,
  inputMode,
  style,
  errorMessage,
}) => {
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (onChange) {
      onChange(inputValue);
    }

    if (pattern && !new RegExp(pattern).test(inputValue)) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  };

  return (
    <div className={`input__field ${className}`}>
      <div className="content__label sp-top-sm right">{label}</div>
      <div className="input__payout">
        <input
          className={`input-amount ${!isValid ? "error" : ""}`}
          type={type}
          id={id}
          pattern={pattern}
          min={min}
          max={max}
          value={value}
          onChange={handleInputChange}
          required={required}
          inputMode={inputMode}
          style={style}
        />
      </div>
      {!isValid && (
        <div className="input__field--error-message text-xxs right">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  inputMode: PropTypes.string,
  style: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default InputField;
