import { GameData } from '../../types/game-data';
import { State } from '../../types/state';


export const getGameData = (state: State): GameData => state.Game.gameData;
export const getPlayerId = (state: State): string => state.Game.playerId;
