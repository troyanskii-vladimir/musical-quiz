export type GameData = {
  id: string;
  name: string;
  round: number;
  rounds: number;
  gameStatus: string;
  playersCount: number;
  maxPlayers: number;
  players: PlayerData[];
};

export type MinGameData = {
  id: string;
  name: string;
  playersCount: number;
  maxPlayers: number;
  isPrivate: boolean;
  password: string;

  gameStatus: string;
};

export type PlayerData = {
  playerName: string;
  id: string;
  ready: boolean;
  answers: [];
};

export type Question = {
  type: string;
  question: string;
  trackUrl: string;
  correctAnswer: string;
  imageUrl: string;
  answers: string[];
};
