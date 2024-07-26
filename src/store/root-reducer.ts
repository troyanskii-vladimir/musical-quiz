import { combineReducers } from '@reduxjs/toolkit';
import { SliceName } from '../config';
import { authProccess } from './auth/auth.slice';


export const rootReducer = combineReducers({
  [SliceName.Auth]: authProccess.reducer,
})
