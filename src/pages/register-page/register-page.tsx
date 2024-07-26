import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUsersAction, logoutAction, registerAction } from "../../store/api-actions";
import { AuthorizationStatus } from "../../config";
import { getAllUsers } from "../../store/auth/auth.selectors";


type RegisterPageProps = {
  authorizationStatus: AuthorizationStatus,
}


export default function RegisterPage({authorizationStatus}: RegisterPageProps) {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // const [users, setUsers] = useState<UserData[]>([]);
  const users = useAppSelector(getAllUsers);


  const handleRegisterButtonClick = async () => {
    const res = await dispatch(registerAction({
      email,
      password,
    }));

    console.log(res);
  }

  const handleLogoutButtonClick = async () => {
    await dispatch(logoutAction());
  }

  const handleGetUsersButtonClick = async () => {
    dispatch(getUsersAction());
  }


  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <div>
        Загрузка
      </div>
    );
  }


  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <div>
        Регистер
        <p>{authorizationStatus}</p>
        <button
          onClick={handleLogoutButtonClick}
        >
          Выйти
        </button>
        <button
          onClick={handleGetUsersButtonClick}
        >
          Получить пользователей список
        </button>
        {
          users.map((user) => (
            <p key={user.id}>{user.email}</p>
          ))
        }
      </div>
    );
  }


  return (
    <div>
      Регистер
      <p>{authorizationStatus}</p>

      <input
        type="text"
        value={email}
        onChange={(evt) => setEmail(evt.target.value)}
      />

      <input
        type="text"
        value={password}
        onChange={(evt) => setPassword(evt.target.value)}
      />

      <button
        type="submit"
        onClick={handleRegisterButtonClick}
      >
        Регистрация
      </button>
      <button
          onClick={handleGetUsersButtonClick}
        >
          Полукчить пользователей список
        </button>
        {
          users.map((user, i) => (
            <div key={user.id + i}>
              {user.email}
            </div>
          ))
        }
    </div>
  );
}
