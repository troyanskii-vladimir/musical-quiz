import { GameData } from './game-data';


export type SocketCreateGameRes = {
  status: number,
  game: GameData,
}

export type SocketGetGamesRes = {
  status: number,
  games: GameData[],
}
