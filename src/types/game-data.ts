export type GameData = {
  id: string,
  name: string,
  round: number,
  rounds: number,
  gameStatus: string,
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


export type PlayerData = {
  playerName: string,
  id: string,
  ready: boolean,
  answers: [],
}
