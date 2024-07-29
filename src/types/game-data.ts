export type GameData = {
  id: string,
  name: string,
  playersCount: number,
  maxPlayers: number,
}


export type MinGameData = {
  id: string,
  name: string,
  playersCount: number,
  maxPlayers: number,
  isPrivate: boolean,
  password: string,

  gameStatus: string,

}
