import { Socket } from 'socket.io-client';


type MainPageProps = {
  socket: Socket,
}

export default function MainPage({socket}: MainPageProps) {
  console.log(socket);
  
  return (
    <div>
      привет
    </div>
  );
}
