import { PlayerData } from '../../../types/game-data';
import styles from './lobby-players-list.module.scss';


type LobbyPlayersListProps = {
  players: PlayerData[],
}


export default function LobbyPlayersList({players}: LobbyPlayersListProps) {
  return (
    <ul className={styles['cont-list']}>
      {
        players.map((player) => (
          <li key={player.id} className={styles['player-item']}>
            <span className={styles['player-name']}>{player.playerName}</span>
            <span className={`${styles['player-status']} ${player.ready ? styles['ready'] : ''}`}>{player.ready ? ' Готов' : ' Не готов'}</span>
          </li>
        ))
      }
    </ul>
  );
}
