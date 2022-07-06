import { useState } from "react";
import headerLogo from '../../src/images/header-logo.svg';
import {Route, Link} from 'react-router-dom';

function Header({signOut, onEmail}){
  const [isMenuBurger, setIsMenuBurger] = useState(false)

  /**показать меню-бургер */
  const handleMenuBurgerOpen=()=>{
    setIsMenuBurger(true)
  }

 /**скрыть меню-бургер */
  const handleMenuBurgerClose=()=>{
    setIsMenuBurger(false)
  }

  /**закрыть страницу, перейти на страницу входа */
  const output=()=>{
    signOut()
    setIsMenuBurger(false)
  }

  const classNameMenu = `header__menu ${isMenuBurger ? 'header__menu_activ' : ''}`
  const classNameHeader = `header indent__header ${isMenuBurger ? 'header_activ' : ''}`
  const classNameBurger = `header__burger ${isMenuBurger ? 'header__burger_active': ''}`
  const classNameMenuItem = `header__menu_item ${isMenuBurger ? 'header__menu_item-active': ''}`
  const classNameMenuLink = `header__menu_link ${isMenuBurger ? 'header__menu_link-active':''}`
  const classNameMenuClose = `button button_style_close-active ${isMenuBurger ? '':'button_inactive'}`
  const classNameLogo = `header__logo ${isMenuBurger ? 'header__logo_active':''}`

  return(
    <header className={classNameHeader}>
      <img
        className={classNameLogo}
        src={headerLogo}
        alt="Логотип сервиса Mesto Russian"
      />
        <Route path='/sign-up'>
          <Link to="/sign-in" className="header__menu_link">Войти</Link>
        </Route>
        <Route path='/sign-in'>
          <Link to="/sign-up" className="header__menu_link">Регистрация</Link>
        </Route>
        <Route exact path='/'>
          <button type="button"
            className={classNameMenuClose}
            aria-label="Закрыть"
            onClick={handleMenuBurgerClose}>
          </button>
          <div
            className={classNameBurger}
            onClick={handleMenuBurgerOpen}>
            <div className="header__burger_item"></div>
            <div className="header__burger_item"></div>
            <div className="header__burger_item"></div>
          </div>
          <nav className={classNameMenu}>
            <li className={classNameMenuItem}>
              <h2
                className="header__subtitle">
                  {onEmail}
              </h2>
            </li>
            <li className={classNameMenuItem}>
              <a
                className={classNameMenuLink}
                onClick={output}>Выйти
              </a>
            </li>
          </nav>
        </Route>
    </header>
  )
}

 export default Header;
