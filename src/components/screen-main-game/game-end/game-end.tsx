
import styles from './game-end.module.scss';


type GameEndProps = {
  results: (string | number)[][],
}


export default function GameEnd({results}: GameEndProps) {
  return (
    <div className={styles['']}>
      <p className={styles['']}>Игра завершена</p>
      <ul>
        <p className={styles['']}>Результаты</p>
        {
          results.map((result, i) => (
            <li key={String(result[0]) + i}>
              <p>{result[0]}: {result[1]} очков</p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
