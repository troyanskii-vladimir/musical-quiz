import { Socket } from 'socket.io-client';
import { GameAnswersData, PlayerData } from '../../../types/game-data';
import styles from './game-end.module.scss';
import { GameStatus, SocketHandlersEmit } from '../../../config';
import { SocketCreateGameRes } from '../../../types/socket-data';
import { useAppDispatch } from '../../../hooks';
import { setGameData } from '../../../store/game/game.slice';


type GameEndProps = {
  socket: Socket,
  results: [string, GameAnswersData][],
  gameId: string,
  setGameStatus: (arg: GameStatus) => void,
  setPlayers: (arg: PlayerData[]) => void,
}


export default function GameEnd({socket, results, gameId, setGameStatus, setPlayers}: GameEndProps) {
  const dispatch = useAppDispatch();

  const handleRestartButtonClick = () => {
    socket.emit(SocketHandlersEmit.Restart, {gameId: gameId}, (response: SocketCreateGameRes) => {
      response as SocketCreateGameRes;

      if (response.status === 401) {
        dispatch(setGameData(response.gameData));
        setGameStatus(GameStatus.WaitingForReady);
        setPlayers(response.gameData.players);
      } else {
        console.log('Ошибка рестарта игры');
      }
    })
  }

  return (
    <div className={styles['wrapper']}>
      <ul className={styles['list']}>
        <p className={styles['title']}>Результаты игры</p>
        {
          results.map((result) => (
            <li className={styles['item']} key={result[0]}>
              <p>{result[1].playerName}: {result[1].score} очков</p>
            </li>
          ))
        }
      </ul>
      <button
        className={styles['btn']}
        onClick={handleRestartButtonClick}
      >
        Играть еще раз
      </button>
    </div>
  );
}
