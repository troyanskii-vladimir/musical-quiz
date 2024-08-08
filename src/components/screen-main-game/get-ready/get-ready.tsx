import { useEffect, useState } from 'react';
import styles from './get-ready.module.scss';
import { Socket } from 'socket.io-client';
import { SocketHandlersOn } from '../../../config';

type GetReadyProps = {
  socket: Socket;
};

export default function GetReady({ socket }: GetReadyProps) {
  const [lastTime, setLastTime] = useState<number>(3);

  useEffect(() => {
    socket.on(SocketHandlersOn.CountDown, (time: number) => {
      setLastTime(time);
    });

    return () => {
      socket.off(SocketHandlersOn.CountDown);
    };
  }, [socket]);


  return (
    <div className={styles['ready-2']}>
      <p className={styles['ready-text-2']}>Приготовься!</p>
      <p className={styles['ready-number-2']}>{lastTime}</p>
    </div>
  );
}
