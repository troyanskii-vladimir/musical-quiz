import { GameData, MinGameData } from './game-data';


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
  gameData: GameData,
}
