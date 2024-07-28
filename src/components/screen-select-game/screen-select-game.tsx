import { Socket } from 'socket.io-client';
import { ScreenState, SocketHandlers } from '../../config';

import '../../../styles/container.scss';
import './screen-select-game.scss';


type ScreenSelectGameProps = {
  socket: Socket,
  setScreenState: (arg: ScreenState) => void,
}


export default function ScreenSelectGame({socket, setScreenState}: ScreenSelectGameProps) {

  const handleQuiqGameEnterButton = () => {

  }

  const handleCreateRoomButton = () => {
    setScreenState(ScreenState.CreateRoom);
  }

  const handleEnterRoomButton = () => {
    setScreenState(ScreenState.EnterRoom);
  }

  const handleTestButton = () => {
    socket.emit(SocketHandlers.test);
  }


  return (
    <div className='screen'>
      <div className='title-select'>
        <span>Выберите режим игры</span>
      </div>

      <button className='button-select'
        onClick={handleQuiqGameEnterButton}
      >
        Быстрая игра
      </button>

      <button className='button-select'
        onClick={handleCreateRoomButton}
      >
        Создать комнату
      </button>

      <button className='button-select'
        onClick={handleEnterRoomButton}
      >
        Войти в комнату
      </button>

      <button className='button-select'
        onClick={handleTestButton}
      >
        Тест
      </button>
    </div>
  );
}
