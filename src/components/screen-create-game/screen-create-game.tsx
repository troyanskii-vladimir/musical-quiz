

import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import './screen-create-game.scss';
import { ScreenState, SocketHandlers } from '../../config';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { setGameData } from '../../store/game/game.slice';
import { SocketCreateGameRes } from '../../types/socket-data';


type ScreenCreateGameProps = {
  socket: Socket,
  setScreenState: (arg: ScreenState) => void,
}


export default function ScreenCreateGame({socket, setScreenState}: ScreenCreateGameProps) {
  const dispatch = useAppDispatch();

  const [roomName, setRoomName] = useState<string>('');
  const [privateRoom, setPrivateRoom] = useState<boolean>(false);
  const [roomPassword, setRoomPassword] = useState<string>('');
  const [roomPlayers, setRoomPlayers] = useState<number>(4);


  const handleBackButtonClick = () => {
    setScreenState(ScreenState.SelectMode);
  }

  const handleRoomNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRoomName(evt.target.value);
  }

  const handleIsPrivateChange = () => {
    setPrivateRoom((prev) => !prev);
  }

  const handleRoomPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRoomPassword(evt.target.value);
  }

  const handleRoomPlayersChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRoomPlayers(Number(evt.target.value));
  }


  const handleCreateButtonClick = () => {
    const data = {
      name: roomName,
      maxPlayers: roomPlayers,
      isPrivate: privateRoom,
      password: roomPassword,
    };

    socket.emit(SocketHandlers.createGame, data, (response: SocketCreateGameRes) => {
      response as SocketCreateGameRes;

      if (response.status === 401) {
        dispatch(setGameData(response.game));
        setScreenState(ScreenState.PlayRoom);
      } else {
        console.log('Ошибка создания игры');
      }
    })
  }


  return (
    <div className='screen'>
      <div className='title-select'>
        <span>Создать комнату</span>
      </div>

      <button
        className='back-btn'
        onClick={handleBackButtonClick}
      >
        Назад
      </button>

      <label className='input-container'>
        <span className='input-name'>Название комнаты</span>
        <input
          className='input-input'
          type="text"
          maxLength={25}
          value={roomName}
          onChange={handleRoomNameChange}
        />
      </label>

      <label className='checkbox-container'>
        <span className='checkbox-name'>Закрытая комната</span>
        <input
          className='checkbox-input'
          type="checkbox"
          checked={privateRoom}
          onChange={handleIsPrivateChange}
        />
        <span className='checkbox-fake'></span>
      </label>

      <label className='input-container'>
        <span className='input-name'>Пароль</span>
        <input
          className='input-input'
          type="text"
          maxLength={15}
          disabled={!privateRoom}
          value={roomPassword}
          onChange={handleRoomPasswordChange}
        />
      </label>

      <label className='range-container'>
        <span className='range-name'>Максимальное количество игроков: {roomPlayers}</span>
        <input
          className='range-input'
          type="range"
          min={2}
          max={6}
          value={roomPlayers}
          onChange={handleRoomPlayersChange}
        />
      </label>

      <button
        className='button'
        onClick={handleCreateButtonClick}
      >
        Создать и подключиться
      </button>


    </div>
  );
}
