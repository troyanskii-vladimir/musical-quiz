import { PlayerData } from '../../../types/game-data';
import './lobby-players-list.scss';


type LobbyPlayersListProps = {
  players: PlayerData[],
}


export default function LobbyPlayersList({players}: LobbyPlayersListProps) {
  return (
    <ul className='cont-list'>
      {
        players.map((player) => (
          <li key={player.id} className='player-item'>
            <span className='player-name'>{player.playerName}</span>
            <span className={`player-status ${player.ready ? 'ready' : ''}`}>{player.ready ? ' Готов' : ' Не готов'}</span>
          </li>
        ))
      }
    </ul>
  );
}
