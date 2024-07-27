import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction, registerAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../config';

import Header from '../../components/header/header';

import '../../../styles/container.scss';
import './register-page.scss';


type RegisterPageProps = {
  authorizationStatus: AuthorizationStatus,
}


export default function RegisterPage({authorizationStatus}: RegisterPageProps) {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLoginButtonClick = async () => {
    await dispatch(loginAction({
      email,
      password,
    }));
  }

  const handleRegisterButtonClick = async () => {
    await dispatch(registerAction({
      email,
      password,
    }));
  }


  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <main className='main'>
        <Header authorizationStatus={authorizationStatus} />
        Регистрация
        <p>Loading///</p>
      </main>
    );
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
        Регистрация
        <p>{authorizationStatus}</p>

        <input
          className='input'
          type='text'
          value={email}
          placeholder='Email'
          onChange={(evt) => setEmail(evt.target.value)}
        />

        <input
          className='input'
          type='text'
          value={password}
          placeholder='Пароль'
          onChange={(evt) => setPassword(evt.target.value)}
        />

        <button
          className='btn'
          type='submit'
          onClick={handleLoginButtonClick}
        >
          Вход
        </button>

        <button
          className='btn'
          type='submit'
          onClick={handleRegisterButtonClick}
        >
          Регистрация
        </button>

      </main>
    </div>
  );
}
