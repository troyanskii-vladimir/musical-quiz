import { ChangeEvent, FormEvent, useState } from 'react';
import { RoomStatus, ScreenState, SocketHandlers } from '../../../config';

import './game-room-item.scss';
import { MinGameData } from '../../../types/game-data';
import { Socket } from 'socket.io-client';
import { SocketJoinGameRes } from '../../../types/socket-data';
import { useAppDispatch } from '../../../hooks';
import { setGameData } from '../../../store/game/game.slice';


type GameRoomItemProps = {
  socket: Socket,
  game: MinGameData,
  setScreenState: (arg: ScreenState) => void,
}


export default function GameRoomItem({socket, game, setScreenState}: GameRoomItemProps) {
  const dispatch = useAppDispatch();

  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const [roomPassword, setRoomPassword] = useState<string>('');


  const handleRoomItemClick = () => {

    if (game.isPrivate) {
      setIsPasswordOpen(true);
    } else {
      const data = {gameId: game.id};

      socket.emit(SocketHandlers.JoinGame, data, (response: SocketJoinGameRes) => {
        response as SocketJoinGameRes;

        if (response.status === 200) {
          console.log(response.gameData);
          dispatch(setGameData(response.gameData));
          setScreenState(ScreenState.PlayRoom);
        } else {
          console.log('Ошибка подключения к комнате');
        }

      })
    }
  }

  const handleClosePasswordEnterClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.stopPropagation();

    if (game.isPrivate) {
      setIsPasswordOpen(false);
    }
  }

  const handleRoomPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRoomPassword(evt.target.value);
  }

  const handleConfirmPasswordClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    if (roomPassword === game.password) {
      setScreenState(ScreenState.PlayRoom);
    }
  }


  return (
    <div
      className={`room-item ${game.isPrivate ? 'locked' : ''} ${isPasswordOpen ? 'password-open' : ''}`}
      onClick={handleRoomItemClick}
    >
      <div className={`room-status ${game.gameStatus === RoomStatus.InGame ? 'ingame' : 'waiting'}`}>
        {
          game.gameStatus === RoomStatus.InGame ? 'Идет игра' : 'Ожидание игроков'
        }
      </div>
      {
        game.isPrivate &&
        <div className='lock-block'>
          Закрытое лобби
        </div>
      }
      {
        isPasswordOpen &&
        <div className='password-block'>
          <button
            className='password-close'
            onClick={handleClosePasswordEnterClick}
          >
            Отмена
          </button>
          <span className='password-text'>Введите пароль</span>
          <label className='password-container'>
            <input
              className='password-input'
              type="text"
              value={roomPassword}
              onChange={handleRoomPasswordChange}
            />
          </label>
          <button
            className='password-btn'
            onClick={handleConfirmPasswordClick}
          >
            Войти
          </button>
        </div>
      }
      <div className="room-info">
        <div className="room-name">
          <span>{game.name}</span>
        </div>
        <div className="room-players">
          <span>Игроков: {game.playersCount}/{game.maxPlayers}</span>
        </div>
      </div>
    </div>
  );
}
