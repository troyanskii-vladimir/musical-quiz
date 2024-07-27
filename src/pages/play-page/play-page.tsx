import { io } from 'socket.io-client';
import { AuthorizationStatus, SocketHandlers } from '../../config';
import Header from '../../components/header/header';



const socket = io('http://localhost:3000/');


type PlayPageProps = {
  authorizationStatus: AuthorizationStatus,
}


export default function PlayPage({authorizationStatus}: PlayPageProps) {

  socket.on('connect', () => {
    console.log('Gratz');
  })

  const handleCreateRoomButton = () => {
    const data = { name: 'test' };
    socket.emit(SocketHandlers.createGame, data, (response: Response) => {
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
      <Header authorizationStatus={authorizationStatus} />
      <main className='main-container'>
        Игра

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

      </main>
    </div>
  );
}
