import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import './screen-main-game.scss';
import { ScreenState, SocketHandlers, SocketHandlersEmit, SocketHandlersOn } from '../../config';
import { useEffect, useState } from 'react';
import { GameData, PlayerData } from '../../types/game-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGameData, getPlayers } from '../../store/game/game.selectors';
import { SocketLeaveGameRes } from '../../types/socket-data';
import { addPlayerToPlayers, deletePlayerOfPlayers, setGameData } from '../../store/game/game.slice';


type ScreenMainGameProps = {
  socket: Socket,
  setScreenState: (arg: ScreenState) => void,
}


export default function ScreenMainGame({socket, setScreenState}: ScreenMainGameProps) {
  const dispatch = useAppDispatch();

  const [game, setGame] = useState<GameData>(useAppSelector(getGameData));

  const [playersCount, setPlayersCount] = useState<number>(game.playersCount);
  const [players, setPlayers] = useState<PlayerData[]>(useAppSelector(getPlayers));
  // const [playerId, setPlayerId] = useState<string>(useAppSelector(getPlayerId));


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
    socket.on(SocketHandlersOn.PlayerJoined, (player: PlayerData) => {
      setPlayersCount((prev) => prev + 1);
      dispatch(addPlayerToPlayers(player));
    })

    socket.on(SocketHandlersOn.PlayerReady, (playerId: string) => {
      console.log(players, playerId);

      const newPlayers = players.map((item) => {
        if (item.id === playerId) {
          return item;
        } else {
          return null;
        }
      })

      console.log(newPlayers)

      // setPlayers([...players.map((item) => {
      //   if (item.id === playerId) {
      //     item.ready = true;
      //   }
      //   return item;
      // })]);
    })

    socket.on(SocketHandlersOn.PlayerLeave, (playerId: string) => {
      setPlayersCount((prev) => prev - 1);
      dispatch(deletePlayerOfPlayers(playerId));
    })

    return () => {
      socket.off(SocketHandlersOn.PlayerJoined);
      socket.off(SocketHandlersOn.PlayerReady);
      socket.off(SocketHandlersOn.PlayerLeave);
    }
  }, [socket, dispatch])


  const handleReadyButtonClick = () => {
    socket.emit(SocketHandlersEmit.PlayerReadyRound, game.id);
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
        Всего игроков:
        <span>{playersCount}</span>
      </div>


      {/* <div>
        Я:
        <p>
          <span>{playerData.playerName}</span>
          <span>Готовность: {playerData.ready}</span>
        </p>
      </div> */}


      <div>
        Игроки:
        {
          players.map((player) => (
            <p key={player.id}>
              <span>{player.playerName}</span>
              <span>Готовность: {player.ready ? 'Готов' : 'Спит'}</span>
            </p>
          ))
        }
      </div>


      <div>
        Максимум игроков:
        <span>{game.maxPlayers}</span>
      </div>


      <div>
        Нажми если готов
        <button
          className='ready-btn'
          onClick={handleReadyButtonClick}
        >
          Готов
        </button>
      </div>


    </div>
  );
}
