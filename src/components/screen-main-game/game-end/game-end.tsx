
import { GameAnswersData } from '../../../types/game-data';
import styles from './game-end.module.scss';


type GameEndProps = {
  results: [string, GameAnswersData][],
}


export default function GameEnd({results}: GameEndProps) {
  return (
    <div className={styles['']}>
      <p className={styles['']}>Игра завершена</p>
      <ul>
        <p className={styles['']}>Результаты</p>
        {
          results.map((result) => (
            <li key={result[0]}>
              <p>{result[1].playerName}: {result[1].score} очков</p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
