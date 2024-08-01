import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import './screen-main-game.scss';
import {
  GameStatus,
  ScreenState,
  SocketHandlers,
  SocketHandlersEmit,
  SocketHandlersOn,
} from '../../config';
import { ChangeEvent, useEffect, useState } from 'react';
import { GameData, PlayerData } from '../../types/game-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGameData, getPlayerId } from '../../store/game/game.selectors';
import { SocketLeaveGameRes } from '../../types/socket-data';
import { setGameData } from '../../store/game/game.slice';
import ReadyBtn from './ready-btn/ready-btn';
import LobbyPlayersList from './lobby-players-list/lobby-players-list';
import GetReady from './get-ready/get-ready';

type ScreenMainGameProps = {
  socket: Socket;
  setScreenState: (arg: ScreenState) => void;
};

export default function ScreenMainGame({
  socket,
  setScreenState,
}: ScreenMainGameProps) {
  const dispatch = useAppDispatch();

  //Данные об игре из стейта
  const [game, setGame] = useState<GameData>(useAppSelector(getGameData));
  const [playerId, setPlayerId] = useState<string>(useAppSelector(getPlayerId));

  //Прочие данные игры
  const [players, setPlayers] = useState<PlayerData[]>(game.players);
  const [roundTime, setRoundTime] = useState<number>(0);
  const [gameIsActive, setGameIsActive] = useState<boolean>(false);
  const [roundIsActive, setRoundIsActive] = useState<boolean>(false);

  //Стейт компонента
  const [gameStatus, setGameStatus] = useState<GameStatus>(
    GameStatus.WaitingForReady
  );

  const handleBackButtonClick = () => {
    socket.emit(
      SocketHandlers.LeaveGame,
      game.id,
      (response: SocketLeaveGameRes) => {
        response as SocketLeaveGameRes;

        if (response.status === 200) {
          setScreenState(ScreenState.EnterRoom);
          dispatch(setGameData({} as GameData));
        }
      }
    );
  };

  const mockPlayers: PlayerData[] = [
    {
      playerName: 'Player1',
      id: '1233344',
      ready: false,
      answers: [],
    },
    {
      playerName: 'Player2',
      id: '1233ffe344',
      ready: false,
      answers: [],
    },
    {
      playerName: 'Player3',
      id: '12332f3b3344',
      ready: false,
      answers: [],
    },
  ];

  useEffect(() => {
    socket.on(SocketHandlersOn.PlayerJoined, (playersData: PlayerData[]) => {
      setPlayers(playersData);
    });

    socket.on(SocketHandlersOn.PlayerReady, (playersData: PlayerData[]) => {
      setPlayers(playersData);
    });

    socket.on(SocketHandlersOn.PlayerLeave, (playersData: PlayerData[]) => {
      setPlayers(playersData);
    });

    socket.on(SocketHandlersOn.PlayerNotReady, (playersData: PlayerData[]) => {
      setPlayers(playersData);
    });

    socket.on(SocketHandlersOn.RoundStart, () => {
      // setGameIsActive(true);
    });

    socket.on(SocketHandlersOn.CountDown, (roundTime: number) => {
      setRoundTime(roundTime);
    });

    socket.on(SocketHandlersOn.EndRound, () => {
      console.log('Раунд завершен!');
    });

    socket.on(SocketHandlersOn.ReadyRound, () => {
      console.log('Раунд готов!');
      setGameIsActive(true);
    });

    socket.on(SocketHandlersOn.EndGame, () => {
      console.log('Игра завершена!');
    });

    return () => {
      socket.off(SocketHandlersOn.PlayerJoined);
      socket.off(SocketHandlersOn.PlayerLeave);
      socket.off(SocketHandlersOn.PlayerReady);
      socket.off(SocketHandlersOn.PlayerNotReady);
      socket.off(SocketHandlersOn.RoundStart);
      socket.off(SocketHandlersOn.EndRound);
      socket.off(SocketHandlersOn.ReadyRound);
      socket.off(SocketHandlersOn.EndGame);
    };
  }, [socket, dispatch]);

  const handleAnswerClick = () => {
    console.log(game.id);
    socket.emit(SocketHandlersEmit.Answer, game.id, '123');
  };

  return (
    <div className="screen">
      <div className="title-select">
        <span>asd</span>
      </div>

      <button className="back-btn" onClick={handleBackButtonClick}>
        Назад
      </button>

      {gameStatus === GameStatus.WaitingForReady && (
        <LobbyPlayersList players={mockPlayers} />
      )}

      {gameStatus === GameStatus.getReady && <GetReady socket={socket} />}

      {/* <div>
        <button
          onClick={handleAnswerClick}
        >
          Ответить: '123'
        </button>
      </div> */}

      {gameStatus === GameStatus.WaitingForReady && (
        <ReadyBtn socket={socket} gameId={'123213321'} />
      )}
    </div>
  );
}
