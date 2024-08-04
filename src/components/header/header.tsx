import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../config';

import '../../../styles/container.scss';
import './header.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserData } from '../../store/auth/auth.selectors';
import { logoutAction } from '../../store/api-actions';


type HeaderProps = {
  authorizationStatus: AuthorizationStatus,
}


export default function Header({authorizationStatus}: HeaderProps) {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);

  const handleLogoutButtonClick = async () => {
    await dispatch(logoutAction());
  }

  return (
    <header className='header'>
      <div className="main-container">
        <div className='header-container'>
          <Link
            className="header__logo"
            to={AppRoute.Main}
            aria-label="Переход на главную"
          >
            <img src='./songspot-logo.svg' className='test123' />
          </Link>
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link className="main-nav__link" to={AppRoute.Play}>
                  Играть
                </Link>
              </li>
              <li className="main-nav__item">
                <Link className="main-nav__link" to={AppRoute.Main}>
                  Рекорды
                </Link>
              </li>
            </ul>
          </nav>
          {
            authorizationStatus === AuthorizationStatus.Unknown &&
            <Link className="header__login-link" to={AppRoute.Register}>
              <span>Войти</span>
            </Link>
          }
          {
            authorizationStatus === AuthorizationStatus.NoAuth &&
            <Link className="header__login-link" to={AppRoute.Register}>
              <span>Войти</span>
            </Link>
          }
          {
            authorizationStatus === AuthorizationStatus.Guest &&
            <Link className="header__login-link" to={AppRoute.Register}>
              <span>{userData.userName}</span>
            </Link>
          }
          {
            authorizationStatus === AuthorizationStatus.Auth &&
            <div className="header__login-link">
              <span>{userData.email}</span>

              <ul className='userdata-list'>
                <li className='userdata-item'>
                  <button>{userData.email}</button>
                </li>
                <li className='userdata-item'>
                  <button>Настройки</button>
                </li>
                <li className='userdata-item'>
                  <button
                    onClick={handleLogoutButtonClick}
                  >
                    Выйти
                  </button>
                </li>
              </ul>
            </div>
          }

        </div>
      </div>
    </header>
  );
}
