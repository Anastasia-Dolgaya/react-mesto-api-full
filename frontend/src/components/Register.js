import { Link } from 'react-router-dom';
import Input from './Input';
import useField from '../hooks/useField';
import useForm from '../hooks/useForm';
import { validateRegister } from 'utils/utils';

function Register({ onRegisteration }) {
  const form = useForm({ email: '', password: '' }, handleRegistration, validateRegister);
  const email = useField('email', '', form);
  const password = useField('password', '', form);

  const isButtonDisabled = email.value === '' || password.value === '' || form.noErrors === false;

  function handleRegistration() {
    onRegisteration(email.value, password.value);
  }

  return (
    <form className="form form_theme_dark" noValidate onSubmit={form.handleSubmit}>
      <h2 className="form__title form__title_theme_dark">Регистрация</h2>
      <Input
        type="email"
        id="email-input"
        inputname="email"
        value={email.value}
        placeholder="Email"
        onChange={email.handleChange}
        onBlur={email.handleBlur}
        onFocus={email.handleFocus}
        hasErrors={email.error}
        errorMessage={email.error}
        theme="form__input_theme_dark"
      />
      <Input
        type="password"
        id="password-input"
        inputname="password"
        value={password.value}
        placeholder="Пароль"
        onChange={password.handleChange}
        onBlur={password.handleBlur}
        onFocus={password.handleFocus}
        hasErrors={password.error}
        errorMessage={password.error}
        theme="form__input_theme_dark"
        maxLength="20"
      />

      <button
        type="submit"
        className={`form__save-button form__save-button_theme_dark ${
          isButtonDisabled ? 'form__save-button_disabled_theme_dark' : ''
        }`}
        disabled={isButtonDisabled}
      >
        Зарегистрироваться
      </button>
      <span className="form__text">
        Уже зарегистрированы?{' '}
        <Link className="link" to="/signin">
          Войти
        </Link>
      </span>
    </form>
  );
}

export default Register;
