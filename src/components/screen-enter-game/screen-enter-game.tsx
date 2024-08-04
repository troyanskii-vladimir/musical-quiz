import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import styles from './screen-enter-game.module.scss';
import { ScreenState, SocketHandlers } from '../../config';
import GameRoomItem from './game-room-item/game-room-item';
import { useEffect, useState } from 'react';
import { SocketGetGamesRes } from '../../types/socket-data';
import { MinGameData } from '../../types/game-data';
import { UserData } from '../../types/user-data';



type ScreenEnterGameProps = {
  socket: Socket,
  setScreenState: (arg: ScreenState) => void,
  userName: UserData,
}


export default function ScreenEnterGame({socket, setScreenState, userName}: ScreenEnterGameProps) {
  const [games, setGames] = useState<MinGameData[]>([]);


  //Поулчения списка игр при первом рендере компонента
  useEffect(() => {
    socket.emit(SocketHandlers.getGameList, null, (response: SocketGetGamesRes) => {
      response as SocketGetGamesRes;

      if (response.status === 401) {
        setGames(response.games);
      } else {
        console.log('Ошибка получения списка игр');
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  //Поулчения списка игр при создании игры другим каким-нибудь игроком
  useEffect(() => {
    socket.on(SocketHandlers.recieveGameList, (response: SocketGetGamesRes) => {
      response as SocketGetGamesRes;
      setGames(response.games);
    });
  }, [socket])


  const handleBackButtonClick = () => {
    setScreenState(ScreenState.SelectMode);
  }


  return (
    <div className={styles['screen']}>
      <div className={styles['title-select']}>
        <span>Выберите комнату</span>
      </div>

      <button
        className={styles['back-btn']}
        onClick={handleBackButtonClick}
      >
        Назад
      </button>

      <ul className={styles['room-list']}>
        {
          games.map((game) => (
            <li key={game.id}>
              <GameRoomItem socket={socket} game={game} setScreenState={setScreenState} userName={userName} />
            </li>
          ))
        }
      </ul>

    </div>
  );
}
