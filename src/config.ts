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

export enum ScreenState {
  SelectMode = 'selectMode',
  CreateRoom = 'createRoom',
  EnterRoom = 'enterRoom',
  PlayRoom = 'playRoom',
}

export enum SocketHandlers {
  getGameList = 'get-game-list',
  createGame = 'create-game',
  JoinGame = 'join-game',
  quizJoinGame = 'quiz-join-game',
  test = 'test',

  LeaveGame = 'leave-game',

  recieveGameList = 'recieve-game-list',
}

export enum SocketHandlersOn {
  PlayerJoined = 'player-joined',
  PlayerLeave = 'player-leave',
  PlayerReady = 'player-ready',
  PlayerNotReady = 'player-not-ready',

  RoundStart = 'round-start',
  CountDown = 'count-down',
  ReadyRound = 'ready-round',

  EndRound = 'end-round',
  EndGame = 'end-game',
}

export enum SocketHandlersEmit {
  PlayerReadyRound = 'player-ready-round',
  PlayerNotReadyRound = 'player-not-ready-round',
  Answer = 'answer',
}

export enum RoomStatus {
  InGame = 'InGame',
  Waiting = 'Waiting',
}

export enum SliceName {
  Auth = 'Auth',
  Game = 'Game',
}

export enum ApiRoute {
  Register = 'api/register',
  Login = 'api/login',
  GuestLogin = 'api/guestlogin',
  Logout = 'api/logout',
  Refresh = 'api/refresh',
  GuestRefresh = 'api/guestrefresh',
  Users = 'api/users',
}

export const AUTH_TOKEN_NAME = 'musical-quiz-token';
export const GUEST_TOKEN_NAME = 'musical-quiz-guest-token';

export const BACKEND_URL = 'http://localhost:3000/';
export const REQUEST_TIMEOUT = 5000;
