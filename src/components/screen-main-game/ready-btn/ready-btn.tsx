import { ChangeEvent, useState } from 'react';
import './ready-btn.scss';
import { Socket } from 'socket.io-client';
import { SocketHandlersEmit } from '../../../config';


type ReadyBtnProps = {
  socket: Socket,
  gameId: string,
}


export default function ReadyBtn({socket, gameId}: ReadyBtnProps) {
  const [ready, setReady] = useState<boolean>(false);

  const handleReadyButtonClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setReady((prev) => !prev);

    if (evt.target.checked) {
      socket.emit(SocketHandlersEmit.PlayerReadyRound, gameId);
    } else {
      socket.emit(SocketHandlersEmit.PlayerNotReadyRound, gameId);
    }
  }


  return (
    <div className='cont'>
      <label className={`ready-btn ${ready ? 'active' : ''}`}>
        <input
          className='ready-checkbox'
          type='checkbox'
          checked={ready}
          onChange={handleReadyButtonClick}
        />
      <span className='ready-text'>{ready ? 'Готов' : 'Не готов'}</span>
      </label>
    </div>
  );
}
