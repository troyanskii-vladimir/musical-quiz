import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceName } from '../../config';
import { GameData, MinGameData } from '../../types/game-data';


const initialState = {
  gameData: {} as GameData,
  games: [],
}

export const gameProccess = createSlice({
  name: SliceName.Game,
  initialState,
  reducers: {
    setGameData(state, action: PayloadAction<GameData>) {
      state.gameData === action.payload;
    },
    setGamesData(state, action: PayloadAction<MinGameData[]>) {
      state.games === action.payload;
    }
  },
})

export const { setGameData, setGamesData } = gameProccess.actions;
