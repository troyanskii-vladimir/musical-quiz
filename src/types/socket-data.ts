import { GameData, MinGameData, PlayerData } from './game-data';


export type SocketCreateGameRes = {
  status: number,
  game: GameData,
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
  players: PlayerData[],
}

export type SocketLeaveGameRes = {
  status: number,
}
