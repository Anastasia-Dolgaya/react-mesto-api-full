function Input({
  type,
  id,
  inputname,
  value,
  placeholder,
  onChange,
  inputRef,
  onBlur,
  onFocus,
  hasErrors,
  errorMessage,
  theme,
  maxLength,
}) {
  return (
    <label className="form__field">
      <input
        type={type}
        id={id}
        className={`form__input ${theme} ${hasErrors ? 'form__input_invalid' : ''}`}
        name={inputname}
        value={value}
        placeholder={placeholder}
        required
        onChange={onChange}
        ref={inputRef}
        onBlur={onBlur}
        onFocus={onFocus}
        maxLength={maxLength}
      />
      <span className={`form__input-error  ${hasErrors ? 'form__input-error_active' : ''}`}>
        {errorMessage}
      </span>
    </label>
  );
}

export default Input;
