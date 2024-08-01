import { Socket } from 'socket.io-client';
import '../../../styles/container.scss';
import './screen-main-game.scss';
import {
  GameStatus,
  ScreenState,
  SocketHandlers,
  SocketHandlersOn,
} from '../../config';
import { useEffect, useState } from 'react';
import { GameData, PlayerData, Question } from '../../types/game-data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGameData } from '../../store/game/game.selectors';
import { SocketEndGameRes, SocketLeaveGameRes } from '../../types/socket-data';
import { setGameData } from '../../store/game/game.slice';
import ReadyBtn from './ready-btn/ready-btn';
import LobbyPlayersList from './lobby-players-list/lobby-players-list';
import GetReady from './get-ready/get-ready';
import GameRound from './game-round/game-round';
import GameEnd from './game-end/game-end';

type ScreenMainGameProps = {
  socket: Socket;
  setScreenState: (arg: ScreenState) => void;
};

export default function ScreenMainGame({socket, setScreenState}: ScreenMainGameProps) {
  const dispatch = useAppDispatch();

  //Данные об игре из стейта
  const game = useAppSelector(getGameData);
  // const [playerId, setPlayerId] = useState<string>(useAppSelector(getPlayerId));

  //Прочие данные игры
  const [players, setPlayers] = useState<PlayerData[]>(game.players);
  const [question, setQuestion] = useState<Question>({} as Question);
  const [results, setResults] = useState<(string | number)[][]>([]);

  //Стейт компонента
  const [gameStatus, setGameStatus] = useState<GameStatus>(game.gameStatus as GameStatus);


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

    // socket.on(SocketHandlersOn.EndRound, () => {
    //   console.log('Раунд завершен!');
    // });

    socket.on(SocketHandlersOn.GetReady, () => {
      setGameStatus(GameStatus.getReady);
    });

    socket.on(SocketHandlersOn.ReadyRound, (questionData: Question) => {
      setQuestion(questionData);
      setGameStatus(GameStatus.WaitingForAnswer);
    });

    socket.on(SocketHandlersOn.EndGame, (gameResults: SocketEndGameRes) => {
      setGameStatus(GameStatus.GameEnd);
      setResults(gameResults.score);
    });

    return () => {
      socket.off(SocketHandlersOn.PlayerJoined);
      socket.off(SocketHandlersOn.PlayerLeave);
      socket.off(SocketHandlersOn.PlayerReady);
      socket.off(SocketHandlersOn.PlayerNotReady);
      // socket.off(SocketHandlersOn.EndRound);
      socket.off(SocketHandlersOn.GetReady);
      socket.off(SocketHandlersOn.ReadyRound);
      socket.off(SocketHandlersOn.EndGame);
    };
  }, [socket, dispatch]);


  return (
    <div className="screen">
      <div className="title-select">
        <span>{game.name}</span>
      </div>

      <button className="back-btn" onClick={handleBackButtonClick}>
        Назад
      </button>

      {
        gameStatus === GameStatus.WaitingForReady &&
        <LobbyPlayersList players={players} />
      }

      {
        gameStatus === GameStatus.WaitingForReady &&
        <ReadyBtn socket={socket} gameId={game.id} />
      }

      {
        gameStatus === GameStatus.getReady &&
        <GetReady socket={socket} />
      }

      {
        gameStatus === GameStatus.WaitingForAnswer &&
        <GameRound socket={socket} question={question} gameId={game.id} />
      }

      {
        gameStatus === GameStatus.GameEnd &&
        <GameEnd results={results} />
      }

    </div>
  );
}
