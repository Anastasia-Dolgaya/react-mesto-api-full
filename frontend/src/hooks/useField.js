import { useState } from 'react';

function useField(fieldName, initialValue, form) {
  const [value, setValue] = useState(initialValue);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [active, setActive] = useState(false);
  const [touched, setTouched] = useState(false);

  function handleChange(e) {
    setDirty(true);
    setValue(e.target.value);
    const errors = form.handleChange(fieldName, e.target.value, {
      dirty,
      touched,
      // ....
    });
    setError(errors[fieldName]);
  }

  function handleFocus() {
    setActive(true);
  }

  function handleBlur() {
    setTouched(true);
  }

  return {
    value,
    error,
    dirty,
    active,
    touched,
    handleBlur,
    handleFocus,
    handleChange,
    setValue,
    setError,
  };
}

export default useField;
