import { FormEvent, useState } from 'react';
import { RoomStatus, ScreenState } from '../../../config';
import { GameRoom } from '../../../types/room-data';

import './game-room-item.scss';


type GameRoomItemProps = {
  room: GameRoom,
  setScreenState: (arg: ScreenState) => void,
}


export default function GameRoomItem({room, setScreenState}: GameRoomItemProps) {
  const [isPasswordOpen, setIsPasswordOpen] = useState<boolean>(false);



  const handleRoomItemClick = () => {

    if (room.isPrivate) {
      setIsPasswordOpen(true);
    } else {
      setScreenState(ScreenState.PlayRoom);
    }
  }

  const handleClosePasswordEnterClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.stopPropagation();

    if (room.isPrivate) {
      setIsPasswordOpen(false);
    }
  }

  const handleConfirmPasswordClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.stopPropagation();

  }


  return (
    <div
      className={`room-item ${room.isPrivate ? 'locked' : ''} ${isPasswordOpen ? 'password-open' : ''}`}
      onClick={handleRoomItemClick}
    >
      <div className={`room-status ${room.status === RoomStatus.InGame ? 'ingame' : 'waiting'}`}>
        {
          room.status === RoomStatus.InGame ? 'Идет игра' : 'Ожидание игроков'
        }
      </div>
      {
        room.isPrivate &&
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
          <span>{room.name}</span>
        </div>
        <div className="room-players">
          <span>Игроков: {room.users}/{room.maxUsers}</span>
        </div>
      </div>
    </div>
  );
}
