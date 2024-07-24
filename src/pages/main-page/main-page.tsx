import { Socket } from 'socket.io-client';
import { SocketHandlers } from '../../config';


type MainPageProps = {
  socket: Socket,
}

export default function MainPage({socket}: MainPageProps) {
  console.log(socket);

  socket.on('connect', () => {
    console.log('Gratz');
  })

  const handleCreateRoomButton = () => {
    const data = { name: 'test' };
    socket.emit(SocketHandlers.createGame, data, (response: any) => {
      console.log(response.status);
    })
  }

  const handleEnterRoomButton = () => {

  }

  const handleTestButton = () => {
    socket.emit(SocketHandlers.test);
  }

  return (
    <div>
      привет
      <button
        onClick={handleCreateRoomButton}
      >
        Создать комнату
      </button>

      <button
        onClick={handleEnterRoomButton}
      >
        Войти в комнату
      </button>

      <button
        onClick={handleTestButton}
      >
        Тест
      </button>
    </div>
  );
}
