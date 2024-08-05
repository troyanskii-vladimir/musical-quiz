import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import styles from './screen-create-game.module.scss';
import { ApiRoute, BACKEND_URL, ScreenState, SocketHandlers } from '../../config';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { setGameData, setPlayerId } from '../../store/game/game.slice';
import { SocketCreateGameRes } from '../../types/socket-data';
import { UserData } from '../../types/user-data';
import { PackData } from '../../types/pack-data';
import axios from 'axios';

type ScreenCreateGameProps = {
  socket: Socket;
  setScreenState: (arg: ScreenState) => void;
  userName: UserData;
};

export default function ScreenCreateGame({
  socket,
  setScreenState,
  userName,
}: ScreenCreateGameProps) {
  const dispatch = useAppDispatch();

  //Данные с сервера
  const [avaliablePacks, setAvaliablePacks] = useState<PackData[]>([]);

  //Данные стейта компонента
  const [packChecked, setPackChecked] = useState<PackData>({} as PackData)
  const [roomName, setRoomName] = useState<string>('');
  const [privateRoom, setPrivateRoom] = useState<boolean>(false);
  const [roomPassword, setRoomPassword] = useState<string>('');
  const [roomPlayers, setRoomPlayers] = useState<number>(4);


  useEffect(() => {
    axios.get<PackData[]>(BACKEND_URL + ApiRoute.AvailiablePacks).then((res) => {
      setAvaliablePacks(res.data);
    });
  }, [])


  const handleBackButtonClick = () => {
    setScreenState(ScreenState.SelectMode);
  };

  const handleRoomNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRoomName(evt.target.value);
  };

  const handleIsPrivateChange = () => {
    setPrivateRoom((prev) => !prev);
  };

  const handleRoomPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRoomPassword(evt.target.value);
  };

  const handleRoomPlayersChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRoomPlayers(Number(evt.target.value));
  };

  const handleCreateButtonClick = () => {
    const data = {
      gameData: {
        playlistUrl: packChecked.trackListUrl,
        name: roomName,
        maxPlayers: roomPlayers,
        isPrivate: privateRoom,
        password: roomPassword,
      },
      userName: userName.userName ? userName.userName : userName.email,
    };

    socket.emit(
      SocketHandlers.createGame,
      data,
      (response: SocketCreateGameRes) => {
        response as SocketCreateGameRes;

        if (response.status === 401) {
          dispatch(setGameData(response.gameData));
          dispatch(setPlayerId(response.playerId));
          setScreenState(ScreenState.PlayRoom);
        } else {
          console.log('Ошибка создания игры');
        }
      }
    );
  };

  return (
    <div className={styles['screen']}>
      <div className={styles["title-select"]}>
        <span>Создать комнату</span>
      </div>

      <button className={styles["back-btn"]} onClick={handleBackButtonClick}>
        Назад
      </button>

      <div className={styles['packs']}>
        <span className={styles['packs-title']}>Выбери пак для игры</span>
        <ul className={styles['packs-list']}>
          {
            avaliablePacks.map((pack) => (
              <li key={pack.name} className={`${styles['pack-item']} ${packChecked.name === pack.name ? styles['pack-checked'] : ''}`}>
                <label className={styles['pack-container']}>
                  <img className={styles['pack-img']} src={pack.pictureUrl} alt={pack.name} />
                  <span className={styles['pack-name']}>{pack.name}</span>
                  <input
                    className={styles['pack-input']}
                    type='radio'
                    name='radio'
                    onChange={() => setPackChecked(pack)}
                  />
                </label>
              </li>
            ))
          }
        </ul>
      </div>

      <label className={styles["input-container"]}>
        <span className={styles["input-name"]}>Название комнаты</span>
        <input
          className={styles["input-input"]}
          type="text"
          maxLength={25}
          value={roomName}
          onChange={handleRoomNameChange}
        />
      </label>

      <label className={styles["checkbox-container"]}>
        <span className={styles["checkbox-name"]}>Закрытая комната</span>
        <input
          className={styles["checkbox-input"]}
          type="checkbox"
          checked={privateRoom}
          onChange={handleIsPrivateChange}
        />
        <span className={styles["checkbox-fake"]}></span>
      </label>

      <label className={styles["input-container"]}>
        <span className={styles["input-name"]}>Пароль</span>
        <input
          className={styles["input-input"]}
          type="text"
          maxLength={15}
          disabled={!privateRoom}
          value={roomPassword}
          onChange={handleRoomPasswordChange}
        />
      </label>

      <label className={styles["range-container"]}>
        <span className={styles["range-name"]}>
          Максимальное количество игроков: {roomPlayers}
        </span>
        <input
          className={styles["range-input"]}
          type="range"
          min={2}
          max={6}
          value={roomPlayers}
          onChange={handleRoomPlayersChange}
        />
      </label>

      <button className={styles["button"]} onClick={handleCreateButtonClick}>
        Создать и подключиться
      </button>
    </div>
  );
}
