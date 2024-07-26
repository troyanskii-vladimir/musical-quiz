export enum AppRoute {
  Main = '/',
  Play = '/play',
  Register = '/register',
  Login = '/login',
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
