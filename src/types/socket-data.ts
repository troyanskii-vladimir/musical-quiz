import { GameData, MinGameData, PlayerData } from './game-data';


export type SocketCreateGameRes = {
  status: number,
  playerId: string,
  gameData: GameData,
}

export type SocketGetGamesRes = {
  status: number,
  games: MinGameData[],
}

export type SocketRecieveGamesRes = {
  status: number,
  games: MinGameData[],
}

export type SocketJoinGameRes = {
  status: number,
  playerId: string,
  gameData: GameData,
}

export type SocketLeaveGameRes = {
  status: number,
}

export type SocketEndGameRes = {
  players: PlayerData[],
  score: (string | number)[][],
}
