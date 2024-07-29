import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceName } from '../../config';
import { GameData, PlayerData } from '../../types/game-data';


const initialState = {
  gameData: {} as GameData,
  playerId: '',
  players: [{} as PlayerData],
}

export const gameProccess = createSlice({
  name: SliceName.Game,
  initialState,
  reducers: {
    setGameData(state, action: PayloadAction<GameData>) {
      state.gameData = action.payload;
    },
    setPlayerId(state, action: PayloadAction<string>) {
      state.playerId = action.payload;
    },
    setPlayers(state, action: PayloadAction<PlayerData[]>) {
      state.players = action.payload;
    },
    addPlayerToPlayers(state, action: PayloadAction<PlayerData>) {
      state.players.push(action.payload);
    },
    deletePlayerOfPlayers(state, action: PayloadAction<string>) {
      state.players = state.players.filter((item) => item.id !== action.payload)
    },
  },
})

export const { setGameData, setPlayerId, setPlayers, addPlayerToPlayers, deletePlayerOfPlayers } = gameProccess.actions;
