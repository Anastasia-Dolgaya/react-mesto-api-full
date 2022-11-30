import { Link } from 'react-router-dom';

function Header({ location, onSignOut, email }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      {location.pathname === '/signup' && (
        <Link className="link header__link" to="/signin">
          Войти
        </Link>
      )}
      {location.pathname === '/signin' && (
        <Link className="link header__link" to="/signup">
          Регистрация
        </Link>
      )}
      {location.pathname === '/' && (
        <div>
          <span className="header__email">{email}</span>
          <button onClick={onSignOut} className="link header__link header__link_content_logout">
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
