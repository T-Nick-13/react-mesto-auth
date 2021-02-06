import logoPath from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__header">
      <img className="header__logo" src={logoPath} alt="Лого Mesto"/>
    </header>
  )
}

export default Header;
