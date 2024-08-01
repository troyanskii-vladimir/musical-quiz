import { useEffect, useState } from 'react';
import './get-ready.scss';
import { Socket } from 'socket.io-client';
import { SocketHandlersOn } from '../../../config';

type GetReadyProps = {
  socket: Socket;
};

export default function GetReady({ socket }: GetReadyProps) {
  const [lastTime, setLastTime] = useState<number>(5);

  useEffect(() => {
    socket.on(SocketHandlersOn.CountDown, (time: number) => {
      setLastTime(time);
    });

    return () => {
      socket.off(SocketHandlersOn.CountDown);
    };
  }, [socket]);


  return (
    <div className='ready-2'>
      <p className='ready-text-2'>Приготовься!</p>
      <p className='ready-number-2'>{lastTime}</p>
    </div>
  );
}
