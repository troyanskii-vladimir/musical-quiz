import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, SliceName } from '../../config';
import { checkAuthAction, getUsersAction, guestLoginAction, loginAction, logoutAction, registerAction } from '../api-actions';
import { UserData } from '../../types/user-data';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {} as UserData,
  users: [{} as UserData],
}

export const authProccess = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        if (!action.payload.user.email) {
          state.authorizationStatus = AuthorizationStatus.Guest;
        } else {
          state.authorizationStatus = AuthorizationStatus.Auth;
        }
        state.userData = action.payload.user;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = {} as UserData;
      })
      .addCase(guestLoginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Guest;
        state.userData = action.payload.user;
      })
      .addCase(guestLoginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = {} as UserData;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload.user;
      })
      .addCase(registerAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = {} as UserData;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload.user;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = {} as UserData;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = {} as UserData;
      })
      .addCase(getUsersAction.fulfilled, (state, action) => {
        state.users = action.payload;
      })
  },
})
