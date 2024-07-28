import { GameData, MinGameData } from '../../types/game-data';
import { State } from '../../types/state';


export const getGames = (state: State): MinGameData[] => state.Game.games;
export const getGameData = (state: State): GameData => state.Game.gameData;
