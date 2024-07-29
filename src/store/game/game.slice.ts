import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceName } from '../../config';
import { GameData } from '../../types/game-data';


const initialState = {
  gameData: {} as GameData,
}

export const gameProccess = createSlice({
  name: SliceName.Game,
  initialState,
  reducers: {
    setGameData(state, action: PayloadAction<GameData>) {
      state.gameData = action.payload;
    },
  },
})

export const { setGameData } = gameProccess.actions;
