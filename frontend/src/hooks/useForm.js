import { useState } from 'react';

function useForm(initialValues, onSubmit, validate) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState(initialValues);
  const noErrors = !Object.keys(errors).length;

  function handleChange(fieldName, fieldValue, _fieldState) {
    setValues((prev) => ({ ...prev, [fieldName]: fieldValue }));
    const valErrors = validate({ ...values, [fieldName]: fieldValue });

    setErrors(valErrors);

    return valErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const valErrors = validate(values);

    // setValues(values);
    setErrors(valErrors);

    if (!Object.keys(valErrors).length) {
      onSubmit(values);
      setSubmitted(true);
      setErrors({});
    }
  };

  return {
    errors,
    values,
    submitted,
    handleSubmit,
    handleChange,
    setErrors,
    noErrors,
  };
}

export default useForm;
