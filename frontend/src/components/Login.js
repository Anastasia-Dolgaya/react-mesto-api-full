import Input from './Input';
import useField from '../hooks/useField';
import useForm from '../hooks/useForm';
import { validateRegister } from 'utils/utils';

function Login({ onLogin, history }) {
  const form = useForm({ email: '', password: '' }, handleSubmit, validateRegister);
  const email = useField('email', '', form);
  const password = useField('password', '', form);

  function handleSubmit() {
    if (!email.value || !password.value) {
      return;
    }
    onLogin(email, password);
  }

  return (
    <form className="form form_theme_dark" noValidate onSubmit={form.handleSubmit}>
      <h2 className="form__title form__title_theme_dark">Вход</h2>
      <Input
        type="email"
        id="email-login-input"
        inputname="email"
        value={email.value}
        placeholder="Email"
        onChange={email.handleChange}
        onBlur={email.handleBlur}
        onFocus={email.handleFocus}
        // hasErrors={email.error}
        // errorMessage={email.error}
        theme="form__input_theme_dark"
      />
      <Input
        type="password"
        id="password-login-input"
        inputname="password"
        value={password.value}
        placeholder="Пароль"
        onChange={password.handleChange}
        onBlur={password.handleBlur}
        onFocus={password.handleFocus}
        // hasErrors={password.error}
        // errorMessage={password.error}
        theme="form__input_theme_dark"
      />

      <button type="submit" className="form__save-button form__save-button_theme_dark">
        Войти
      </button>
    </form>
  );
}

export default Login;
