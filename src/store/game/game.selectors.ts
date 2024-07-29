import { GameData, PlayerData } from '../../types/game-data';
import { State } from '../../types/state';


export const getGameData = (state: State): GameData => state.Game.gameData;
export const getPlayerId = (state: State): string => state.Game.playerId;
export const getPlayers = (state: State): PlayerData[] => state.Game.players;
