import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import './screen-main-game.scss';
import { ScreenState } from '../../config';
import { useState } from 'react';
import { GameData } from '../../types/game-data';
import { useAppSelector } from '../../hooks';
import { getGameData } from '../../store/game/game.selectors';


type ScreenMainGameProps = {
  socket: Socket,
  setScreenState: (arg: ScreenState) => void,
}


export default function ScreenMainGame({socket, setScreenState}: ScreenMainGameProps) {
  const [gameData, setGameData] = useState<GameData>(useAppSelector(getGameData));


  const handleBackButtonClick = () => {
    setScreenState(ScreenState.EnterRoom);
  }


  return (
    <div className='screen'>
      <div className='title-select'>
        <span>Игра</span>
      </div>

      <button
        className='back-btn'
        onClick={handleBackButtonClick}
      >
        Назад
      </button>


      <div>
        Название комнаты:
        <span>{gameData.name}</span>
      </div>


      <div>
        Всего игроков:
        <span>{gameData.playersCount}</span>
      </div>


      <div>
        Максимум игроков:
        <span>{gameData.maxPlayers}</span>
      </div>


    </div>
  );
}
