import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import './screen-enter-game.scss';
import { RoomStatus, ScreenState } from '../../config';
import GameRoomItem from './game-room-item/game-room-item';



type ScreenEnterGameProps = {
  socket: Socket,
  setScreenState: (arg: ScreenState) => void,
}



export default function ScreenEnterGame({setScreenState}: ScreenEnterGameProps) {


  const handleBackButtonClick = () => {
    setScreenState(ScreenState.SelectMode);
  }

  const rooms = [
    {
      id: '123123',
      name: 'TestGame1',
      users: 3,
      maxUsers: 6,
      status: RoomStatus.InGame,
      isPrivate: false,
    }, {
      id: '1231232f2',
      name: 'TestGame2',
      users: 1,
      maxUsers: 4,
      status: RoomStatus.Waiting,
      isPrivate: true,
    }
  ]





  return (
    <div className='screen'>
      <div className='title-select'>
        <span>Выберите комнату</span>
      </div>

      <button
        className='back-btn'
        onClick={handleBackButtonClick}
      >
        Назад
      </button>

      <ul className='room-list'>
        {
          rooms.map((room) => (
            <li key={room.id}>
              <GameRoomItem room={room} />
            </li>
          ))
        }
      </ul>

    </div>
  );
}
