import { combineReducers } from '@reduxjs/toolkit';
import { SliceName } from '../config';
import { authProccess } from './auth/auth.slice';
import { gameProccess } from './game/game.slice';


export const rootReducer = combineReducers({
  [SliceName.Auth]: authProccess.reducer,
  [SliceName.Game]: gameProccess.reducer,
})
