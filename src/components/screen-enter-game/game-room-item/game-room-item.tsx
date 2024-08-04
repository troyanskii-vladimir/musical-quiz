import { ChangeEvent, FormEvent, useState } from 'react';
import { RoomStatus, ScreenState, SocketHandlers } from '../../../config';

import styles from './game-room-item.module.scss';
import { MinGameData } from '../../../types/game-data';
import { Socket } from 'socket.io-client';
import { SocketJoinGameRes } from '../../../types/socket-data';
import { useAppDispatch } from '../../../hooks';
import { setGameData, setPlayerId } from '../../../store/game/game.slice';
import { UserData } from '../../../types/user-data';


type GameRoomItemProps = {
  socket: Socket,
  game: MinGameData,
  setScreenState: (arg: ScreenState) => void,
  userName: UserData,
}


export default function GameRoomItem({socket, game, setScreenState, userName}: GameRoomItemProps) {
  const dispatch = useAppDispatch();

  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);
  const [roomPassword, setRoomPassword] = useState<string>('');


  const handleRoomItemClick = () => {
    if (game.isPrivate) {
      setIsPasswordOpen(true);
    } else {
      const data = {
        gameId: game.id,
        userName: userName.userName ? userName.userName : userName.email,
      };

      socket.emit(SocketHandlers.JoinGame, data, (response: SocketJoinGameRes) => {
        response as SocketJoinGameRes;

        if (response.status === 200) {
          dispatch(setGameData(response.gameData));
          dispatch(setPlayerId(response.playerId));
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
      className={`${styles['room-item']} ${game.isPrivate ? styles['locked'] : ''} ${isPasswordOpen ? styles['password-open'] : ''}`}
      onClick={handleRoomItemClick}
    >
      <div className={`${styles['room-status']} ${game.gameStatus === RoomStatus.InGame ? styles['ingame'] : styles['waiting']}`}>
        {
          game.gameStatus === RoomStatus.InGame ? 'Идет игра' : 'Ожидание игроков'
        }
      </div>
      {
        game.isPrivate &&
        <div className={styles['lock-block']}>
          Закрытое лобби
        </div>
      }
      {
        isPasswordOpen &&
        <div className={styles['password-block']}>
          <button
            className='password-close'
            onClick={handleClosePasswordEnterClick}
          >
            Отмена
          </button>
          <span className={styles['password-text']}>Введите пароль</span>
          <label className={styles['password-container']}>
            <input
              className={styles['password-input']}
              type='text'
              value={roomPassword}
              onChange={handleRoomPasswordChange}
            />
          </label>
          <button
            className={styles['password-btn']}
            onClick={handleConfirmPasswordClick}
          >
            Войти
          </button>
        </div>
      }
      <div className={styles['room-info']}>
        <div className={styles['room-name']}>
          <span>{game.name}</span>
        </div>
        <div className={styles['room-players']}>
          <span>Игроков: {game.playersCount}/{game.maxPlayers}</span>
        </div>
      </div>
    </div>
  );
}
