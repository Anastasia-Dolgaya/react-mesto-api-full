function Footer({ location }) {
  return location.pathname === '/' ? (
    <footer className="footer">
      <p className="footer__copyright">© 2020 Mesto Russia</p>
    </footer>
  ) : null;
}

export default Footer;
