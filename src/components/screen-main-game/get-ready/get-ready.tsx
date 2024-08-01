import { useEffect, useState } from 'react';
import './get-ready.scss';
import { Socket } from 'socket.io-client';
import { SocketHandlersOn } from '../../../config';

type GetReadyProps = {
  socket: Socket;
};

export default function GetReady({ socket }: GetReadyProps) {
  const [lastTime, setLastTime] = useState<number>(0);

  useEffect(() => {
    socket.on(SocketHandlersOn.CountDown, (time: number) => {
      setLastTime(time);
    });

    return () => {
      socket.off(SocketHandlersOn.CountDown);
    };
  }, []);

  return (
    <div>
      <p>Подготовка раунда</p>
      <p>Раунд начнется через {lastTime}</p>
    </div>
  );
}
