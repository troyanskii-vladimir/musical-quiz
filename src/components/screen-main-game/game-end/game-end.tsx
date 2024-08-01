
import './game-end.scss';


type GameEndProps = {
  results: (string | number)[][],
}


export default function GameEnd({results}: GameEndProps) {
  return (
    <div>
      <p>Игра завершена</p>
      <ul>
        <p>Результаты</p>
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
