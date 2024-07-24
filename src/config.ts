export enum AppRoute {
  Main = '/',
  Lobby = '/lobby',
  Profile = '/profile',
  Game = '/game',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SocketHandlers {
  createGame = 'create-game',
  joinGame = 'join-game',
  test = 'test',
}
