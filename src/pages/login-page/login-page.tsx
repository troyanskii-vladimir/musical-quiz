import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks';
import { guestLoginAction, loginAction, registerAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../config';

import Header from '../../components/header/header';

import '../../../styles/container.scss';
import './login-page.scss';



type RegisterPageProps = {
  authorizationStatus: AuthorizationStatus,
}


export default function RegisterPage({authorizationStatus}: RegisterPageProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [statusLogin, setStatusLogin] = useState<boolean>(true)

  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');

  const [loginError, setLoginError] = useState<string>('');


  const handleEmailInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  }

  const handleUserNameInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setUserName(evt.target.value);
  }

  const handlePasswordInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  }

  const handleGuestNameInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setGuestName(evt.target.value);
  }

  const handleChangeStatusClick = async () => {
    setStatusLogin((prev) => !prev);
    setEmail('');
    setUserName('');
    setPassword('');
    setLoginError('');
  }

  const handleLoginButtonClick = async () => {
    const res = await dispatch(loginAction({
      email,
      password,
    }));

    if (res.payload) {
      navigate(AppRoute.Play);
      setEmail('');
      setPassword('');
    } else {
      setLoginError('Ошибка авторизации');
      setPassword('');
    }
  }

  const handleRegisterButtonClick = async () => {
    const res = await dispatch(registerAction({
      email,
      password,
    }));

    if (res.payload) {
      navigate(AppRoute.Play);
      setEmail('');
      setUserName('');
      setPassword('');
    } else {
      setLoginError('Ошибка регистрации');
      setPassword('');
    }
  }

  const handleGuestLoginButtonClick = async () => {
    const res = await dispatch(guestLoginAction({
      userName: guestName,
    }));

    if (res.payload) {
      navigate(AppRoute.Play);
      setGuestName('');
    } else {
      setLoginError('Ошибка регистрации');
    }
  }


  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <main className='main'>
        <Header authorizationStatus={authorizationStatus} />
        Регистрация
        <p>{authorizationStatus}</p>
      </main>
    );
  }


  return (
    <div className='register-page'>
      <Header authorizationStatus={authorizationStatus} />
      <main className='main-container'>
          <div className='wrapper'>

            <div className="form">
              <div className='title-container'>
                {
                  statusLogin &&
                  <span>Войти в аккаунт</span>
                }
                {
                  !statusLogin &&
                  <span>Зарегестрироваться</span>
                }
              </div>

              {
                !statusLogin &&
                <label className='input-container'>
                  <span className='input-name'>Никнейм</span>
                  <input
                    className='input-input'
                    type="text"
                    maxLength={50}
                    placeholder='например, example192'
                    value={userName}
                    onChange={handleUserNameInputChange}
                  />
                </label>
              }

              <label className='input-container'>
                <span className='input-name'>Электронная почта</span>
                <input
                  className='input-input'
                  type="text"
                  maxLength={50}
                  placeholder='например, ivanov@axample.com'
                  value={email}
                  onChange={handleEmailInputChange}
                />
              </label>

              <label className='input-container'>
                <span className='input-name'>Пароль</span>
                <input
                  className='input-input'
                  type="password"
                  maxLength={50}
                  placeholder='например, **********'
                  value={password}
                  onChange={handlePasswordInputChange}
                />
              </label>

                {
                  statusLogin &&
                  <div className='button-container'>
                    <button
                      className='button'
                      onClick={handleLoginButtonClick}
                    >
                      Войти
                    </button>

                    <p className='button-error'>{loginError}</p>

                    <p className='button-text'>Нет аккаунта?</p>

                    <button
                      className='button button-support'
                      onClick={handleChangeStatusClick}
                    >
                      Зарегестрируйтесь
                    </button>
                  </div>
                }

                {
                  !statusLogin &&
                  <div className='button-container'>
                    <button
                      className='button'
                      onClick={handleRegisterButtonClick}
                    >
                      Зарегестрироваться
                    </button>

                    <p className='button-error'>{loginError}</p>

                    <p className='button-text'>Есть аккаунт?</p>

                    <button
                      className='button button-support'
                      onClick={handleChangeStatusClick}
                    >
                      Войдите в аккаунт
                    </button>
                  </div>
                }

            </div>

            <div className="form">
              <div className='title-container'>
                Играть как гость
              </div>

              <label className='input-container'>
                <span className='input-name'>Имя пользователя</span>
                <input
                  className='input-input'
                  type="text"
                  maxLength={50}
                  placeholder='например, example192'
                  value={guestName}
                  onChange={handleGuestNameInputChange}
                />
              </label>

              <div className='button-container'>
                <button
                  className='button'
                  onClick={handleGuestLoginButtonClick}
                >
                  Играть
                </button>
              </div>
            </div>

          </div>
      </main>
    </div>
  );
}
