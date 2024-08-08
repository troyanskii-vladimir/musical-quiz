import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import styles from './screen-create-game.module.scss';
import { ApiRoute, BACKEND_URL, PackCategory, ScreenState, SocketHandlers } from '../../config';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { setGameData, setPlayerId } from '../../store/game/game.slice';
import { SocketCreateGameRes } from '../../types/socket-data';
import { UserData } from '../../types/user-data';
import { AvailiablePacksData, PackData } from '../../types/pack-data';
import SelectPack from './select-pack/select-pack';
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

  //Данные стейта компонента
  const [isPackDataOpen, setIsPackDataOpen] = useState<boolean>(false);
  const [packChecked, setPackChecked] = useState<PackData>({} as PackData)
  const [packCategory, setPackCategory] = useState<PackCategory>(PackCategory.Artist);
  const [roomName, setRoomName] = useState<string>('');
  const [privateRoom, setPrivateRoom] = useState<boolean>(false);
  const [roomPassword, setRoomPassword] = useState<string>('');
  const [roomPlayers, setRoomPlayers] = useState<number>(4);
  const [rounds, setRounds] = useState<number>(3);

  //Данные получаемые с сервера
  const [avaliablePacks, setAvaliablePacks] = useState<AvailiablePacksData>({} as AvailiablePacksData);


  useEffect(() => {
    axios.get<AvailiablePacksData>(BACKEND_URL + ApiRoute.AvailiablePacks).then((res) => {
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

  const handleRoundsChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRounds(Number(evt.target.value));
  };

  const handleChangePacksClick = () => {
    setIsPackDataOpen(true);
  }

  const handleCreateButtonClick = () => {
    const data = {
      gameData: {
        packCategory: packCategory,
        playlistUrl: packChecked.trackListUrl,
        name: roomName,
        maxPlayers: roomPlayers,
        rounds: rounds,
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
        <div className={styles['pack-data']}>
          <img className={styles['pack-img']} src={packChecked.pictureUrl} alt={packChecked.name} />
          <div className={styles['pack-name']}>{packChecked.name}</div>
        </div>

        <button
          className={styles['pack-title']}
          onClick={handleChangePacksClick}
        >
          Выберите пак для игры
        </button>
      </div>

      {
        isPackDataOpen &&
        <SelectPack
          packChecked={packChecked}
          setPackChecked={setPackChecked}
          setIsPackDataOpen={setIsPackDataOpen}
          setPackCategory={setPackCategory}
          avaliablePacks={avaliablePacks}
        />
      }

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
          max={10}
          value={roomPlayers}
          onChange={handleRoomPlayersChange}
        />
      </label>

      <label className={styles["range-container"]}>
        <span className={styles["range-name"]}>
          Количество раундов: {rounds}
        </span>
        <input
          className={styles["range-input"]}
          type="range"
          min={1}
          max={10}
          value={rounds}
          onChange={handleRoundsChange}
        />
      </label>

      <button className={styles["button"]} onClick={handleCreateButtonClick}>
        Создать и подключиться
      </button>
    </div>
  );
}
