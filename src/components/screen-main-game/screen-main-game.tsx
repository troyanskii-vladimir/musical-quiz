import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import './screen-main-game.scss';
import { ScreenState, SocketHandlers, SocketHandlersEmit, SocketHandlersOn } from '../../config';
import { ChangeEvent, useEffect, useState } from 'react';
import { GameData, PlayerData } from '../../types/game-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGameData, getPlayerId } from '../../store/game/game.selectors';
import { SocketLeaveGameRes } from '../../types/socket-data';
import { setGameData } from '../../store/game/game.slice';


type ScreenMainGameProps = {
  socket: Socket,
  setScreenState: (arg: ScreenState) => void,
}


export default function ScreenMainGame({socket, setScreenState}: ScreenMainGameProps) {
  const dispatch = useAppDispatch();

  //Данные об игре из стейта
  const [game, setGame] = useState<GameData>(useAppSelector(getGameData));
  const [playerId, setPlayerId] = useState<string>(useAppSelector(getPlayerId));

  const [gameIsActive, setGameIsActive] = useState<boolean>(false);

  //Прочие данные игры
  const [players, setPlayers] = useState<PlayerData[]>(game.players);
  const [roundTime, setRoundTime] = useState<number>(0);

  //Стейт компонента
  const [ready, setReady] = useState<boolean>(false);


  const handleBackButtonClick = () => {

    socket.emit(SocketHandlers.LeaveGame, game.id, (response: SocketLeaveGameRes) => {
      response as SocketLeaveGameRes;

      if (response.status === 200) {
        setScreenState(ScreenState.EnterRoom);
        dispatch(setGameData({} as GameData));
      }
    })
  }


  useEffect(() => {
    socket.on(SocketHandlersOn.PlayerJoined, (playersData: PlayerData[]) => {
      setPlayers(playersData);
    })

    socket.on(SocketHandlersOn.PlayerReady, (playersData: PlayerData[]) => {
      setPlayers(playersData);
    })

    socket.on(SocketHandlersOn.PlayerLeave, (playersData: PlayerData[]) => {
      setPlayers(playersData);
    })

    socket.on(SocketHandlersOn.PlayerNotReady, (playersData: PlayerData[]) => {
      setPlayers(playersData);
    })

    socket.on(SocketHandlersOn.RoundStart, () => {
      setGameIsActive(true);
    })

    socket.on(SocketHandlersOn.CountDown, (roundTime: number) => {
      setRoundTime(roundTime);
    })

    socket.on(SocketHandlersOn.EndRound, () => {
      console.log('Раунд завершен!');
    })

    socket.on(SocketHandlersOn.ReadyRound, () => {
      console.log('Раунд готов!');
    })

    socket.on(SocketHandlersOn.EndGame, () => {
      console.log('Игра завершена!');
    })

    return () => {
      socket.off(SocketHandlersOn.PlayerJoined);
      socket.off(SocketHandlersOn.PlayerLeave);
      socket.off(SocketHandlersOn.PlayerReady);
      socket.off(SocketHandlersOn.PlayerNotReady);
      socket.off(SocketHandlersOn.RoundStart);
    }
  }, [socket, dispatch])


    const handleReadyButtonClick = (evt: ChangeEvent<HTMLInputElement>) => {
      setReady((prev) => !prev);

      if (evt.target.checked) {
        socket.emit(SocketHandlersEmit.PlayerReadyRound, game.id);
      } else {
        socket.emit(SocketHandlersEmit.PlayerNotReadyRound, game.id);
      }
    }


  return (
    <div className='screen'>
      <div className='title-select'>
        <span>Игра</span>
      </div>

      <button
        className='back-btn'
        onClick={handleBackButtonClick}
      >
        Назад
      </button>


      <div>
        Название комнаты:
        <span>{game.name}</span>
      </div>


      <div>
        Игроков:
        <span>{players.length}/{game.maxPlayers}</span>
      </div>


      <div>
        Игроки:
        {
          players.map((player) => (
            <p key={player.id}>
              <span>{player.playerName}</span>
              <span>{player.ready ? ' Готов' : ' Не готов'}</span>
            </p>
          ))
        }
      </div>


      {
        gameIsActive &&
        <div>
          Игра началась
          {roundTime}
        </div>
      }


      <div>
        Готов к началу раунда
        <input
          className='ready-btn'
          type='checkbox'
          checked={ready}
          onChange={handleReadyButtonClick}
          // onClick={handleReadyButtonClick}
        />
      </div>


    </div>
  );
}
