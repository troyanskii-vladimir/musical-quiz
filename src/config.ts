export enum AppRoute {
  Main = '/',
  Play = '/play',
  Register = '/register',
  Login = '/login',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  Guest = 'GUEST',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SocketHandlers {
  createGame = 'create-game',
  joinGame = 'join-game',
  test = 'test',
}

export enum SliceName {
  Auth = 'Auth',
}

export enum ApiRoute {
  Register = 'api/register',
  Login = 'api/login',
  Logout = 'api/logout',
  Refresh = 'api/refresh',
  Users = 'api/users',
}

export const AUTH_TOKEN_NAME = 'musical-quiz-token';
export const BACKEND_URL = 'http://localhost:3000/';
export const REQUEST_TIMEOUT = 5000;
